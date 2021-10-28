import shaka from 'shaka-player/dist/shaka-player.ui';

import Component from './Component';
import ImageFetcher from './ImageFetcher';
import { buildTimeString, isPosInRect, numberIntoRange } from './util';

/**
 * @typedef {{ absolute: number; relative: number; seconds: number }} SeekPosition
 */

/**
 * Check if the thumbnail display should be shown given `state`.
 */
function showDisplay(state) {
  return (
    state.seekPosition !== null
    && state.thumb !== null
    && state.tilesetRemoteUrl === state.thumb.uris[0]
  );
}

/**
 * Component for a thumbnail preview when sliding over the seekbar.
 *
 * Oriented at https://github.com/google/shaka-player/issues/3371#issuecomment-830001465.
 */
export default class ThumbnailPreview extends Component {
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
    super({
      /** @type {SeekPosition | null} */
      seekPosition: null,
      thumb: null,
      /**
       * Remote URL of the currently used thumbnail tileset.
       * @type {string | null}
       */
      tilesetRemoteUrl: null,
      /**
       * The currently used and loaded thumbnail tileset.
       * @type {HTMLImageElement | null}
       */
      tilesetImage: null,
    });

    this.mainContainer = config.mainContainer;
    this.seekBar = config.seekBar;
    this.seekThumbSize = config.seekThumbSize;
    this.player = config.player;
    this.network = config.network;

    const domTmpl = document.createElement("template");
    domTmpl.innerHTML = `
      <div class="thumbnail-preview">
        <div class="display">
          <canvas>
        </div>
        <span class="timecode"></span>
      </div>
    `;
    const container = domTmpl.content.firstElementChild;

    this.dom = {
      container,
      display: container.querySelector('.display'),
      /** @type {HTMLCanvasElement} */
      canvas: container.querySelector('canvas'),
      timecode: container.querySelector('.timecode'),
    };

    this.ctx = this.dom.canvas.getContext('2d');
    this.lastRenderedThumb = null;

    this.seekBar.append(this.dom.container);

    this.handlers = {
      onMouseMove: this.onMouseMove.bind(this),
    };

    // TODO: Find a better solution for this
    this.mainContainer.addEventListener('mousemove', this.handlers.onMouseMove);
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
      return this.resetSeek();
    }

    const seekPosition = this.mouseEventToPosition(e);
    if (seekPosition === undefined) {
      return this.resetSeek();
    }

    const thumb = await this.player.getThumbnails(thumbsTrack.id, seekPosition.seconds);
    if (thumb === null || thumb.uris.length === 0) {
      return this.resetSeek();
    }

    const uri = thumb.uris[0];
    if (uri !== this._state.tilesetRemoteUrl) {
      this._state.tilesetRemoteUrl = null;

      this.network.get(uri)
        .then(image => {
          this.setState({
            tilesetRemoteUrl: uri,
            tilesetImage: image,
          });
        })
        .catch(() => {
          this.resetSeek();
        });
    }

    this.setState({ seekPosition, thumb });
  }

  resetSeek() {
    this.setState({
      seekPosition: null,
    });
  }

  renderImage(thumb, tilesetImage) {
    // Check if it's another thumbnail (`startTime` as a proxy)
    if (this.lastRenderedThumb === null || thumb.startTime !== this.lastRenderedThumb.startTime) {
      this.ctx.drawImage(
        tilesetImage,
        // position and size on source image
        thumb.positionX, thumb.positionY, thumb.width, thumb.height,
        // position and size on destination canvas
        0, 0, this.dom.canvas.width, this.dom.canvas.height
      );

      this.lastRenderedThumb = thumb;
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

  render(state) {
    const { seekPosition, thumb, tilesetImage } = state;

    if (showDisplay(state)) {
      this.renderImage(thumb, tilesetImage);
      this.renderSeekPosition(seekPosition);
      this.setIsVisible(true);
    } else {
      this.setIsVisible(false);
    }
  }
}
