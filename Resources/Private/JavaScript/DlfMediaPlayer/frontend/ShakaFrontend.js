// @ts-check

import { e } from '../../lib/util';

/**
 * @implements {dlf.media.PlayerFrontend}
 */
export default class ShakaFrontend {
  /**
   *
   * @param {HTMLMediaElement} media
   */
  constructor(media) {
    /** @private */
    this.media = media;

    /** @private */
    this.$container = e('div', {
      className: "dlf-media-player dlf-media-frontend-shaka"
    }, [
      this.$videoBox = e('div', { className: "dlf-media-shaka-box" }, [
        this.$video = media,
        this.$poster = e('img', {
          className: "dlf-media-poster dlf-visible",
          $error: () => {
            this.hidePoster();
          },
        }),
      ]),
      this.$errorBox = e('div', {
        className: "dlf-media-shaka-box dlf-media-error"
      }),
    ]);
  }

  get domElement() {
    return this.$container;
  }

  hidePoster() {
    this.$poster.classList.remove('dlf-visible');
  }
}
