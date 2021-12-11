// @ts-check

import shaka from 'shaka-player/dist/shaka-player.ui';

import Chapters from './Chapters';
import ImageFetcher from './ImageFetcher';
import { clamp, e, filterNonNull, setElementClass } from '../lib/util';
import buildTimeString from './lib/buildTimeString';

/**
 * @typedef {{
 *  absolute: number;
 *  seconds: number;
 *  chapter: Chapter | undefined;
 *  onChapterMarker: boolean;
 *  }} SeekPosition
 *
 * @typedef {shaka.extern.Thumbnail & {
 *  track: shaka.extern.Track;
 * }} TrackedThumbnail
 *
 * @typedef {{
 *  uri: string;
 *  thumb: TrackedThumbnail;
 *  tilesetImage: HTMLImageElement;
 * }} LastRendered
 *
 * @typedef Current
 * @property {SeekPosition} seekPosition
 * @property {TrackedThumbnail[]} thumbs Ordered by quality/bandwidth descending.
 */

const DISPLAY_WIDTH = 160;
const INITIAL_ASPECT_RATIO = 16 / 9;

/**
 * Component for a thumbnail preview when sliding over the seekbar.
 *
 * Oriented at https://github.com/google/shaka-player/issues/3371#issuecomment-830001465.
 */
export default class ThumbnailPreview {
  /**
   *
   * @param {object} config
   * @param {HTMLElement} config.seekBar
   * @param {shaka.Player} config.player
   * @param {ImageFetcher} config.network
   * @param {object} config.interaction
   * @param {() => void} config.interaction.onChangeStart
   * @param {(pos: SeekPosition) => void} config.interaction.onChange
   * @param {() => void} config.interaction.onChangeEnd
   */
  constructor(config) {
    this.seekBar = config.seekBar;
    this.player = config.player;
    this.network = config.network;
    this.interaction = config.interaction;

    /** @private @type {number | null} */
    this.fps = null;
    /** @private @type {Chapters | null} */
    this.chapters = null;
    /**
     * Thumbnail image tracks, ordered by quality/bandwidth descending.
     * @private
     * @type {shaka.extern.TrackList}
     */
    this.imageTracks = [];
    /** @private @type {LastRendered | null} */
    this.lastRendered = null;
    /** @private @type {boolean} */
    this.isChanging = false;
    /** @private @type {boolean} */
    this.showContainer = false;
    /** @private @type {Current | null} */
    this.current = null;
    /** @private @type {number | null} */
    this.renderAnimationFrame = null;

    /** @private */
    this.handlers = {
      onWindowBlur: this.onWindowBlur.bind(this),
      onWindowResize: this.onWindowResize.bind(this),
      onPointerMove: this.onPointerMove.bind(this),
      onPointerDown: this.onPointerDown.bind(this),
      onPointerUp: this.onPointerUp.bind(this),
    };

    // Make preview unselectable so that, for example, the info text won't
    // accidentally be selected when scrubbing on FlatSeekBar.
    this.$container = e('div', { className: "sxnd-thumbnail-preview noselect" }, [
      e('div', { className: "content-box" }, [
        this.$display = e('div', { className: "display" }, [
          this.$img = e('img'),
          this.$thumbTimecode = e('div', { className: "thumb-timecode" }),
        ]),
        this.$info = e('span', { className: "info" }, [
          this.$chapterText = e('span', { className: "chapter-text" }),
          this.$timecodeText = e('span', { className: "timecode-text" }),
        ]),
      ]),
    ]);

    this.$seekMarker = e('div', { className: "seek-marker" });

    this.seekBar.append(this.$seekMarker, this.$container);

    this.ensureDisplaySize(DISPLAY_WIDTH, DISPLAY_WIDTH / INITIAL_ASPECT_RATIO);

    window.addEventListener('blur', this.handlers.onWindowBlur);
    window.addEventListener('resize', this.handlers.onWindowResize);
    // TODO: Find a better solution for this
    document.addEventListener('pointermove', this.handlers.onPointerMove);
    document.addEventListener('pointerdown', this.handlers.onPointerDown);
    document.addEventListener('pointerup', this.handlers.onPointerUp);
    document.addEventListener('pointercancel', this.handlers.onPointerUp);
  }

