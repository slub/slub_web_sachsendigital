import shaka from 'shaka-player/dist/shaka-player.ui';

import ImageFetcher from './ImageFetcher';
import { buildTimeString, isPosInRect, numberIntoRange, templateElement } from './util';

/**
 * @typedef {{ absolute: number; relative: number; seconds: number }} SeekPosition
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

    // Make preview unselectable so that, for example, the timecode text won't
    // accidentally be selected when scrubbing on FlatSeekBar.
    const container = templateElement(`
      <div class="thumbnail-preview noselect">
        <div class="display">
          <canvas>
        </div>
        <span class="timecode"></span>
      </div>
    `);

    this.dom = {
      container,
      display: container.querySelector('.display'),
      /** @type {HTMLCanvasElement} */
      canvas: container.querySelector('canvas'),
      timecode: container.querySelector('.timecode'),
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
    this.hidePreview();

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
    const isHoveringButton = document.querySelector("input[type=button]:hover, button:hover") !== null;
    if (isHoveringButton) {
      return;
    }

    const bounding = this.seekBar.getBoundingClientRect();
    if (!isPosInRect(bounding, { x: e.clientX, y: e.clientY })) {
      return;
    }

    const absolute = e.clientX - bounding.left;
    const relative = absolute / bounding.width;
    const seconds = relative * this.getVideoDuration();

    return { absolute, relative, seconds };
  }

  /**
   * @protected
   * @param {PointerEvent} e
   */
  async onPointerMove(e) {
    const seekPosition = this.mouseEventToPosition(e);
    if (seekPosition === undefined) {
      return this.hidePreview();
    }

    // Check primary button
    if (this.isChanging && e.buttons & 1 !== 0) {
      this.interaction?.onChange?.(seekPosition);
    }

    const thumbsTrack = this.getThumbsTrack();
    if (thumbsTrack === undefined) {
      return this.hidePreview();
    }

    const thumb = await this.player.getThumbnails(thumbsTrack.id, seekPosition.seconds);
    if (thumb === null || thumb.uris.length === 0) {
      return this.hidePreview();
    }

    const uri = thumb.uris[0];
    if (this.lastRendered === null || uri !== this.lastRendered.uri) {
      this.network.get(uri)
        .then(image => {
          this.renderImage(uri, thumb, image);
          this.setIsVisible(true);
        })
        .catch(() => {
          this.hidePreview();
        });
    } else {
      this.renderImage(uri, thumb, this.lastRendered.tilesetImage);
      this.setIsVisible(true);
    }

    this.renderSeekPosition(seekPosition);
  }

  onPointerLeave() {
    this.hidePreview();
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

  hidePreview() {
    this.setIsVisible(false);
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

  renderSeekPosition(seekPosition) {
    // Align the container so that the mouse underneath is centered,
    // but avoid overflowing at the left or right of the seek bar
    const containerX = numberIntoRange(
      seekPosition.absolute - this.dom.container.offsetWidth / 2,
      [0, this.seekBar.clientWidth - this.dom.container.offsetWidth]
    );
    this.dom.container.style.left = `${containerX}px`;

    let timecodeText = buildTimeString(seekPosition.seconds, this.getVideoDuration() >= 3600, this.getFps());
    const chapter = this.getChapter(seekPosition.seconds);
    if (chapter) {
      timecodeText = `${chapter.title}\n${timecodeText}`;
    }
    this.dom.timecode.innerText = timecodeText;
  }

  setIsVisible(value) {
    if (value) {
      this.dom.container.classList.add('shown');
    } else {
      this.dom.container.classList.remove('shown');
    }
  }
}
