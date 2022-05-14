// @ts-check

import shaka from 'shaka-player/dist/shaka-player.ui';

import VideoFrame from './vendor/VideoFrame';

import typoConstants from '../lib/typoConstants';
import { clamp, e, setElementClass } from '../lib/util';
import ShakaFrontend from './frontend/ShakaFrontend';
import Chapters from './Chapters';
import VariantGroups from './VariantGroups';

export default class DlfMediaPlayer {
  /** @private */
  static hasInstalledPolyfills = false;

  /**
   *
   * @param {Translator & Identifier & Browser} env
   */
  constructor(env) {
    if (!DlfMediaPlayer.hasInstalledPolyfills) {
      shaka.polyfill.installAll();
      DlfMediaPlayer.hasInstalledPolyfills = true;
    }

    /** @private */
    this.env = env;

    /** @private @type {dlf.media.PlayerConstants} @see {parseConstants} */
    this.constants = {
      prevChapterTolerance: 5,
      volumeStep: 0.05,
      seekStep: 5,
      trickPlayFactor: 4,
      minBottomControlsReadyState: 2, // Enough data for current position
    };

    /** @private @type {HTMLElement | null} */
    this.mountPoint = null;

    /** @private @type {HTMLVideoElement} */
    this.video = e('video', {
      id: this.env.mkid(),
      className: "dlf-media",
    });

    /**
     * The object that has caused current pause state, if any.
     *
     * See {@link pauseOn} and {@link resumeOn}.
     *
     * @private
     * @type {any}
     */
    this.videoPausedOn = null;

    /** @private @type {dlf.media.Source[]} */
    this.sources_ = [];

    /** @private @type {number | null} */
    this.startTime = null;

    /** @private @type {shaka.Player} */
    this.player = new shaka.Player(this.video);

    /** @private */
    this.lastReadyState = 0;

    /** @private @type {Event[]} */
    this.controlEventQueue = [];

    /** @private @type {dlf.media.Fps | null} */
    this.fps = null;

    /** @private @type {VariantGroups | null} */
    this.variantGroups = null;

    /** @private @type {Chapters} */
    this.chapters = new Chapters([]);

    /** @private */
    this.frontend = new ShakaFrontend(this.env, this.player, this.video);
    this.poster = this.frontend.$poster;
    this.videoBox = this.frontend.$videoBox;
    this.errorBox = this.frontend.$errorBox;

    this.handlers = {
      onErrorEvent: this.onErrorEvent.bind(this),
      onTrackChange: this.onTrackChange.bind(this),
      onTimeUpdate: this.onTimeUpdate.bind(this),
      onPlay: this.onPlay.bind(this),
    };

    this.registerEventHandlers();

    /** @readonly */
    this.actions = {
      'fullscreen.toggle': () => {
        // Override in application
      },
      'playback.toggle': () => {
        if (this.paused) {
          this.play();
        } else {
          this.pause();
        }
      },
      'playback.volume.mute.toggle': () => {
        this.muted = !this.muted;
      },
      'playback.volume.inc': () => {
        this.volume = this.volume + this.constants.volumeStep;
      },
      'playback.volume.dec': () => {
        this.volume = this.volume - this.constants.volumeStep;
      },
      'playback.captions.toggle': () => {
        this.showCaptions = !this.showCaptions;
      },
      'navigate.rewind': () => {
        this.skipSeconds(-this.constants.seekStep);
      },
      'navigate.seek': () => {
        this.skipSeconds(+this.constants.seekStep);
      },
      'navigate.continuous-rewind': () => {
        this.ensureTrickPlay(-this.constants.trickPlayFactor);
      },
      'navigate.continuous-seek': () => {
        this.ensureTrickPlay(this.constants.trickPlayFactor);
      },
      'navigate.chapter.prev': () => {
        this.prevChapter();
      },
      'navigate.chapter.next': () => {
        this.nextChapter();
      },
      'navigate.frame.prev': () => {
        this.fps?.vifa.seekBackward(1);
        this.frontend.afterManualSeek();
      },
      'navigate.frame.next': () => {
        this.fps?.vifa.seekForward(1);
        this.frontend.afterManualSeek();
      },
      'navigate.position.percental': (
        /** @type {Keybinding<any, any>} */ kb,
        /** @type {number} */ keyIndex
      ) => {
        if (0 <= keyIndex && keyIndex < kb.keys.length) {
          // Implies kb.keys.length > 0

          const relative = keyIndex / kb.keys.length;
          const absolute = relative * this.video.duration;

          this.seekTo(absolute);
        }
      },
      'navigate.thumbnails.snap': (
        /** @type {Keybinding<any, any>} */ _kb,
        /** @type {number} */ _keyIndex,
        /** @type {KeyEventMode} */ mode
      ) => {
        this.frontend.seekBar?.setThumbnailSnap(mode === 'down');
      },
    }
  }