  release() {
    window.removeEventListener('blur', this.handlers.onWindowBlur);
    window.removeEventListener('resize', this.handlers.onWindowResize);
    document.removeEventListener('pointermove', this.handlers.onPointerMove);
    document.removeEventListener('pointerdown', this.handlers.onPointerDown);
    document.removeEventListener('pointerup', this.handlers.onPointerUp);
    document.removeEventListener('pointercancel', this.handlers.onPointerUp);
  }

  /**
   * @param {number | null} fps
   */
  setFps(fps) {
    this.fps = fps;
    this.currentRenderBest();
  }

  /**
   * @param {Chapters} chapters
   */
  setChapters(chapters) {
    this.chapters = chapters;
    this.currentRenderBest();
  }

  /**
   * @param {shaka.extern.TrackList} imageTracks
   */
  setImageTracks(imageTracks) {
    this.imageTracks = imageTracks.slice();
    this.imageTracks.sort((a, b) => b.bandwidth - a.bandwidth);
    this.currentRenderBest();
  }

  /**
   * @private
   */
  onWindowBlur() {
    // The blur event is fired, for example, when the user switches the tab via
    // Ctrl+Tab. If they then move the mouse and return to the player tab, it may
    // be surprising to have the thumbnail preview still open. Thus, close the
    // preview to avoid that.
    this.cancelPreview();
  }

  /**
   * @private
   */
  onWindowResize() {
    this.cancelPreview();
  }

  /**
   * @private
   * @param {PointerEvent} e
   */
  async onPointerMove(e) {
    const seekPosition = this.mouseEventToPosition(e);
    if (seekPosition === undefined) {
      this.current = null;
      return this.setIsVisible(false);
    }

    const thumbPromises = this.getThumbTracks().map(async (track) => {
      const thumb =
        await this.player.getThumbnails(track.id, seekPosition.seconds);

      return thumb === null
        ? null
        : { ...thumb, track };
    });

    const thumbs = filterNonNull(await Promise.all(thumbPromises));

    this.current = { seekPosition, thumbs };

    // Check primary button
    if (this.isChanging && (e.buttons & 1) !== 0) {
      this.interaction?.onChange?.(seekPosition);
    }

    this.currentRenderBest();
  }

  /**
   * @private
   * @param {PointerEvent} e
   */
  onPointerDown(e) {
    // Check primary button
    if ((e.buttons & 1) !== 0) {
      const position = this.mouseEventToPosition(e);
      if (position !== undefined) {
        this.beginChange();

        this.interaction?.onChange?.(position);
      }
    }
  }

  /**
   * @private
   * @param {PointerEvent} e
   */
  onPointerUp(e) {
    this.endChange();

    // Pen & touch: Always close when released
    // Mouse: Only close when also out of screen area
    if (e.pointerType !== 'mouse' || this.mouseEventToPosition(e) === undefined) {
      this.setIsVisible(false);
    }
  }

  /**
   * @private
   * @param {MouseEvent} e
   * @returns {SeekPosition | undefined}
   */
  mouseEventToPosition(e) {
    const duration = this.saneVideoDuration();
    if (duration === undefined) {
      return;
    }

    const isHoveringButton = document.querySelector("input[type=button]:hover, button:hover") !== null;
    if (isHoveringButton) {
      return;
    }

    const bounding = this.seekBar.getBoundingClientRect();

    // Don't check bounds when scrubbing
    if (!this.isChanging) {
      if (this.showContainer) {
        // A seek has already been initiated by hovering the seekbar. Check
        // bounds in such a way that quickly moving the mouse left/right won't
        // accidentally close the container.

        const { left, right, bottom } = bounding;
        if (!(left <= e.clientX && e.clientX <= right && e.clientY <= bottom)) {
          return;
        }

        const { top } = this.$container.getBoundingClientRect();
        if (!(top <= e.clientY)) {
          return;
        }
      } else {
        // Before initiating a seek, check that the seek bar (or a descendant)
        // is actually hovered (= not only an element that visually overlays the
        // seek bar, such as a modal).

        if (!(e.target instanceof Node) || !this.seekBar.contains(e.target)) {
          return;
        }
      }
    }

    const secondsPerPixel = duration / bounding.width;

    let absolute = e.clientX - bounding.left;
    let seconds = clamp(absolute * secondsPerPixel, [0, duration]);
    const chapter = this.chapters?.timeToChapter(seconds);
    let onChapterMarker = false;

    // "Capture" mouse on chapter markers,
    // but only if the user is not currently scrubbing.
    if (chapter && !this.isChanging) {
      const offsetPixels = (seconds - chapter.timecode) / secondsPerPixel;
      if (-2 <= offsetPixels && offsetPixels < 6) {
        seconds = chapter.timecode;
        absolute = seconds / secondsPerPixel;
        onChapterMarker = true;
      }
    }

    return { absolute, seconds, chapter, onChapterMarker };
  }

