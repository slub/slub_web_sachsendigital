import shaka from 'shaka-player/dist/shaka-player.ui';

import ImageFetcher from './ImageFetcher';
import { buildTimeString, isPosInRect, numberIntoRange, templateElement } from './util';

/**
 * @typedef {{
 *  absolute: number;
 *  seconds: number;
 *  chapter: import('./Chapters').Chapter;
 *  onChapterMarker: boolean;
 *  }} SeekPosition
 *
 * @typedef {{
 *  uri: string;
 *  thumb: any;
 *  tilesetImage: HTMLImageElement;
 * }} LastRendered
 */

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
   * @param {() => number | null} config.getFps
   * @param {(timecode: number) => import('./Chapters').Chapter} config.getChapter
   * @param {ImageFetcher} config.network
   * @param {object} config.interaction
   * @param {(pos: SeekPosition) => void} config.interaction.onChange
   */
  constructor(config) {
    this.seekBar = config.seekBar;
    this.player = config.player;
    this.getFps = config.getFps;
    this.getChapter = config.getChapter;
    this.network = config.network;
    this.interaction = config.interaction;

    // Make preview unselectable so that, for example, the info text won't
    // accidentally be selected when scrubbing on FlatSeekBar.
    const container = templateElement(`
      <div class="thumbnail-preview noselect">
        <div class="display">
          <canvas>
        </div>
        <span class="info">
          <span class="chapter-text"></span>
          <span class="timecode-text"></span>
        </span>
      </div>
    `);

    this.dom = {
      container,
      display: container.querySelector('.display'),
      /** @type {HTMLCanvasElement} */
      canvas: container.querySelector('canvas'),
      info: container.querySelector('.info'),
      chapterText: container.querySelector('.chapter-text'),
      timecodeText: container.querySelector('.timecode-text'),
    };

    this.ctx = this.dom.canvas.getContext('2d');
    /** @type {LastRendered | null} */
    this.lastRendered = null;
    this.isChanging = false;

    this.seekBar.append(this.dom.container);

    this.handlers = {
      onWindowBlur: this.onWindowBlur.bind(this),
      onPointerMove: this.onPointerMove.bind(this),
      onPointerLeave: this.onPointerLeave.bind(this),
      onPointerDown: this.onPointerDown.bind(this),
      onPointerUp: this.onPointerUp.bind(this),
    };

    window.addEventListener('blur', this.handlers.onWindowBlur);
    // TODO: Find a better solution for this
    this.seekBar.addEventListener('pointermove', this.handlers.onPointerMove);
    this.seekBar.addEventListener('pointerleave', this.handlers.onPointerLeave);
    this.seekBar.addEventListener('pointerdown', this.handlers.onPointerDown);
    this.seekBar.addEventListener('pointerup', this.handlers.onPointerUp);
  }

  release() {
    window.removeEventListener('blur', this.handlers.onWindowBlur);
    this.seekBar.removeEventListener('pointermove', this.handlers.onPointerMove);
    this.seekBar.removeEventListener('pointerleave', this.handlers.onPointerLeave);
    this.seekBar.removeEventListener('pointerdown', this.handlers.onPointerDown);
    this.seekBar.removeEventListener('pointerup', this.handlers.onPointerUp);
  }

  /**
   * @protected
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
   *
   * @returns {number}
   */
  getVideoDuration() {
    return this.player.getMediaElement().duration;
  }

  /**
   * @protected
   */
  getThumbsTrack() {
    const estimatedBandwidth = this.player.getStats().estimatedBandwidth;

    const imageTracks = this.player.getImageTracks().filter(
      track => track.bandwidth < estimatedBandwidth * 0.01
    );
    imageTracks.sort((a, b) => b.bandwidth - a.bandwidth);

    return imageTracks[0];
  }

  /**
   * @protected
   * @param {MouseEvent} e
   * @returns {SeekPosition | undefined}
   */
  mouseEventToPosition(e) {
    const duration = this.getVideoDuration();
    if (!(duration > 0)) {
      return;
    }

    const isHoveringButton = document.querySelector("input[type=button]:hover, button:hover") !== null;
    if (isHoveringButton) {
      return;
    }

    // Also allow to seek on the thumbnail container
    const bounding = this.seekBar.getBoundingClientRect();
    const thumbsBounding = this.dom.container.getBoundingClientRect();
    const mousePos = { x: e.clientX, y: e.clientY };
    if (!isPosInRect(bounding, mousePos) && !isPosInRect(thumbsBounding, mousePos)) {
      return;
    }

    const secondsPerPixel = duration / bounding.width;

    let absolute = e.clientX - bounding.left;
    let seconds = absolute * secondsPerPixel;
    const chapter = this.getChapter(seconds);
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
   * @protected
   * @param {PointerEvent} e
   */
  async onPointerMove(e) {
    const seekPosition = this.mouseEventToPosition(e);
    if (seekPosition === undefined) {
      return this.setIsVisible(false);
    }

    // Check primary button
    if (this.isChanging && e.buttons & 1 !== 0) {
      this.interaction?.onChange?.(seekPosition);
    }

    this.setIsVisible(true, false);
    this.renderSeekPosition(seekPosition);

    const thumbsTrack = this.getThumbsTrack();
    if (thumbsTrack === undefined) {
      return;
    }

    const thumb = await this.player.getThumbnails(thumbsTrack.id, seekPosition.seconds);
    if (thumb === null || thumb.uris.length === 0) {
      return;
    }

    const uri = thumb.uris[0];
    if (this.lastRendered === null || uri !== this.lastRendered.uri) {
      this.network.get(uri)
        .then(image => {
          this.renderImage(uri, thumb, image);
          this.setIsVisible(true);
        });
    } else {
      this.renderImage(uri, thumb, this.lastRendered.tilesetImage);
      this.setIsVisible(true);
    }
  }

  onPointerLeave() {
    this.setIsVisible(false);
  }

  /**
   *
   * @param {PointerEvent} e
   */
  onPointerDown(e) {
    const position = this.mouseEventToPosition(e);
    if (position !== undefined) {
      if (!this.isChanging) {
        this.interaction?.onChangeStart?.();
        this.isChanging = true;
      }

      this.interaction?.onChange?.(position);
    }
  }

  onPointerUp() {
    this.changeEnd();
  }

  changeEnd() {
    if (this.isChanging) {
      this.interaction?.onChangeEnd?.();
      this.isChanging = false;
    }
  }

  renderImage(uri, thumb, tilesetImage) {
    // Check if it's another thumbnail (`startTime` as a proxy)
    if (this.lastRendered === null || thumb.startTime !== this.lastRendered.thumb.startTime) {
      let { positionX, positionY, width, height } = thumb;

      // When width/height are in the interval [0,1], we treat them as relative
      // to the tileset size. See `CustomHlsParser`.
      if ((0 <= width && width <= 1) && (0 <= height && height <= 1)) {
        positionX *= tilesetImage.width;
        width *= tilesetImage.width;

        positionY *= tilesetImage.height;
        height *= tilesetImage.height;
      }

      this.ctx.drawImage(
        tilesetImage,
        // position and size on source image
        positionX, positionY, width, height,
        // position and size on destination canvas
        0, 0, this.dom.canvas.width, this.dom.canvas.height
      );

      this.lastRendered = { uri, thumb, tilesetImage };
    }
  }

  /**
   *
   * @param {SeekPosition} seekPosition
   */
  renderSeekPosition(seekPosition) {
    // Align the container so that the mouse underneath is centered,
    // but avoid overflowing at the left or right of the seek bar
    const containerX = numberIntoRange(
      seekPosition.absolute - this.dom.container.offsetWidth / 2,
      [0, this.seekBar.clientWidth - this.dom.container.offsetWidth]
    );
    this.dom.container.style.left = `${containerX}px`;

    const duration = this.getVideoDuration();
    if (!Number.isFinite(duration)) {
      this.setIsVisible(false);
      return;
    }

    this.dom.chapterText.innerText = seekPosition.chapter?.title ?? "";

    if (seekPosition.onChapterMarker) {
      this.dom.info.classList.add("on-chapter-marker");
      this.seekBar.style.cursor = "pointer";
    } else {
      this.dom.info.classList.remove("on-chapter-marker");
      this.seekBar.style.cursor = "initial";
    }

    this.dom.timecodeText.innerText = buildTimeString(seekPosition.seconds, duration >= 3600, this.getFps());
  }

  setIsVisible(showContainer, showThumb = showContainer) {
    this.setElementVisible(this.dom.container, showContainer);
    this.setElementVisible(this.dom.display, showThumb);
  }

  setElementVisible(element, visible) {
    if (visible) {
      element.classList.add('shown');
    } else {
      element.classList.remove('shown');
    }
  }
}