  get controls() {
    return this.frontend.controls;
  }

  get shakaBottomControls() {
    return this.frontend.shakaBottomControls;
  }

  /**
   * @private
   */
  registerEventHandlers() {
    this.player.addEventListener('error', this.handlers.onErrorEvent);
    this.controls.addEventListener('error', this.handlers.onErrorEvent);

    this.player.addEventListener('adaptation', this.handlers.onTrackChange);
    this.player.addEventListener('variantchanged', this.handlers.onTrackChange);

    this.controls.addEventListener('timeandseekrangeupdated', this.handlers.onTimeUpdate);

    this.video.addEventListener('play', this.handlers.onPlay);

    this.registerGestures();
  }

  /**
   * @private
   */
  registerGestures() {
    const g = this.frontend.gestures;
    if (g === null) {
      return;
    }

    g.on('gesture', (e) => {
      switch (e.type) {
        case 'tapup':
          if (e.event.pointerType === 'mouse') {
            if (e.tapCount <= 2) {
              this.actions['playback.toggle']();
            }

            if (e.tapCount === 2) {
              this.actions['fullscreen.toggle']();
            }
          } else if (e.tapCount >= 2) {
            if (e.position.x < 1 / 3) {
              this.actions['navigate.rewind']();
            } else if (e.position.x > 2 / 3) {
              this.actions['navigate.seek']();
            } else if (e.tapCount === 2 && !this.env.isInFullScreen()) {
              this.actions['fullscreen.toggle']();
            }
          }
          break;

        case 'hold':
          if (e.tapCount === 1) {
            // TODO: Somehow extract an action "navigate.relative-seek"? How to pass clientX?
            this.frontend.seekBar?.thumbnailPreview?.beginChange(e.event.clientX);
          } else if (e.tapCount >= 2) {
            if (e.position.x < 1 / 3) {
              this.actions['navigate.continuous-rewind']();
            } else if (e.position.x > 2 / 3) {
              this.actions['navigate.continuous-seek']();
            }
          }
          break;

        case 'swipe':
          // "Natural" swiping
          if (e.direction === 'east') {
            this.actions['navigate.rewind']();
          } else if (e.direction === 'west') {
            this.actions['navigate.seek']();
          }
          break;
      }
    });

    g.on('release', () => {
      this.frontend.seekBar?.endSeek();
      this.cancelTrickPlay();
    });
  }

  /**
   * @returns {dlf.media.PlayerFrontend}
   */
  get ui() {
    return this.frontend;
  }

  /**
   * Determines whether or not the player supports playback of videos in the
   * given mime type.
   *
   * @private
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
   * @returns {Readonly<dlf.media.PlayerConstants>}
   */
  getConstants() {
    return this.constants;
  }

  /**
   *
   * @param {import('../lib/typoConstants').TypoConstants<dlf.media.PlayerConstants>} constants
   */
  parseConstants(constants) {
    this.constants = typoConstants(constants, this.constants);
  }