  /**
   * Resizes display to match aspect ratio of given thumbnail size.
   *
   * @private
   * @param {number} thumbWidth
   * @param {number} thumbHeight
   */
  ensureDisplaySize(thumbWidth, thumbHeight) {
    const previewHeight = Math.floor(DISPLAY_WIDTH / thumbWidth * thumbHeight);
    if (this.$display.clientHeight !== previewHeight) {
      this.$display.style.height = `${previewHeight}px`;
    }
  }

  /**
   * Renders best available thumbnail at current position.
   *
   * @private
   */
  currentRenderBest() {
    if (this.renderAnimationFrame !== null) {
      return;
    }

    this.renderAnimationFrame = window.requestAnimationFrame(() => {
      this.renderAnimationFrame = null;

      const current = this.current;
      if (current === null) {
        return;
      }

      this.setIsVisible(true, current.thumbs.length > 0, false);
      this.renderSeekPosition(current.seekPosition);

      for (const thumb of current.thumbs) {
        const uri = thumb.uris[0];
        if (uri === undefined) {
          continue;
        }

        const tilesetImage = this.network.getCached(uri);
        if (tilesetImage === null) {
          this.network.get(uri)
            .then(() => {
              this.currentRenderBest();
            });

          continue;
        }

        this.renderImageAndShow(uri, thumb, tilesetImage, current.seekPosition);
        break;
      }
    });
  }

  /**
   * Renders the specified thumbnail to the display and shows it to the user.
   *
   * @private
   * @param {string} uri
   * @param {TrackedThumbnail} thumb
   * @param {HTMLImageElement} tilesetImage
   * @param {SeekPosition} seekPosition
   */
  renderImageAndShow(uri, thumb, tilesetImage, seekPosition) {
    // When width/height are in the interval [0,1], we treat them as relative
    // to the tileset size. See `CustomHlsParser`.
    if ((0 <= thumb.width && thumb.width <= 1) && (0 <= thumb.height && thumb.height <= 1)) {
      thumb.positionX *= tilesetImage.width;
      thumb.width *= tilesetImage.width;

      thumb.positionY *= tilesetImage.height;
      thumb.height *= tilesetImage.height;
    }

    this.ensureDisplaySize(thumb.width, thumb.height);

    this.renderImage(uri, thumb, tilesetImage);
    this.setIsVisible(true);

    // If the image has just become visible, the container position may change
    this.positionContainer(seekPosition);
  }

  /**
   * Renders the specified thumbnail to the display.
   *
   * @private
   * @param {string} uri
   * @param {TrackedThumbnail} thumb
   * @param {HTMLImageElement} tilesetImage
   * @param {boolean} force
   */
  renderImage(uri, thumb, tilesetImage, force = false) {
    // Check if it's another thumbnail (`startTime` and `bandwidth` as proxy)
    const shouldRender = (
      force
      || this.lastRendered === null
      || thumb.startTime !== this.lastRendered.thumb.startTime
      || thumb.track.bandwidth !== this.lastRendered.thumb.track.bandwidth
    );

    if (shouldRender) {
      const { positionX, positionY, width, height } = thumb;

      const scale = DISPLAY_WIDTH / width;
      this.$img.replaceWith(tilesetImage);
      this.$img = tilesetImage;
      this.$img.style.transform = [
        `scale(${scale})`,
        `translateX(-${positionX}px)`,
        `translateY(-${positionY}px)`,
      ].join(' ');
      this.$img.style.transformOrigin = 'left top';

      this.renderThumbTimecode(thumb);

      this.lastRendered = { uri, thumb, tilesetImage };
    }
  }

  /**
   * Renders timecode label of thumbnail (top right corner).
   *
   * @private
   * @param {shaka.extern.Thumbnail} thumb
   */
  renderThumbTimecode(thumb) {
    // TODO: Make this more flexible than just accomodating ffmpeg's fps filter
    const videoDuration = this.saneVideoDuration();
    const showHour = videoDuration === undefined || videoDuration >= 3600;
    const targetTime = thumb.startTime + thumb.duration / 2;
    const timecode = buildTimeString(targetTime - 0.00001, showHour, this.fps);

    this.$thumbTimecode.innerText = timecode;
  }

