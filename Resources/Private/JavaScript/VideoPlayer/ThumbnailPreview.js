import shaka from 'shaka-player/dist/shaka-player.ui';

import Component from './Component';
import ImageFetcher from './ImageFetcher';
import { isPosInRect, numberIntoRange } from './util';

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
       * Local object URL of the currently used and loaded thumbnail tileset.
       * @type {string | null}
       */
      tilesetObjectUrl: null,
    });

    this.mainContainer = config.mainContainer;
    this.seekBar = config.seekBar;
    this.seekThumbSize = config.seekThumbSize;
    this.player = config.player;
    this.network = config.network;

    this.dom = {};
    this.dom.display = document.createElement("div");
    this.dom.display.className = "thumbnail-display";
    this.dom.image = document.createElement("img");
    this.dom.display.append(this.dom.image);
    this.seekBar.append(this.dom.display);

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
        .then(imageUri => {
          this.setState({
            tilesetRemoteUrl: uri,
            tilesetObjectUrl: imageUri,
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

  render(state) {
    const { seekPosition, thumb, tilesetObjectUrl } = state;

    if (showDisplay(state)) {
      // The condition is a proxy to see if it's another thumbnail
      if (thumb.startTime !== this._state.thumb.startTime) {
        const scale = this.dom.display.clientWidth / thumb.width;
        this.dom.image.style.transform = [
          `scale(${scale})`,
          `translateX(-${thumb.positionX}px)`,
          `translateY(-${thumb.positionY}px)`,
        ].join(' ');
        this.dom.image.style.transformOrigin = 'left top';
      }

      // There are two visual glitches that we combat here:
      // (1) A flicker when the container is already shown but the image not
      //     yet rendered.
      // (2) The previous thumbnail is shown while the next is being rendererd
      if (tilesetObjectUrl !== this._state.tilesetObjectUrl) {
        // Make sure that the user won't see the previous tile (for a short moment)
        this.dom.image.src = "";

        // https://stackoverflow.com/a/24674486
        this.dom.image.addEventListener('load', () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              this.dom.display.classList.add('shown');
            });
          });
        }, { once: true });

        this.dom.image.src = tilesetObjectUrl;
      } else if (!showDisplay(this._state)) {
        this.dom.display.classList.add('shown');
      }

      // Align the display so that the mouse underneath is centered,
      // but avoid overflowing at the left or right of the seek bar
      const displayX = numberIntoRange(
        seekPosition.absolute - this.dom.display.offsetWidth / 2,
        [0, this.seekBar.clientWidth - this.dom.display.offsetWidth]
      );
      this.dom.display.style.left = `${displayX}px`;
    } else {
      this.dom.display.classList.remove('shown');
    }
  }
}