  /**
   *
   * @param {string} posterUrl
   */
  setPoster(posterUrl) {
    this.poster.src = posterUrl;
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

    mount.replaceWith(this.frontend.domElement);

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
      this.frontend.domElement.replaceWith(this.mountPoint);
      this.mountPoint = null;
    }
  }

  /**
   *
   * @param {string | null} langKey
   */
  showError(langKey) {
    if (langKey !== null) {
      this.errorBox.innerText = this.env.t(langKey);
    }

    setElementClass(this.errorBox, 'dlf-visible', langKey !== null);
  }

  async load() {
    if (this.sources_.length === 0) {
      this.showError('error.playback-not-supported');
      return false;
    }

    // Try loading video until one of the sources works.
    for (const source of this.sources_) {
      try {
        await this.loadManifest(source);
        return true;
      } catch (e) {
        console.error(e);
      }
    }

    this.showError('error.load-failed');
    return false;
  }

  /**
   *
   * @private
   * @param {dlf.media.Source} videoSource
   */
  async loadManifest(videoSource) {
    await this.player.load(videoSource.url, this.startTime, videoSource.mimeType);

    this.variantGroups = new VariantGroups(this.player);

    this.variantGroups.selectGroupWithPrimary()
      || this.variantGroups.selectGroupByRole("main")
      || this.variantGroups.selectGroupByIndex(0);

    this.emitControlEvent('dlf-media-variant-groups', {
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
    } else if (this.fps === null || fps !== this.fps.rate) {
      this.fps = {
        rate: fps,
        vifa: new VideoFrame({
          id: this.video.id,
          frameRate: fps,
        }),
      };
    }

    this.emitControlEvent('dlf-media-fps', { fps: this.fps });
  }

  onTimeUpdate() {
    const readyState = this.video.readyState;

    if (readyState !== this.lastReadyState) {
      this.updateBottomControlsVisibility(readyState);
    }
  }

  onPlay() {
    this.videoPausedOn = null;

    // Hide poster once playback has started the first time
    // This is necessary because "onTimeUpdate" may be fired with a delay
    this.frontend.hidePoster();
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
      this.shakaBottomControls?.classList.remove('dlf-visible');
    } else if (readyState >= this.constants.minBottomControlsReadyState) {
      this.shakaBottomControls?.classList.add('dlf-visible');
    }
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
    this.emitControlEvent('dlf-media-chapters', { chapters });
  }

  /**
   *
   * @param {number | null} startTime
   */
  setStartTime(startTime) {
    this.startTime = startTime;
  }

  get sources() {
    return this.sources_;
  }

  /**
   *
   * @param {dlf.media.Source[]} sources
   */
  setSources(sources) {
    this.sources_ = sources.filter(
      source => this.supportsMimeType(source.mimeType)
    );
  }

  /**
   *
   * @returns {dlf.media.Chapter | undefined}
   */
  getCurrentChapter() {
    return this.timeToChapter(this.currentTime);
  }

  /**
   *
   * @param {number} timecode
   * @returns {dlf.media.Chapter | undefined}
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
    this.videoPausedOn = null;
  }

  /**
   * Pause playback.
   */
  pause() {
    this.video.pause();
  }

  /**
   * Pause playback on the given {@link obj}. See {@link resumeOn}.
   *
   * For example, this may be used to pause the video on opening a modal and
   * resume it when the modal is closed.
   *
   * @param {any} obj
   */
  pauseOn(obj) {
    if (this.videoPausedOn === null && !this.paused) {
      this.videoPausedOn = obj;
      this.pause();
    }
  }

  /**
   * If the video is currently paused because of calling {@link pauseOn} on
   * {@link obj}, resume the video.
   *
   * @param {any} obj
   */
  resumeOn(obj) {
    if (this.videoPausedOn === obj) {
      this.play();
    }
  }

  /**
   *
   * @returns {number | null}
   */
  getFps() {
    return this.fps?.rate ?? null;
  }

  /**
   *
   * @param {number | dlf.media.Chapter} position Timecode (in seconds) or chapter
   */
  seekTo(position) {
    if (typeof position === 'number') {
      this.video.currentTime = position;
    } else if (typeof position.timecode === 'number') {
      this.video.currentTime = position.timecode;
    }

    this.frontend.afterManualSeek();
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
   * @template {keyof dlf.media.EventDetail} K
   * @param {K} key
   * @param {dlf.media.EventDetail[K]} detail
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