  /**
   * Positions the thumbnail container to match {@link seekPosition}.
   *
   * @private
   * @param {SeekPosition} seekPosition
   */
  positionContainer(seekPosition) {
    // Align the container so that the mouse underneath is centered,
    // but avoid overflowing at the left or right of the seek bar
    const containerX = clamp(
      seekPosition.absolute - this.$container.offsetWidth / 2,
      [0, this.seekBar.clientWidth - this.$container.offsetWidth]
    );
    this.$container.style.left = `${containerX}px`;
  }

  /**
   * Does all rendering related to seek position:
   * - Positions seek marker on timeline
   * - Highlights text if on chapter marker
   * - Sets chapter and timecode texts
   * - Positions the container
   *
   * @private
   * @param {SeekPosition} seekPosition
   */
  renderSeekPosition(seekPosition) {
    const duration = this.saneVideoDuration();
    if (duration === undefined) {
      this.setIsVisible(false);
      return;
    }

    this.$seekMarker.style.left = `${seekPosition.absolute}px`;

    if (seekPosition.onChapterMarker) {
      this.$info.classList.add("on-chapter-marker");
    } else {
      this.$info.classList.remove("on-chapter-marker");
    }

    // Empty chapter titles are hidden to maintain correct distance of info text
    // to thumbnail image
    const title = seekPosition.chapter?.title ?? "";
    this.$chapterText.innerText = title;
    setElementClass(this.$chapterText, 'displayed', title !== "");

    this.$timecodeText.innerText = buildTimeString(seekPosition.seconds, duration >= 3600, this.fps);

    // The info text length may influence the container position, so position
    // after setting the text.
    this.positionContainer(seekPosition);
  }

  /**
   * @private
   */
  cancelPreview() {
    this.setIsVisible(false);

    this.endChange();
  }

  /**
   * Stops seeking and scrubbing.
   *
   * @private
   */
  beginChange() {
    if (!this.isChanging) {
      this.interaction?.onChangeStart?.();
      document.body.classList.add('seek-or-scrub');
      this.isChanging = true;
    }
  }

  /**
   * Stops seeking and scrubbing.
   *
   * @private
   */
  endChange() {
    if (this.isChanging) {
      this.interaction?.onChangeEnd?.();
      document.body.classList.remove('seek-or-scrub');
      this.isChanging = false;
    }
  }

  /**
   * Whether or not the thumbnail preview container is currently shown.
   *
   * @type {boolean}
   */
  get isVisible() {
    return this.showContainer;
  }

  /**
   *
   * @param {boolean} showContainer Whether or not to show the main container.
   * @param {boolean} openThumb Whether or not to open up the image container/space.
   * @param {boolean} showThumb Whether or not to show the thumbnail image.
   */
  setIsVisible(showContainer, openThumb = showContainer, showThumb = openThumb) {
    this.showContainer = showContainer;
    setElementClass(this.$container, 'sxnd-visible', showContainer);
    setElementClass(this.$seekMarker, 'sxnd-visible', showContainer);

    setElementClass(this.$display, 'is-open', openThumb)
    setElementClass(this.$img, 'sxnd-visible', showThumb);
    setElementClass(this.$thumbTimecode, 'sxnd-visible', showThumb);
  }

  /**
   * @private
   */
  getThumbTracks() {
    // Image tracks are sorted by quality. Select the best and worst track
    // of acceptable bandwidth.

    const maximumBandwidth = 0.01 * this.player.getStats().estimatedBandwidth;

    for (let i = 0; i < this.imageTracks.length; i++) {
      const track = /** @type {shaka.extern.Track} */(this.imageTracks[i]);

      if (track.bandwidth < maximumBandwidth) {
        const max = track;

        if (i === this.imageTracks.length - 1) {
          return [max];
        } else {
          const min = /** @type {shaka.extern.Track} */(
            this.imageTracks[this.imageTracks.length - 1]
          );

          return [max, min];
        }
      }
    }

    return [];
  }

  /**
   * Returns either the video duration as finite, non-negative number,
   * or `undefined` otherwise.
   *
   * @private
   * @returns {number | undefined}
   */
  saneVideoDuration() {
    const duration = this.player.getMediaElement()?.duration;
    return duration !== undefined && duration > 0
      ? duration
      : undefined;
  }
}
