// @ts-check

import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/ui/controls.less';

import VideoFrame from './vendor/VideoFrame';

import { clamp, e } from '../lib/util';
import Chapters from './Chapters';
import {
  FlatSeekBar,
  PresentationTimeTracker,
  VideoTrackSelection,
} from './controls';
import VariantGroups from './VariantGroups';

import '../../Less/VideoPlayer/SachsenShakaPlayer.less';

/**
 * @typedef {{
 *  prevChapterTolerance: number;
 *  minBottomControlsReadyState: number;
 * }} Constants
 */

export default class SachsenShakaPlayer {
  /**
   * Installs polyfills and returns the supported manifest formats in order of
   * preference.
   *
   * @returns {('mpd' | 'hls')[]}
   */
  static initSupport() {
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
      // Conditions taken from shaka.util.Platform.supportsMediaSource()
      // @ts-expect-error: TS says that `window.MediaSource.isTypeSupported`
      // will always be truthy...
      return window.MediaSource && window.MediaSource.isTypeSupported
        ? ['mpd', 'hls']
        : ['hls'];
    } else {
      return [];
    }
  }

  /**
   *
   * @param {Translator & Identifier & Browser} env
   */
  constructor(env) {
    /** @private */
    this.env = env;

    /** @private @type {Constants} */
    this.constants = {
      prevChapterTolerance: 5,
      minBottomControlsReadyState: 2, // Enough data for current position
    };

    /** @private @type {HTMLElement | null} */
    this.mountPoint = null;

    /** @private @type {HTMLElement} */
    this.container = e('div');

    /** @private @type {HTMLVideoElement} */
    this.video = e('video', {
      id: this.env.mkid(),
      className: "sxnd-video",
    });
    this.container.append(this.video);

    /** @private @type {string[]} */
    this.controlPanelButtons = [];

    /** @private @type {string[]} */
    this.overflowMenuButtons = [];

    /** @private @type {shaka.Player} */
    this.player = new shaka.Player(this.video);

    /** @private @type {shaka.ui.Overlay} */
    this.ui = new shaka.ui.Overlay(this.player, this.container, this.video);

    /** @private @type {shaka.ui.Controls} */
    this.controls = /** @type {shaka.ui.Controls} */(this.ui.getControls());

    /** @private */
    this.lastReadyState = 0;

    /** @private @type {HTMLElement | null} */
    this.shakaBottomControls = null;

    /** @private @type {Event[]} */
    this.controlEventQueue = [];

    /** @private @type {FlatSeekBar | null} */
    this.seekBar = null;

    /** @private @type {VideoFrame | null} */
    this.vifa = null;

    /** @private @type {number | null} */
    this.fps = null;

    /** @private @type {VariantGroups | null} */
    this.variantGroups = null;

    /** @private @type {Chapters} */
    this.chapters = new Chapters([]);

    this.handlers = {
      onErrorEvent: this.onErrorEvent.bind(this),
      onTrackChange: this.onTrackChange.bind(this),
      onTimeUpdate: this.onTimeUpdate.bind(this),
    };

    this.player.addEventListener('error', this.handlers.onErrorEvent);
    this.controls.addEventListener('error', this.handlers.onErrorEvent);

    this.player.addEventListener('adaptation', this.handlers.onTrackChange);
    this.player.addEventListener('variantchanged', this.handlers.onTrackChange);

    // TODO: Figure out a good flow of events
    this.controls.addEventListener('sxnd-seek-bar', (e) => {
      const detail = /** @type {SxndSeekBarEvent} */(e).detail;
      this.seekBar = detail.seekBar;
    });

    this.controls.addEventListener('timeandseekrangeupdated', this.handlers.onTimeUpdate);
  }

  /**
   *
   * @param {Partial<Constants>} constants
   */
  setConstants(constants) {
    Object.assign(this.constants, constants);
  }

  /**
   *
   * @param {string} posterUrl
   */
  setPoster(posterUrl) {
    this.video.poster = posterUrl;
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

  /**
   * Configures the Shaka player UI and mounts it into {@link mount}. The mount
   * point is being replaced with the player until {@link unmount} is called.
   *
   * @param {HTMLElement} mount
   */
  mount(mount) {
    if (this.mountPoint !== null) {
      console.warn("Player already mounted");
      return false;
    }

    // TODO: Somehow avoid overriding the SeekBar globally?
    FlatSeekBar.register();

    this.ui.configure({
      addSeekBar: true,
      controlPanelElements: [
        'play_pause',
        'chapters_menu',
        PresentationTimeTracker.register(this.env),
        'spacer',
        'volume',
        'mute',
        ...this.controlPanelButtons,
        'fullscreen',
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
    });

    // Set again after `ui.configure()`
    this.shakaBottomControls =
      this.container.querySelector('.shaka-bottom-controls');

    mount.replaceWith(this.container);

    this.mountPoint = mount;

    return true;
  }

  /**
   * @returns {boolean}
   */
  get isMounted() {
    return this.mountPoint !== null;
  }

  unmount() {
    if (this.mountPoint !== null) {
      this.container.replaceWith(this.mountPoint);
      this.mountPoint = null;
    }
  }

  /**
   *
   * @param {string} manifestUri
   * @param {number | null} startTime
   */
  async loadManifest(manifestUri, startTime = null) {
    await this.player.load(manifestUri, startTime);

    this.variantGroups = new VariantGroups(this.player);

    this.variantGroups.selectGroupWithPrimary()
      || this.variantGroups.selectGroupByRole("main")
      || this.variantGroups.selectGroupByIndex(0);

    this.emitControlEvent('sxnd-variant-groups', {
      variantGroups: this.variantGroups,
    });

    this.updateFrameRate();
  }

  onTrackChange() {
    this.updateFrameRate();
  }

  updateFrameRate() {
    const fps = this.variantGroups?.findActiveTrack()?.frameRate ?? null;

    if (fps === null) {
      this.fps = null;
      this.vifa = null;
    } else if (fps !== this.fps) {
      this.fps = fps;
      this.vifa = new VideoFrame({
        id: this.video.id,
        frameRate: fps,
      });
    }

    this.emitControlEvent('sxnd-fps', { vifa: this.vifa, fps: this.fps });
  }

  onTimeUpdate() {
    const readyState = this.video.readyState;

    if (readyState !== this.lastReadyState) {
      this.updateBottomControlsVisibility(readyState);
    }
  }

  /**
   * @private
   * @param {number} readyState
   */
  updateBottomControlsVisibility(readyState) {
    // When readyState is strictly between 0 and minBottomControlsReadyState,
    // don't change whether controls are shown. Thus, on first load the controls
    // may remain hidden, and on seeking the controls remain visible.

    if (readyState === 0) {
      this.shakaBottomControls?.classList.remove('sxnd-visible');
    } else if (readyState >= this.constants.minBottomControlsReadyState) {
      this.shakaBottomControls?.classList.add('sxnd-visible');
    }
  }

  /**
   * @returns {boolean}
   */
  isThumbnailPreviewOpen() {
    return this.seekBar?.isThumbnailPreviewOpen() ?? false;
  }

  hideThumbnailPreview() {
    this.seekBar?.hideThumbnailPreview();
  }

  /**
   *
   * @returns {boolean}
   */
  anySettingsMenusAreOpen() {
    return this.controls.anySettingsMenusAreOpen();
  }

  hideSettingsMenus() {
    this.controls.hideSettingsMenus();
  }

  toggleFullScreen() {
    this.controls.toggleFullScreen();
  }

  /**
   *
   * @param {string} locale
   */
  setLocale(locale) {
    this.controls.getLocalization()?.changeLocale([locale]);
  }

  /**
   *
   * @param {Chapters} chapters
   */
  setChapters(chapters) {
    this.chapters = chapters;
    this.emitControlEvent('sxnd-chapters', { chapters });
  }

  /**
   *
   * @returns {Chapter | undefined}
   */
  getCurrentChapter() {
    return this.timeToChapter(this.currentTime);
  }

  /**
   *
   * @param {number} timecode
   * @returns {Chapter | undefined}
   */
  timeToChapter(timecode) {
    return this.chapters.timeToChapter(timecode);
  }

  /**
   *
   * @returns {HTMLVideoElement}
   */
  getVideo() {
    return this.video;
  }

  /**
   * Whether or not enough data is available for the current playback position
   * (checks `readyState`).
   *
   * @returns {boolean}
   */
  get hasCurrentData() {
    return this.video.readyState >= 2;
  }

  /**
   * Volume in range [0, 1]. Out-of-bounds values are clamped when set.
   *
   * @type {number}
   */
  get volume() {
    return this.video.volume;
  }

  set volume(value) {
    this.video.volume = clamp(value, [0, 1]);
  }

  /**
   * @type {number}
   */
  get currentTime() {
    return this.video.currentTime;
  }

  /**
   * @type {number}
   */
  get displayTime() {
    return this.controls.getDisplayTime();
  }

  /**
   * Whether or not the video is muted.
   *
   * @type {boolean}
   */
  get muted() {
    return this.video.muted;
  }

  set muted(value) {
    this.video.muted = value;
  }

  /**
   * Whether or not the video is paused.
   *
   * @type {boolean}
   */
  get paused() {
    return this.video.paused;
  }

  /**
   * Start playback.
   */
  play() {
    this.video.play();
  }

  /**
   * Pause playback.
   */
  pause() {
    this.video.pause();
  }

  /**
   *
   * @returns {number | null}
   */
  getFps() {
    return this.fps;
  }

  /**
   *
   * @returns {VideoFrame | null}
   */
  getVifa() {
    return this.vifa;
  }

  /**
   *
   * @param {number | Chapter} position Timecode (in seconds) or chapter
   */
  seekTo(position) {
    if (typeof position === 'number') {
      this.video.currentTime = position;
    } else if (typeof position.timecode === 'number') {
      this.video.currentTime = position.timecode;
    }
  }

  /**
   *
   * @param {number} delta
   */
  skipSeconds(delta) {
    // TODO: Consider end of video
    this.video.currentTime += delta;
  }

  /**
   * Within configured number of seconds of a chapter, jump to the start of the
   * previous chapter. After that, jump to the start of the current chapter. As
   * a fallback, jump to the start of the video.
   */
  prevChapter() {
    const tolerance = this.constants.prevChapterTolerance;
    const prev = this.chapters.timeToChapter(this.currentTime - tolerance);
    this.seekTo(prev ?? 0);
  }

  /**
   * Jumps to the start of the next chapter. If the last chapter is currently
   * being played, this is a no-op.
   */
  nextChapter() {
    const cur = this.getCurrentChapter();
    if (cur) {
      const next = this.chapters.advance(cur, +1);

      if (next) {
        this.seekTo(next);
      }
    }
  }

  /**
   * Enables trick mode at the given {@link rate}, unless the player already
   * is at that rate.
   *
   * @param {number} rate
   */
  ensureTrickPlay(rate) {
    if (this.player.getPlaybackRate() !== rate) {
      this.player.trickPlay(rate);
    }
  }

  cancelTrickPlay() {
    // This may throw, in particular, if Shaka's play rate controller is not yet
    // initialized (because the video is not yet loaded).
    try {
      this.player.cancelTrickPlay();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   *
   * @private
   * @template {keyof SxndEventDetail} K
   * @param {K} key
   * @param {SxndEventDetail[K]} detail
   */
  emitControlEvent(key, detail) {
    this.controlEventQueue.push(new CustomEvent(key, { detail }));
    this.dispatchControlEvents();
  }

  /**
   * @private
   */
  dispatchControlEvents() {
    if (this.isMounted) {
      for (const event of this.controlEventQueue) {
        this.controls.dispatchEvent(event);
      }

      this.controlEventQueue = [];
    }
  }

  /**
   *
   * @param {Event} event
   */
  onErrorEvent(event) {
    if (event instanceof CustomEvent) {
      // TODO: Propagate to user
      const error = event.detail;
      console.error('Error code', error.code, 'object', error);
    }
  }
}
