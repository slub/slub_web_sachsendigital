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
   * @param {HTMLElement} config.mainContainer
   * @param {HTMLElement} config.seekBar
   * @param {number} config.seekThumbSize
   * @param {shaka.Player} config.player
   * @param {ImageFetcher} config.network
   */
  constructor(config) {
    this.mainContainer = config.mainContainer;
    this.seekBar = config.seekBar;
    this.seekThumbSize = config.seekThumbSize;
    this.player = config.player;
    this.network = config.network;

    const container = templateElement(`
      <div class="thumbnail-preview">
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

    this.seekBar.append(this.dom.container);

    this.handlers = {
      onWindowBlur: this.onWindowBlur.bind(this),
      onMouseMove: this.onMouseMove.bind(this),
    };

    window.addEventListener('blur', this.handlers.onWindowBlur);
    // TODO: Find a better solution for this
    this.mainContainer.addEventListener('mousemove', this.handlers.onMouseMove);
  }

  /**
   * @protected
   */
  onWindowBlur() {
    // The blur event is fired, for example, when the user switches the tab via
    // Ctrl+Tab. If they then move the mouse and return to the player tab, it may
    // be surprising to have the thumbnail preview still open. Thus, close the
    // preview to avoid that.
    this.hidePreview(false);
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
    if (!isPosInRect(bounding, { x: e.clientX, y: e.clientY, toleranceY: 6 })) {
      return;
    }

    const absolute = e.clientX - bounding.left;
    const relative = (absolute - this.seekThumbSize / 2) / (bounding.width - this.seekThumbSize);
    const seconds = relative * this.getVideoDuration();

    return { absolute, relative, seconds };
  }

  /**
   * @protected
   * @param {MouseEvent} e
   */
  async onMouseMove(e) {
    const thumbsTrack = this.getThumbsTrack();
    if (thumbsTrack === undefined) {
      return this.hidePreview();
    }

    const seekPosition = this.mouseEventToPosition(e);
    if (seekPosition === undefined) {
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

  hidePreview() {
    this.setIsVisible(false);
  }

  renderImage(uri, thumb, tilesetImage) {
    // Check if it's another thumbnail (`startTime` as a proxy)
    if (this.lastRendered === null || thumb.startTime !== this.lastRendered.thumb.startTime) {
      this.ctx.drawImage(
        tilesetImage,
        // position and size on source image
        thumb.positionX, thumb.positionY, thumb.width, thumb.height,
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

    this.dom.timecode.innerText = buildTimeString(seekPosition.seconds, this.getVideoDuration() >= 3600);
  }

  setIsVisible(value) {
    if (value) {
      this.dom.container.classList.add('shown');
    } else {
      this.dom.container.classList.remove('shown');
    }
  }
}
