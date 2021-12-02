// @ts-check

import shaka from 'shaka-player/dist/shaka-player.ui';

import Chapters from './Chapters';
import ImageFetcher from './ImageFetcher';
import { buildTimeString, clamp, e } from './util';

/**
 * @typedef {{
 *  absolute: number;
 *  seconds: number;
 *  chapter: Chapter | undefined;
 *  onChapterMarker: boolean;
 *  }} SeekPosition
 *
 * @typedef {{
 *  uri: string;
 *  thumb: any;
 *  tilesetImage: HTMLImageElement;
 * }} LastRendered
 */

const DISPLAY_WIDTH = 160;

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
    /** @private @type {shaka.extern.TrackList} */
    this.imageTracks = [];
    /** @private @type {LastRendered | null} */
    this.lastRendered = null;
    /** @private @type {boolean} */
    this.isChanging = false;
    /** @private @type {boolean} */
    this.showContainer = false;

    /** @private */
    this.handlers = {
      onWindowBlur: this.onWindowBlur.bind(this),
      onPointerMove: this.onPointerMove.bind(this),
      onPointerDown: this.onPointerDown.bind(this),
      onPointerUp: this.onPointerUp.bind(this),
    };

    // Make preview unselectable so that, for example, the info text won't
    // accidentally be selected when scrubbing on FlatSeekBar.
    this.$container = e('div', { className: "thumbnail-preview noselect" }, [
      e('div', { className: "content-box" }, [
        this.$display = e('div', { className: "display" }, [
          this.$canvas = e('canvas'),
        ]),
        this.$info = e('span', { className: "info" }, [
          this.$chapterText = e('span', { className: "chapter-text" }),
          this.$timecodeText = e('span', { className: "timecode-text" }),
        ]),
      ]),
    ]);

    this.$seekMarker = e('div', { className: "seek-marker" });

    this.canvasResolution = { scale: 1, width: 0, height: 0 };
    this.ctx = /** @type {CanvasRenderingContext2D} */(this.$canvas.getContext('2d'));
    if (this.ctx === null) {
      console.error("ThumbnailPreview: Could not acquire canvas context");
      return;
    }

    this.setCanvasResolution(DISPLAY_WIDTH, DISPLAY_WIDTH / (16 / 9));

    this.seekBar.append(this.$seekMarker, this.$container);

    window.addEventListener('blur', this.handlers.onWindowBlur);
    // TODO: Find a better solution for this
    document.addEventListener('pointermove', this.handlers.onPointerMove);
    document.addEventListener('pointerdown', this.handlers.onPointerDown);
    document.addEventListener('pointerup', this.handlers.onPointerUp);
  }

  release() {
    window.removeEventListener('blur', this.handlers.onWindowBlur);
    document.removeEventListener('pointermove', this.handlers.onPointerMove);
    document.removeEventListener('pointerdown', this.handlers.onPointerDown);
    document.removeEventListener('pointerup', this.handlers.onPointerUp);
  }

  /**
   * @param {number | null} fps
   */
  setFps(fps) {
    this.fps = fps;
    this.refreshLastRendered();
  }

  /**
   * @param {Chapters} chapters
   */
  setChapters(chapters) {
    this.chapters = chapters;
    this.refreshLastRendered();
  }

  /**
   * @param {shaka.extern.TrackList} imageTracks
   */
  setImageTracks(imageTracks) {
    this.imageTracks = imageTracks;
    this.refreshLastRendered();
  }

  /**
   * Prepares the canvas for drawing to a target size of
   * {@link width}×{@link height} CSS pixels, taking into account the
   * current device pixel ratio.
   *
   * @private
   * @param {number} width
   * @param {number} height
   */
  setCanvasResolution(width, height) {
    // Code adopted from https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio

    const scale = window.devicePixelRatio;

    this.$canvas.width = scale * width;
    this.$canvas.height = scale * height;

    this.canvasResolution = { scale, width, height };

    this.ctx.scale(scale, scale);

    this.refreshLastRendered();
  }

  /**
   * Resizes and prepares canvas and display for drawing a thumbnail of the
   * specified size.
   *
   * @private
   * @param {number} thumbWidth
   * @param {number} thumbHeight
   */
  ensureDisplaySize(thumbWidth, thumbHeight) {
    const previewHeight = DISPLAY_WIDTH / thumbWidth * thumbHeight;
    if (this.canvasResolution.height !== previewHeight) {
      this.$display.style.height = `${previewHeight}px`;
      this.setCanvasResolution(160, previewHeight);
    }
  }

  /**
   * @private
   */
  onWindowBlur() {
    // The blur event is fired, for example, when the user switches the tab via
    // Ctrl+Tab. If they then move the mouse and return to the player tab, it may
    // be surprising to have the thumbnail preview still open. Thus, close the
    // preview to avoid that.
    this.setIsVisible(false);

    this.changeEnd();
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

  /**
   * @private
   */
  getThumbsTrack() {
    const estimatedBandwidth = this.player.getStats().estimatedBandwidth;

    let result;
    for (const track of this.imageTracks) {
      if (track.bandwidth < estimatedBandwidth * 0.01 && (!result || track.bandwidth < result.bandwidth)) {
        result = track;
      }
    }

    return result;
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
   * @private
   * @param {PointerEvent} e
   */
  async onPointerMove(e) {
    const seekPosition = this.mouseEventToPosition(e);
    if (seekPosition === undefined) {
      return this.setIsVisible(false);
    }

    // Check primary button
    if (this.isChanging && (e.buttons & 1) !== 0) {
      this.interaction?.onChange?.(seekPosition);
    }

    this.setIsVisible(true, false);
    this.renderSeekPosition(seekPosition);

    const thumbsTrack = this.getThumbsTrack();
    if (thumbsTrack === undefined) {
      return;
    }

    const thumb = await this.player.getThumbnails(thumbsTrack.id, seekPosition.seconds);
    if (thumb === null) {
      return;
    }

    const uri = thumb.uris[0];
    if (uri === undefined) {
      return;
    }

    if (this.lastRendered === null || uri !== this.lastRendered.uri) {
      this.network.get(uri)
        .then(image => {
          this.renderImageAndShow(uri, thumb, image, seekPosition);
        });
    } else {
      this.renderImageAndShow(uri, thumb, this.lastRendered.tilesetImage, seekPosition);
    }
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
        if (!this.isChanging) {
          this.interaction?.onChangeStart?.();
          document.body.classList.add('seek-or-scrub');
          this.isChanging = true;
        }

        this.interaction?.onChange?.(position);
      }
    }
  }

  /**
   * @private
   * @param {PointerEvent} e
   */
  onPointerUp(e) {
    this.changeEnd();

    if (this.mouseEventToPosition(e) === undefined) {
      this.setIsVisible(false);
    }
  }

  /**
   * Stops seeking and scrubbing.
   *
   * @private
   */
  changeEnd() {
    if (this.isChanging) {
      this.interaction?.onChangeEnd?.();
      document.body.classList.remove('seek-or-scrub');
      this.isChanging = false;
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

    this.ctx.font = "8px sans-serif";
    this.ctx.textBaseline = 'top';

    const textMetrics = this.ctx.measureText(timecode);
    const textWidth = textMetrics.width;
    // This works because textBaseline = 'top'
    const textHeight = textMetrics.actualBoundingBoxDescent;

    const textPaddingX = 2;
    const textPaddingY = 2;
    const textLeft = this.canvasResolution.width - (textWidth + textPaddingX);

    // Fill text box for solid background
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      textLeft - textPaddingX, 0,
      textWidth + 2 * textPaddingX, textHeight + 2 * textPaddingY
    );

    this.ctx.fillStyle = "white";
    this.ctx.fillText(timecode, textLeft, textPaddingY);
  }

  /**
   * Renders the specified thumbnail to the display.
   *
   * @private
   * @param {string} uri
   * @param {shaka.extern.Thumbnail} thumb
   * @param {HTMLImageElement} tilesetImage
   * @param {boolean} force
   */
  renderImage(uri, thumb, tilesetImage, force = false) {
    // Check if it's another thumbnail (`startTime` as a proxy)
    if (force || this.lastRendered === null || thumb.startTime !== this.lastRendered.thumb.startTime) {
      const { positionX, positionY, width, height } = thumb;

      this.ctx.drawImage(
        tilesetImage,
        // position and size on source image
        positionX, positionY, width, height,
        // position and size on destination canvas
        0, 0, this.canvasResolution.width, this.canvasResolution.height
      );

      this.renderThumbTimecode(thumb);

      this.lastRendered = { uri, thumb, tilesetImage };
    }
  }

  /**
   * Renders the specified thumbnail to the display and shows it to the user.
   *
   * @param {string} uri
   * @param {shaka.extern.Thumbnail} thumb
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
   * Rerenders the last rendered thumbnail, if there is one. This may be
   * used, for example, if the FPS count has changed while the thumbnail is
   * being shown.
   *
   * @private
   */
  refreshLastRendered() {
    if (this.lastRendered) {
      const { uri, thumb, tilesetImage } = this.lastRendered;
      this.renderImage(uri, thumb, tilesetImage, /* force= */ true);
    }
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
    this.setElementVisible(this.$chapterText, title !== "");

    this.$timecodeText.innerText = buildTimeString(seekPosition.seconds, duration >= 3600, this.fps);

    // The info text length may influence the container position, so position
    // after setting the text.
    this.positionContainer(seekPosition);
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
   * @param {boolean} showThumb Whether or not to show the thumbnail image.
   */
  setIsVisible(showContainer, showThumb = showContainer) {
    this.showContainer = showContainer;
    this.setElementVisible(this.$container, showContainer);
    this.setElementVisible(this.$seekMarker, showContainer);

    this.setElementVisible(this.$display, showThumb);
  }

  /**
   * @private
   * @param {HTMLElement} element
   * @param {boolean} visible
   */
  setElementVisible(element, visible) {
    if (visible) {
      element.classList.add('shown');
    } else {
      element.classList.remove('shown');
    }
  }
}
