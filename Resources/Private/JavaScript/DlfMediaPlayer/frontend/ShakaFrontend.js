// @ts-check

import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/ui/controls.less';

import { e } from '../../lib/util';
import {
  FlatSeekBar,
  PresentationTimeTracker,
  VideoTrackSelection
} from '../controls';

/**
 * @implements {dlf.media.PlayerFrontend}
 */
export default class ShakaFrontend {
  /**
   *
   * @param {Translator & Identifier} env
   * @param {shaka.Player} player
   * @param {HTMLMediaElement} media
   */
  constructor(env, player, media) {
    /** @private */
    this.env = env;

    /** @private */
    this.player = player;

    /** @private */
    this.media = media;

    /** @private @type {string[]} */
    this.controlPanelButtons = [];

    /** @private @type {string[]} */
    this.overflowMenuButtons = [];

    /** @type {HTMLElement | null} */
    this.shakaBottomControls = null;

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

    /** @private */
    this.ui = new shaka.ui.Overlay(this.player, this.$videoBox, this.media);

    this.controls = /** @type {shaka.ui.Controls} */(this.ui.getControls());
  }

  get domElement() {
    return this.$container;
  }

  /**
   *
   * @param {string[]} elementKey
   */
  addControlElement(...elementKey) {
    this.controlPanelButtons.push(...elementKey);
  }

  /**
   *
   * @param {string[]} elementKey
   */
  addOverflowButton(...elementKey) {
    this.overflowMenuButtons.push(...elementKey);
  }

  configure() {
    // TODO: Somehow avoid overriding the SeekBar globally?
    FlatSeekBar.register();

    this.ui.configure({
      addSeekBar: true,
      enableTooltips: true,
      controlPanelElements: [
        'play_pause',
        PresentationTimeTracker.register(this.env),
        'spacer',
        'volume',
        'mute',
        ...this.controlPanelButtons,
        'overflow_menu',
      ],
      overflowMenuButtons: [
        'language',
        VideoTrackSelection.register(this.env),
        'playback_rate',
        'loop',
        'quality',
        'picture_in_picture',
        'captions',
        ...this.overflowMenuButtons,
      ],
      addBigPlayButton: true,
      seekBarColors: {
        base: 'rgba(255, 255, 255, 0.3)',
        buffered: 'rgba(255, 255, 255, 0.54)',
        played: 'rgb(255, 255, 255)',
        adBreaks: 'rgb(255, 204, 0)',
      },
      enableKeyboardPlaybackControls: false,
      doubleClickForFullscreen: false,
      singleClickForPlayAndPause: false,
    });

    // DOM is (re-)created in `ui.configure()`, so query container afterwards
    this.shakaBottomControls =
      this.$videoBox.querySelector('.shaka-bottom-controls');
  }

  hidePoster() {
    this.$poster.classList.remove('dlf-visible');
  }
}
