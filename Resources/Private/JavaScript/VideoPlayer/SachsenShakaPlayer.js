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
  /** @private */
  static hasInstalledPolyfills = false;

  /**
   *
   * @param {Translator & Identifier & Browser} env
   */
  constructor(env) {
    if (!SachsenShakaPlayer.hasInstalledPolyfills) {
      shaka.polyfill.installAll();
      SachsenShakaPlayer.hasInstalledPolyfills = true;
    }

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
    this.container = e('div', { className: "noselect" });

    /** @private @type {HTMLVideoElement} */
    this.video = e('video', {
      id: this.env.mkid(),
      className: "sxnd-video",
    });
    this.poster = e('img', {
      className: "sxnd-poster sxnd-visible",
      $error: () => {
        this.hidePoster();
      },
    });
    this.container.append(this.video, this.poster);

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
      onPlay: this.onPlay.bind(this),
      onManualSeek: this.onManualSeek.bind(this),
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

    this.controls.addEventListener('sxnd-manual-seek', this.handlers.onManualSeek);

    this.controls.addEventListener('timeandseekrangeupdated', this.handlers.onTimeUpdate);

    this.video.addEventListener('play', this.handlers.onPlay);
  }

  /**
   * Determines whether or not the player supports playback of videos in the
   * given mime type.
   *
   * @param {string} mimeType
   * @returns {boolean}
   */
  supportsMimeType(mimeType) {
    switch (mimeType) {
      case 'application/dash+xml':
      case 'application/x-mpegurl':
      case 'application/vnd.apple.mpegurl':
        return (
          this.env.supportsMediaSource()
          || this.env.supportsVideoMime(mimeType)
        );

      default:
        return this.env.supportsVideoMime(mimeType);
    }
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
    this.poster.src = posterUrl;
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

    // TODO: Refactor insertion at custom position (left or right of fullscreen)
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

  getContainer() {
    return this.container;
  }

  /**
   * Check if the event {@link e} interacts with user area (e.g., isn't clicking
   * the big play button).
   *
   * @param {PointerEvent} e
   */
  isUserAreaEvent(e) {
    return e.target === this.container.querySelector('.shaka-play-button-container');
  }

  /**
   * Area of the player that may be used for user interaction.
   *
   * @type {DOMRect}
   */
  get userArea() {
    const bounding = this.container.getBoundingClientRect();
    const controlsHeight = this.shakaBottomControls?.getBoundingClientRect().height ?? 0;
    return new DOMRect(bounding.x, bounding.y, bounding.width, bounding.height - controlsHeight - 20);
  }

  /**
   *
   * @param {VideoSource} videoSource
   * @param {number | null} startTime
   */
  async loadManifest(videoSource, startTime = null) {
    await this.player.load(videoSource.url, startTime, videoSource.mimeType);

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

  onPlay() {
    // Hide poster once playback has started the first time
    // This is necessary because "onTimeUpdate" may be fired with a delay
    this.hidePoster();
  }

  onManualSeek() {
    // Hide poster when seeking in pause mode before playback has started
    // We don't want to hide the poster when initial timecode is used
    this.hidePoster();
  }

  hidePoster() {
    this.poster.classList.remove('sxnd-visible');
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

  /**
   * Stop any active seeking/scrubbing and close thumbnail preview.
   */
  endSeek() {
    this.seekBar?.endSeek();
  }

  /**
   *
   * @param {boolean} value
   */
  setThumbnailSnap(value) {
    this.seekBar?.setThumbnailSnap(value);
  }

  /**
   *
   * @param {number} clientX
   */
  beginRelativeSeek(clientX) {
    this.seekBar?.thumbnailPreview?.beginChange(clientX);
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

  get showCaptions() {
    return this.player.isTextTrackVisible()
  }

  set showCaptions(value) {
    this.player.setTextTrackVisibility(value);
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

    this.hidePoster();
  }

  /**
   *
   * @param {number} delta
   */
  skipSeconds(delta) {
    // TODO: Consider end of video
    this.seekTo(this.video.currentTime + delta);
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
