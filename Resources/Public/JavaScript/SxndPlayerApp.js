/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/Chapters.js":
/*!******************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/Chapters.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Chapters)
/* harmony export */ });
/* harmony import */ var _lib_TimecodeIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/TimecodeIndex */ "../Resources/Private/JavaScript/lib/TimecodeIndex.js");
// @ts-check



/**
 * @extends TimecodeIndex<dlf.media.Chapter>
 */
class Chapters extends _lib_TimecodeIndex__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Returns the chapter that spans across the specified {@link timecode}.
   *
   * @param {number} timecode
   */
  timeToChapter(timecode) {
    return this.timeToElement(timecode);
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/DlfMediaPlayer.js":
/*!************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/DlfMediaPlayer.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DlfMediaPlayer)
/* harmony export */ });
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shaka-player/dist/shaka-player.ui */ "./node_modules/shaka-player/dist/shaka-player.ui.js");
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var shaka_player_ui_controls_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shaka-player/ui/controls.less */ "./node_modules/shaka-player/ui/controls.less");
/* harmony import */ var _vendor_VideoFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vendor/VideoFrame */ "../Resources/Private/JavaScript/DlfMediaPlayer/vendor/VideoFrame.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _Chapters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Chapters */ "../Resources/Private/JavaScript/DlfMediaPlayer/Chapters.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls */ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/index.js");
/* harmony import */ var _VariantGroups__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VariantGroups */ "../Resources/Private/JavaScript/DlfMediaPlayer/VariantGroups.js");
// @ts-check











/**
 * @typedef {{
 *  prevChapterTolerance: number;
 *  minBottomControlsReadyState: number;
 * }} Constants
 */

class DlfMediaPlayer {
  /** @private */
  static hasInstalledPolyfills = false;

  /**
   *
   * @param {Translator & Identifier & Browser} env
   */
  constructor(env) {
    if (!DlfMediaPlayer.hasInstalledPolyfills) {
      shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().polyfill.installAll();
      DlfMediaPlayer.hasInstalledPolyfills = true;
    }

    /** @private */
    this.env = env;

    /** @private @type {Constants} @see {setConstants} */
    this.constants = {
      prevChapterTolerance: 5,
      minBottomControlsReadyState: 2, // Enough data for current position
    };

    /** @private @type {HTMLElement | null} */
    this.mountPoint = null;

    /** @private @type {HTMLElement} */
    this.container = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('div', { className: "dlf-media-player" });

    /** @private @type {HTMLVideoElement} */
    this.video = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('video', {
      id: this.env.mkid(),
      className: "dlf-media",
    });
    this.poster = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('img', {
      className: "dlf-media-poster dlf-visible",
      $error: () => {
        this.hidePoster();
      },
    });
    this.container.append(this.video, this.poster);

    /**
     * The object that has caused current pause state, if any.
     *
     * See {@link pauseOn} and {@link resumeOn}.
     *
     * @private
     * @type {any}
     */
    this.videoPausedOn = null;

    /** @private @type {string[]} */
    this.controlPanelButtons = [];

    /** @private @type {string[]} */
    this.overflowMenuButtons = [];

    /** @private @type {shaka.Player} */
    this.player = new (shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().Player)(this.video);

    /** @private @type {shaka.ui.Overlay} */
    this.ui = new (shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.Overlay)(this.player, this.container, this.video);

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
    this.chapters = new _Chapters__WEBPACK_IMPORTED_MODULE_4__["default"]([]);

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
    this.controls.addEventListener('dlf-media-seek-bar', (e) => {
      const detail = /** @type {dlf.media.SeekBarEvent} */(e).detail;
      this.seekBar = detail.seekBar;
    });

    this.controls.addEventListener('dlf-media-manual-seek', this.handlers.onManualSeek);

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
    _controls__WEBPACK_IMPORTED_MODULE_5__.FlatSeekBar.register();

    // TODO: Refactor insertion at custom position (left or right of fullscreen)
    this.ui.configure({
      addSeekBar: true,
      enableTooltips: true,
      controlPanelElements: [
        'play_pause',
        _controls__WEBPACK_IMPORTED_MODULE_5__.PresentationTimeTracker.register(this.env),
        'spacer',
        'volume',
        'mute',
        ...this.controlPanelButtons,
        'overflow_menu',
      ],
      overflowMenuButtons: [
        'language',
        _controls__WEBPACK_IMPORTED_MODULE_5__.VideoTrackSelection.register(this.env),
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
   * @param {dlf.media.Source} videoSource
   * @param {number | null} startTime
   */
  async loadManifest(videoSource, startTime = null) {
    await this.player.load(videoSource.url, startTime, videoSource.mimeType);

    this.variantGroups = new _VariantGroups__WEBPACK_IMPORTED_MODULE_6__["default"](this.player);

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
      this.vifa = null;
    } else if (fps !== this.fps) {
      this.fps = fps;
      this.vifa = new _vendor_VideoFrame__WEBPACK_IMPORTED_MODULE_2__["default"]({
        id: this.video.id,
        frameRate: fps,
      });
    }

    this.emitControlEvent('dlf-media-fps', { vifa: this.vifa, fps: this.fps });
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
    this.hidePoster();
  }

  onManualSeek() {
    // Hide poster when seeking in pause mode before playback has started
    // We don't want to hide the poster when initial timecode is used
    this.hidePoster();
  }

  hidePoster() {
    this.poster.classList.remove('dlf-visible');
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
    this.emitControlEvent('dlf-media-chapters', { chapters });
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
    this.video.volume = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.clamp)(value, [0, 1]);
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
   * @param {number | dlf.media.Chapter} position Timecode (in seconds) or chapter
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


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/ImageFetcher.js":
/*!**********************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/ImageFetcher.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageFetcher)
/* harmony export */ });
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
// @ts-check



/**
 * @enum {number}
 */
const LoadState = /** @type {const} */ ({
  /** The task is prepared, but execution has not started. */
  Pending: 0,
  /** The image is being fetched from the remote URL. */
  Fetching: 1,
  /** The image has been fetched. Decoding not yet started. */
  Fetched: 2,
  /** The image has been loaded, but not yet decoded. */
  Decoding: 3,
  /** The image has been loaded and decoded. */
  Available: 4,
});

/**
 * @typedef {{
 *  type: typeof LoadState.Pending;
 *  url: string;
 * }} StatePending
 *
 * @typedef {{
 *  type: typeof LoadState.Fetching;
 *  abortController: AbortController;
 *  responsePromise: Promise<Response>;
 * }} StateFetching
 *
 * @typedef {{
 *  type: typeof LoadState.Fetched;
 *  imageBlob: Blob;
 * }} StateFetched
 *
 * @typedef {{
 *  type: typeof LoadState.Decoding;
 *  imagePromise: Promise<HTMLImageElement>;
 * }} StateDecoding
 *
 * @typedef {{
 *  type: typeof LoadState.Available;
 *  image: HTMLImageElement;
 * }} StateCompleted
 *
 * @typedef {StatePending | StateFetching | StateFetched | StateDecoding | StateCompleted} State
 *
 * @typedef {{
 *  state: State;
 *  promise: Promise<HTMLImageElement> | null;
 *  stopNext: boolean;
 * }} Task
 */

/**
 * Fetch images to a cache.
 *
 * @implements {dlf.Network<HTMLImageElement>}
 */
class ImageFetcher {
  constructor() {
    /**
     * Map from URL to task.
     *
     * @private
     * @type {Record<string, Task>}
     */
    this.tasks = {};
  }

  /**
   * Gets an image from {@link url}. If the image is currently being loaded, or
   * has already been loaded, this returns a cached promise. (So this method is
   * idempotent.)
   *
   * @param {string} url
   * @returns {Promise<HTMLImageElement>}
   */
  get(url) {
    const task =
      this.tasks[url] ??= this.createTask(url);

    return this.resumeTask(task);
  }

  /**
   * Gets the image from {@link url} if it is already loaded and cached.
   *
   * @param {string} url
   * @returns {HTMLImageElement | null}
   */
  getCached(url) {
    const state = this.tasks[url]?.state;
    return state?.type === LoadState.Available
      ? state.image
      : null;
  }

  /**
   * Aborts pending request that have been initiated by calling {@link get}.
   */
  abortPending() {
    for (const [url, task] of Object.entries(this.tasks)) {
      // TODO: actually abort network request?
      this.stopTask(task);
    }
  }

  /**
   * @protected
   * @param {string} url
   * @returns {Task}
   */
  createTask(url) {
    return {
      state: {
        type: LoadState.Pending,
        url,
      },
      promise: null,
      stopNext: false, // Value shouldn't matter because promise === null
    };
  }

  /**
   * @protected
   * @param {Task} task
   */
  stopTask(task) {
    task.stopNext = true;
  }

  /**
   * @protected
   * @param {Task} task
   * @returns {Promise<HTMLImageElement>}
   */
  resumeTask(task) {
    // If we're still in the `for(;;)` loop, this just tells them to
    // continue. It's not a race condition (I think) because of JavaScript's
    // single-threaded nature.
    task.stopNext = false;

    if (task.promise === null) {
      task.promise = new Promise(async (resolve, reject) => {
        try {
          // progressTask makes sure that this loop doesn't run indefinitely
          for (; ;) {
            if (task.state.type === LoadState.Available) {
              resolve(task.state.image);
              break;
            }

            if (task.stopNext) {
              task.promise = null;
              break;
            }

            await this.progressTask(task);
          }
        } catch (e) {
          reject(e);
        }
      });
    }

    return task.promise;
  }

  /**
   * This should be the only method that re-sets `task.state`.
   *
   * @protected
   * @param {Task} task
   */
  async progressTask(task) {
    switch (task.state.type) {
      case LoadState.Pending: {
        const abortController = new AbortController();
        const url = task.state.url;
        const responsePromise = fetch(url, { signal: abortController.signal });
        task.state = {
          type: LoadState.Fetching,
          abortController,
          responsePromise,
        }
        break;
      }

      case LoadState.Fetching: {
        const response = await task.state.responsePromise;
        if (response.ok) {
          task.state = {
            type: LoadState.Fetched,
            imageBlob: await response.blob(),
          };
        } else {
          throw response;
        }
        break;
      }

      case LoadState.Fetched: {
        task.state = {
          type: LoadState.Decoding,
          imagePromise: (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.blobToImage)(task.state.imageBlob),
        };
        break;
      }

      case LoadState.Decoding: {
        const image = await task.state.imagePromise;
        task.state = {
          type: LoadState.Available,
          image,
        };
        break;
      }

      case LoadState.Available:
        break;
    }
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/ThumbnailPreview.js":
/*!**************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/ThumbnailPreview.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThumbnailPreview)
/* harmony export */ });
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shaka-player/dist/shaka-player.ui */ "./node_modules/shaka-player/dist/shaka-player.ui.js");
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Chapters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chapters */ "../Resources/Private/JavaScript/DlfMediaPlayer/Chapters.js");
/* harmony import */ var _ImageFetcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ImageFetcher */ "../Resources/Private/JavaScript/DlfMediaPlayer/ImageFetcher.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _lib_buildTimeString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/buildTimeString */ "../Resources/Private/JavaScript/DlfMediaPlayer/lib/buildTimeString.js");
/* harmony import */ var _lib_thumbnails_sanitizeThumbnail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/thumbnails/sanitizeThumbnail */ "../Resources/Private/JavaScript/DlfMediaPlayer/lib/thumbnails/sanitizeThumbnail.js");
// @ts-check









/**
 * @typedef {{
 *  absoluteRaw: number;
 *  secondsPerPixel: number;
 * }} RawSeekPosition
 *
 * @typedef {{
 *  absolute: number;
 *  seconds: number;
 *  chapter: dlf.media.Chapter | undefined;
 *  onChapterMarker: boolean;
 *  }} SeekPosition
 *
 * @typedef {{
 *  uri: string;
 *  thumb: dlf.media.ThumbnailOnTrack;
 *  tilesetImage: HTMLImageElement;
 * }} LastRendered
 *
 * @typedef Current
 * @property {RawSeekPosition} rawSeekPosition
 * @property {SeekPosition} seekPosition
 * @property {dlf.media.ThumbnailOnTrack[]} thumbs Ordered by quality/bandwidth descending.
 *
 * @typedef {{
 *  onChangeStart: () => void;
 *  onChange: (pos: SeekPosition) => void;
 *  onChangeEnd: () => void;
 * }} Interaction
 *
 * @typedef {{
 *  seekBar: HTMLElement;
 *  player: shaka.Player;
 *  network: ImageFetcher;
 *  interaction: Interaction;
 * }} Params
 */

const DISPLAY_WIDTH = 160;
const INITIAL_ASPECT_RATIO = 16 / 9;
const OPEN_DISPLAY_DELAY = 100;

/**
 * Amount of the available video height allotted to thumbnail preview. If the
 * container would exceed that height, the thumbnail image should be hidden.
 */
const MAXIMUM_THUMBNAIL_QUOTA = 0.4;

/**
 * Component for a thumbnail preview when sliding over the seekbar.
 *
 * Oriented at https://github.com/google/shaka-player/issues/3371#issuecomment-830001465.
 */
class ThumbnailPreview {
  /**
   *
   * @param {Params} params
   */
  constructor(params) {
    this.seekBar = params.seekBar;
    this.player = params.player;
    this.network = params.network;
    this.interaction = params.interaction;

    /** @private @type {number | null} */
    this.fps = null;
    /** @private @type {Chapters | null} */
    this.chapters = null;
    /**
     * Thumbnail tracks, ordered by quality/bandwidth descending.
     * @private
     * @type {dlf.media.ThumbnailTrack[]}
     */
    this.thumbnailTracks = [];
    /**
     * Thumbnail track to which cursor is currently snapped.
     *
     * This is also used for downloading thumbnail images, so that the thumbnail
     * segmentation cannot change during snap.
     *
     * @private
     * @type {dlf.media.ThumbnailTrack | null}
     */
    this.snapToThumbnail = null;
    /** @private @type {LastRendered | null} */
    this.lastRendered = null;
    /** @private @type {boolean} */
    this.isChanging = false;
    /** @private @type {{ clientX: number; seconds: number } | null} */
    this.deltaStart = null;
    /** @private @type {Current | null} */
    this.current = null;
    /** @private @type {number | null} */
    this.renderAnimationFrame = null;
    /** @private */
    this.openDisplayTimeout = null;

    /** @private */
    this.handlers = {
      onWindowBlur: this.onWindowBlur.bind(this),
      onWindowResize: this.onWindowResize.bind(this),
      onPointerMove: this.onPointerMove.bind(this),
      onPointerDown: this.onPointerDown.bind(this),
      onPointerUpOrCancel: this.onPointerUpOrCancel.bind(this),
    };

    // Make preview unselectable so that, for example, the info text won't
    // accidentally be selected when scrubbing on FlatSeekBar.
    this.$container = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('div', { className: "dlf-media-thumbnail-preview" }, [
      (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('div', { className: "content-box" }, [
        this.$display = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('div', { className: "display" }, [
          this.$img = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('img'),
        ]),
        this.$info = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('span', { className: "info" }, [
          this.$chapterText = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('span', { className: "chapter-text" }),
          this.$timecodeText = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('span', { className: "timecode-text" }),
        ]),
      ]),
    ]);

    this.$seekMarker = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('div', { className: "seek-marker" });
    this.$seekThumbBar = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.e)('div', { className: "seek-thumb-bar" });

    this.seekBar.append(this.$seekMarker, this.$seekThumbBar, this.$container);

    this.ensureDisplaySize(DISPLAY_WIDTH, DISPLAY_WIDTH / INITIAL_ASPECT_RATIO);

    window.addEventListener('blur', this.handlers.onWindowBlur);
    window.addEventListener('resize', this.handlers.onWindowResize);
    // TODO: Find a better solution for this
    document.addEventListener('pointermove', this.handlers.onPointerMove);
    document.addEventListener('pointerdown', this.handlers.onPointerDown);
    document.addEventListener('pointerup', this.handlers.onPointerUpOrCancel);
    document.addEventListener('pointercancel', this.handlers.onPointerUpOrCancel);
  }

  release() {
    window.removeEventListener('blur', this.handlers.onWindowBlur);
    window.removeEventListener('resize', this.handlers.onWindowResize);
    document.removeEventListener('pointermove', this.handlers.onPointerMove);
    document.removeEventListener('pointerdown', this.handlers.onPointerDown);
    document.removeEventListener('pointerup', this.handlers.onPointerUpOrCancel);
    document.removeEventListener('pointercancel', this.handlers.onPointerUpOrCancel);
  }

  /**
   * @param {number | null} fps
   */
  setFps(fps) {
    this.fps = fps;
    this.currentRenderBest();
  }

  /**
   * @param {Chapters} chapters
   */
  setChapters(chapters) {
    this.chapters = chapters;
    this.currentRenderBest();
  }

  /**
   * @param {readonly dlf.media.ThumbnailTrack[]} thumbnails
   */
  async setThumbnailTracks(thumbnails) {
    this.thumbnailTracks = thumbnails.slice();
    this.thumbnailTracks.sort((a, b) => b.bandwidth - a.bandwidth);

    await this.setThumbnailSnap(false);
  }

  /**
   *
   * @param {boolean} value
   */
  async setThumbnailSnap(value) {
    if (value) {
      this.snapToThumbnail = this.lastRendered?.thumb.track ?? this.thumbnailTracks[0] ?? null;
    } else {
      this.snapToThumbnail = null;
    }

    if (this.current) {
      this.current.seekPosition = await this.snapPosition(this.current.rawSeekPosition);
    }

    if (this.current) {
      this.renderSeekPosition(this.current.seekPosition)
    }

    this.currentRenderBest();
  }

  /**
   * @private
   */
  onWindowBlur() {
    // The blur event is fired, for example, when the user switches the tab via
    // Ctrl+Tab. If they then move the mouse and return to the player tab, it may
    // be surprising to have the thumbnail preview still open. Thus, close the
    // preview to avoid that.
    this.cancelPreview();
  }

  /**
   * @private
   */
  onWindowResize() {
    this.cancelPreview();
  }

  /**
   * @private
   * @param {PointerEvent} e
   */
  async onPointerMove(e) {
    const rawSeekPosition = this.mouseEventToPosition(e);
    if (rawSeekPosition === undefined) {
      return this.setIsVisible(false);
    }

    const seekPosition = await this.snapPosition(rawSeekPosition);

    if (e.pointerType === 'touch') {
      this.beginChange();
    }

    /** @type {dlf.media.ThumbnailOnTrack[]} */
    let thumbs = [];

    // If thumbnails are not shown, also avoid unnecessary downloads of images
    if (this.showThumbnailImage()) {
      const position = seekPosition.seconds;
      const maximumBandwidth = 0.01 * this.player.getStats().estimatedBandwidth;
      thumbs = await this.getThumbnails(position, maximumBandwidth);
    }

    const isOpening = this.current === null;
    this.current = { rawSeekPosition, seekPosition, thumbs };

    // Check primary button
    if (this.isChanging && (e.buttons & 1) !== 0) {
      this.interaction?.onChange?.(seekPosition);
    }

    this.currentRenderBest(isOpening);
  }

  /**
   * @private
   * @param {PointerEvent} e
   */
  async onPointerDown(e) {
    // Check primary button
    if ((e.buttons & 1) !== 0) {
      const position = this.mouseEventToPosition(e, e.pointerType === 'mouse');
      if (position !== undefined) {
        const fullPosition = await this.snapPosition(position);

        // Call beginChange() after snapPosition(), so that it won't think
        // we're scrubbing
        this.beginChange();
        this.interaction?.onChange?.(fullPosition);
      }
    }
  }

  /**
   * @private
   * @param {PointerEvent} e
   */
  onPointerUpOrCancel(e) {
    this.endChange();

    // Pen & touch: Always close when released
    // Mouse: Only close when also out of screen area
    if (e.pointerType !== 'mouse' || this.mouseEventToPosition(e) === undefined) {
      this.setIsVisible(false);
    }
  }

  /**
   * @private
   * @param {MouseEvent} e
   * @param {boolean} allowWideSeekArea
   * @returns {RawSeekPosition | undefined}
   */
  mouseEventToPosition(e, allowWideSeekArea = true) {
    const duration = this.saneVideoDuration();
    if (duration === undefined) {
      return;
    }

    const isHoveringButton = document.querySelector("input[type=button]:hover, button:hover") !== null;
    if (isHoveringButton) {
      return;
    }

    const bounding = this.seekBar.getBoundingClientRect();
    let zeroLeft = bounding.left;
    if (this.deltaStart !== null) {
      const pxPerSec = bounding.width / duration;
      zeroLeft = this.deltaStart.clientX - this.deltaStart.seconds * pxPerSec;
    }

    // Don't check bounds when scrubbing
    if (!this.isChanging) {
      if (this.isVisible && allowWideSeekArea) {
        // A seek has already been initiated by hovering the seekbar. Check
        // bounds in such a way that quickly moving the mouse left/right won't
        // accidentally close the container.

        const { right, bottom } = bounding;
        if (!(zeroLeft <= e.clientX && e.clientX <= right && e.clientY <= bottom)) {
          return;
        }

        let { top } = this.$container.getBoundingClientRect();
        // We don't want the thumbnail preview to be opened accidentally. If the
        // user is hovering quickly from below to above the seek bar, shrink the
        // area above the seek bar that would keep the thumbnail preview open.
        if (this.openDisplayTimeout !== null) {
          top += (bottom - top) / 2;
        }
        if (!(top <= e.clientY)) {
          return;
        }
      } else {
        // Before initiating a seek, check that the seek bar (or a descendant)
        // is actually hovered (= not only an element that visually overlays the
        // seek bar, such as a modal).

        if (!(e.target instanceof Node) || !this.seekBar.contains(e.target)) {
          return;
        }
      }
    }

    const secondsPerPixel = duration / bounding.width;
    let absoluteRaw = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.clamp)(e.clientX - zeroLeft, [0, bounding.width]);
    return { absoluteRaw, secondsPerPixel };
  }

  /**
   *
   * @param {RawSeekPosition} position
   * @returns {Promise<SeekPosition>}
   */
  async snapPosition(position) {
    let { absoluteRaw: absolute, secondsPerPixel } = position;
    let seconds = absolute * secondsPerPixel;

    // Two pixels of leeway to the left
    const chapter = this.chapters?.timeToChapter(seconds + secondsPerPixel * 2);
    let onChapterMarker = false;

    // "Capture" mouse on chapter markers or thumbnail snap,
    // but only if the user is not currently scrubbing.
    if (!this.isChanging) {
      if (this.snapToThumbnail !== null) {
        const thumb = await this.getSingleThumbnail(this.snapToThumbnail, seconds);
        if (thumb !== null) {
          seconds = thumb.imageTime;
          absolute = seconds / secondsPerPixel;
        }
      }

      if (chapter) {
        const offsetPixels = (seconds - chapter.timecode) / secondsPerPixel;
        if (offsetPixels < 6) {
          if (this.snapToThumbnail === null) {
            seconds = chapter.timecode;
            absolute = seconds / secondsPerPixel;
          }
          onChapterMarker = true;
        }
      }
    }

    return { absolute, seconds, chapter, onChapterMarker };
  }

  /**
   * Resizes display to match aspect ratio of given thumbnail size.
   *
   * @private
   * @param {number} thumbWidth
   * @param {number} thumbHeight
   */
  ensureDisplaySize(thumbWidth, thumbHeight) {
    const previewHeight = Math.floor(DISPLAY_WIDTH / thumbWidth * thumbHeight);
    if (this.$display.clientHeight !== previewHeight) {
      this.$display.style.height = `${previewHeight}px`;
    }
  }

  /**
   * Renders best available thumbnail at current position.
   *
   * @private
   * @param {boolean} isOpening
   */
  currentRenderBest(isOpening = false) {
    // We don't wan't the thumbnail preview to be opened when the user is just
    // moving the mouse through the seekbar, so add a short timeout.
    if (isOpening && this.openDisplayTimeout === null && OPEN_DISPLAY_DELAY > 0) {
      this.openDisplayTimeout = setTimeout(() => {
        this.openDisplayTimeout = null;
        this.currentRenderBest();
      }, OPEN_DISPLAY_DELAY);

      return;
    }

    if (this.openDisplayTimeout !== null || this.renderAnimationFrame !== null) {
      return;
    }

    this.renderAnimationFrame = window.requestAnimationFrame(() => {
      this.renderAnimationFrame = null;

      const current = this.current;
      if (current === null) {
        return;
      }

      this.setIsVisible(true, current.thumbs.length > 0, false);
      this.renderSeekPosition(current.seekPosition);

      for (const thumb of current.thumbs) {
        const uri = thumb.uris[0];
        if (uri === undefined) {
          continue;
        }

        const tilesetImage = this.network.getCached(uri);
        if (tilesetImage === null) {
          this.network.get(uri)
            .then(() => {
              this.currentRenderBest();
            });

          continue;
        }

        this.renderImageAndShow(uri, thumb, tilesetImage, current.seekPosition);
        break;
      }
    });
  }

  /**
   * Renders the specified thumbnail to the display and shows it to the user.
   *
   * @private
   * @param {string} uri
   * @param {dlf.media.ThumbnailOnTrack} thumb
   * @param {HTMLImageElement} tilesetImage
   * @param {SeekPosition} seekPosition
   */
  renderImageAndShow(uri, thumb, tilesetImage, seekPosition) {
    this.ensureDisplaySize(thumb.width, thumb.height);

    this.renderImage(uri, thumb, tilesetImage);
    this.setIsVisible(true);

    // If the image has just become visible, the container position may change
    this.positionContainer(seekPosition);

    // The thumbnail snap range may need to be re-rendered
    this.renderSeekPosition(seekPosition, thumb);
  }

  /**
   * Renders the specified thumbnail to the display.
   *
   * @private
   * @param {string} uri
   * @param {dlf.media.ThumbnailOnTrack} thumb
   * @param {HTMLImageElement} tilesetImage
   * @param {boolean} force
   */
  renderImage(uri, thumb, tilesetImage, force = false) {
    // Check if it's another thumbnail (`imageTime` and `bandwidth` as proxy)
    const shouldRender = (
      force
      || this.lastRendered === null
      || thumb.imageTime !== this.lastRendered.thumb.imageTime
      || thumb.bandwidth !== this.lastRendered.thumb.bandwidth
    );

    if (shouldRender) {
      const { positionX, positionY, width, height } = thumb;

      const scale = DISPLAY_WIDTH / width;
      this.$img.replaceWith(tilesetImage);
      this.$img = tilesetImage;
      this.$img.style.transform = [
        `scale(${scale})`,
        `translateX(-${positionX}px)`,
        `translateY(-${positionY}px)`,
      ].join(' ');
      this.$img.style.transformOrigin = 'left top';

      this.lastRendered = { uri, thumb, tilesetImage };
    }
  }

  /**
   * Positions the thumbnail container to match {@link seekPosition}.
   *
   * @private
   * @param {SeekPosition} seekPosition
   */
  positionContainer(seekPosition) {
    // Align the container so that the mouse underneath is centered,
    // but avoid overflowing at the left or right of the seek bar
    const containerX = (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.clamp)(
      seekPosition.absolute - this.$container.offsetWidth / 2,
      [0, this.seekBar.clientWidth - this.$container.offsetWidth]
    );
    this.$container.style.left = `${containerX}px`;
  }

  /**
   * Does all rendering related to seek position:
   * - Positions seek marker on timeline
   * - Highlights text if on chapter marker
   * - Sets chapter and timecode texts
   * - Positions the container
   *
   * @private
   * @param {SeekPosition} seekPosition
   * @param {dlf.media.Thumbnail | null} thumb
   */
  renderSeekPosition(seekPosition, thumb = null) {
    const duration = this.saneVideoDuration();
    if (duration === undefined) {
      this.setIsVisible(false);
      return;
    }

    this.$seekMarker.style.left = `${seekPosition.absolute}px`;

    if (thumb !== null && this.snapToThumbnail !== null) {
      this.$seekThumbBar.style.left = `${thumb.startTime / duration * 100}%`;
      this.$seekThumbBar.style.width = `${thumb.duration / duration * 100}%`;
    }

    if (seekPosition.onChapterMarker) {
      this.$info.classList.add("on-chapter-marker");
    } else {
      this.$info.classList.remove("on-chapter-marker");
    }

    // Empty chapter titles are hidden to maintain correct distance of info text
    // to thumbnail image
    const title = seekPosition.chapter?.title ?? "";
    this.$chapterText.innerText = title;
    (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.setElementClass)(this.$chapterText, 'displayed', title !== "");

    this.$timecodeText.innerText = (0,_lib_buildTimeString__WEBPACK_IMPORTED_MODULE_4__["default"])(seekPosition.seconds, duration >= 3600, this.fps);

    // The info text length may influence the container position, so position
    // after setting the text.
    this.positionContainer(seekPosition);
  }

  /**
   * @private
   */
  cancelPreview() {
    this.setIsVisible(false);

    this.endChange();
  }

  /**
   * Starts seeking and scrubbing.
   *
   * @public
   * @param {number | null} clientX
   */
  beginChange(clientX = null) {
    if (!this.isChanging) {
      this.deltaStart = this.convertDelta(clientX);

      this.interaction?.onChangeStart?.();
      document.body.classList.add('seek-or-scrub');
      this.isChanging = true;
    }
  }

  /**
   *
   * @private
   * @param {number | null} clientX
   */
  convertDelta(clientX) {
    if (clientX === null) {
      return null;
    }

    const media = this.player.getMediaElement();
    if (media === null) {
      return null;
    }

    return {
      clientX,
      seconds: media.currentTime,
    };
  }

  /**
   * Stops seeking and scrubbing.
   */
  endChange() {
    if (this.isChanging) {
      this.deltaStart = null;
      this.interaction?.onChangeEnd?.();
      document.body.classList.remove('seek-or-scrub');
      this.isChanging = false;
    }
  }

  /**
   * Whether or not the thumbnail preview container is currently shown.
   *
   * @type {boolean}
   */
  get isVisible() {
    return this.current !== null;
  }

  /**
   *
   * @param {boolean} showContainer Whether or not to show the main container.
   * @param {boolean} openThumb Whether or not to open up the image container/space.
   * @param {boolean} showThumb Whether or not to show the thumbnail image.
   */
  setIsVisible(showContainer, openThumb = showContainer, showThumb = openThumb) {
    if (!showContainer) {
      this.current = null;
    }

    (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.setElementClass)(this.$container, 'dlf-visible', showContainer);
    (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.setElementClass)(this.$seekMarker, 'dlf-visible', showContainer);
    (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.setElementClass)(this.$seekThumbBar, 'dlf-visible', showThumb && this.snapToThumbnail !== null);

    (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.setElementClass)(this.$display, 'is-open', openThumb)
    ;(0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.setElementClass)(this.$img, 'dlf-visible', showThumb);

    // Make sure the thumbnail image won't be dragged when scrubbing
    (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.disableDragging)(this.$img);
  }

  /**
   * @private
   * @param {number} position
   * @param {number} maximumBandwidth
   * @returns {Promise<dlf.media.ThumbnailOnTrack[]>}
   */
  async getThumbnails(position, maximumBandwidth) {
    /** @type {dlf.media.ThumbnailTrack[]} */
    let tracks = [];

    if (this.snapToThumbnail !== null) {
      tracks = [this.snapToThumbnail];
    } else {
      // Find best and cheapest track of acceptable bandwidth
      // Thumbnail tracks are ordered descending
      let best = this.thumbnailTracks.find(track => track.bandwidth < maximumBandwidth);
      if (best !== undefined) {
        let cheapest = /** @type {dlf.media.ThumbnailTrack} */(
          this.thumbnailTracks[this.thumbnailTracks.length - 1]
        );

        tracks = best === cheapest
          ? [best]
          : [best, cheapest];
      }
    }

    const thumbPromises = tracks.map(
      (track) => this.getSingleThumbnail(track, position)
    );

    return (0,_lib_util__WEBPACK_IMPORTED_MODULE_3__.filterNonNull)(await Promise.all(thumbPromises));
  }

  /**
   *
   * @private
   * @param {dlf.media.ThumbnailTrack} track
   * @param {number} position
   * @returns {Promise<dlf.media.ThumbnailOnTrack | null>}
   */
  async getSingleThumbnail(track, position) {
    const thumbRaw = await track.getThumb(position);
    const videoDuration = this.saneVideoDuration();

    if (thumbRaw === null || videoDuration === undefined) {
      return null;
    }

    return (0,_lib_thumbnails_sanitizeThumbnail__WEBPACK_IMPORTED_MODULE_5__["default"])(thumbRaw, videoDuration);
  }

  /**
   * Whether or not to show a thumbnail image (if available).
   *
   * @private
   * @returns {boolean}
   */
  showThumbnailImage() {
    const video = this.player.getMediaElement();
    const maximumContainerHeight =
      (video?.clientHeight ?? 0) * MAXIMUM_THUMBNAIL_QUOTA;
    const estimatedContainerHeight = 300;
    return estimatedContainerHeight <= maximumContainerHeight;
  }

  /**
   * Returns either the video duration as finite, non-negative number,
   * or `undefined` otherwise.
   *
   * @private
   * @returns {number | undefined}
   */
  saneVideoDuration() {
    const duration = this.player.getMediaElement()?.duration;
    return duration !== undefined && duration > 0
      ? duration
      : undefined;
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/VariantGroups.js":
/*!***********************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/VariantGroups.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VariantGroups)
/* harmony export */ });
/* harmony import */ var _lib_thumbnails_ShakaThumbnailTrack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/thumbnails/ShakaThumbnailTrack */ "../Resources/Private/JavaScript/DlfMediaPlayer/lib/thumbnails/ShakaThumbnailTrack.js");
// @ts-check



/**
 * @typedef {string} GroupKey
 *
 * @typedef {{
 *  key: GroupKey;
 *  variants: shaka.extern.Variant[];
 *  roles: Set<string>;
 *  hasPrimary: boolean;
 * }} Group
 *
 * @typedef {{
 *  id: string | null;
 *  group: string;
 * }} GroupId
 */

/**
 * Switch among video tracks in Shaka Player by grouping the manifest variants.
 * This allows to adapt bitrate and switch audio language within a group.
 *
 * The variants are grouped via their representation id (MPD) or name (HLS).
 */
class VariantGroups {
  /**
   *
   * @param {shaka.Player} player Player to which the variant groups are bound.
   * Variants are read from this player's manifest.
   */
  constructor(player) {
    /**
     * @private
     * @type {shaka.Player}
     */
    this.player = player;

    /**
     * @private
     * @type {shaka.extern.Manifest | null}
     */
    this.manifest = player.getManifest();

    /**
     * @private
     * @type {GroupKey[]}
     */
    this.groupKeys = [];

    /**
     * @private
     * @type {Group[]}
     */
    this.groups = [];

    /**
     * @private
     * @type {Record<GroupKey, Group>}
     */
    this.keyToGroup = {};

    if (this.manifest === null) {
      console.warn("Manifest not available");
      return;
    }

    for (const variant of this.manifest.variants) {
      this.addVariant(variant);
    }
  }

  /**
   * Parses the representation ID / name {@link id}.
   *
   * @param {string | null} id
   * @returns {GroupId}
   */
  static splitRepresentationId(id) {
    const parts = (id ?? "").split('#');

    return {
      id: parts[0] ?? null,
      group: parts[1] ?? "Standard",
    };
  }

  /**
   * Sorts {@link variant} into its group if it references a video.
   *
   * @param {shaka.extern.Variant} variant
   */
  addVariant(variant) {
    const video = variant.video;

    if (video) {
      const key = VariantGroups.splitRepresentationId(video.originalId).group;
      const group = this.getGroupOrCreate(key);

      group.variants.push(variant);

      for (const role of video.roles) {
        group.roles.add(role);
      }

      if (video.primary) {
        group.hasPrimary = true;
      }
    }
  }

  /**
   * The number of variant groups.
   *
   * @returns {number}
   */
  get numGroups() {
    return this.groupKeys.length;
  }

  /**
   * Returns a group with the specified key. If the group does not yet exist,
   * an empty group with this key is created.
   *
   * @param {GroupKey} key
   * @returns {Group}
   */
  getGroupOrCreate(key) {
    let group = this.keyToGroup[key];

    if (!group) {
      group = this.keyToGroup[key] = {
        key: key,
        variants: [],
        roles: new Set(),
        hasPrimary: false,
      };

      this.groupKeys.push(key);
      this.groups.push(group);
    }

    return group;
  }

  /**
   * Returns the track that is currently active (in the bound player), or
   * `undefined` if no track is active.
   *
   * @returns {shaka.extern.Track | undefined}
   */
  findActiveTrack() {
    // There should be at most one active variant at a time
    return this.player.getVariantTracks().find(track => track.active);
  }

  /**
   * Returns the thumbnail tracks that match the currently active group.
   *
   * This abstracts over the ways how thumbnails may be provided, namely either
   * via the video manifest, or via a separate thumbnails.json manifest.
   *
   * @returns {dlf.media.ThumbnailTrack[]}
   */
  findThumbnailTracks() {
    /** @type {dlf.media.ThumbnailTrack[]} */
    const result = [];

    const activeGroupKey = this.findActiveGroup()?.key;

    // Add thumbnails from DASH / HLS
    for (const track of this.player.getImageTracks()) {
      if (VariantGroups.splitRepresentationId(track.originalImageId).group === activeGroupKey) {
        result.push(new _lib_thumbnails_ShakaThumbnailTrack__WEBPACK_IMPORTED_MODULE_0__["default"](this.player, track));
      }
    }

    return result;
  }

  /**
   * Returns the group of the currently active track, or `undefined` if there is
   * no such group.
   *
   * @returns {Group | undefined}
   */
  findActiveGroup() {
    const track = this.findActiveTrack();

    if (track) {
      const key =
        VariantGroups.splitRepresentationId(track.originalVideoId).group;

      return this.keyToGroup[key];
    }
  }

  /**
   * Selects a track within {@link group}. Tracks that have the same audio
   * language as the currently active track are preferred.
   *
   * @param {Group} group
   */
  selectGroup(group) {
    if (!this.manifest) {
      console.warn("Cannot select group: Manifest not available");
      return;
    }

    // NOTE: The object-based comparison is intentional and suffices to prevent
    //       re-selecting the currently active group.
    if (this.manifest.variants !== group.variants) {
      // Get active track before selecting group variants
      const activeTrack = this.findActiveTrack();

      this.manifest.variants = group.variants;

      // Basically, trigger Shaka to select a variant
      // TODO: Also consider role?
      this.player.selectAudioLanguage(activeTrack?.language ?? 'und');
    }
  }

  /**
   *
   * @protected
   * @param {Group | undefined} group
   * @returns {boolean}
   */
  trySelectGroup(group) {
    if (group) {
      this.selectGroup(group);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Selects the group specified by {@link key} (cf. {@link selectGroup}).
   *
   * @param {GroupKey} key
   * @returns {boolean} Whether or not a relevant group has been found.
   */
  selectGroupByKey(key) {
    return this.trySelectGroup(this.keyToGroup[key]);
  }

  /**
   * Selects the group of index {@link index} (cf. {@link selectGroup}).
   *
   * @param {number} idx
   * @returns {boolean} Whether or not a relevant group has been found.
   */
  selectGroupByIndex(idx) {
    return this.trySelectGroup(this.groups[idx]);
  }

  /**
   * Selects a group of the specified {@link role} (cf. {@link selectGroup}).
   *
   * @param {string} role
   * @returns {boolean} Whether or not a relevant group has been found.
   */
  selectGroupByRole(role) {
    return this.trySelectGroup(this.groups.find(g => g.roles.has(role)));
  }

  /**
   * Selects a group that has a stream marked as primary via role "main" or
   * HLS DEFAULT attribute (cf. {@link selectGroup}).
   *
   * @returns {boolean} Whether or not a relevant group has been found.
   */
  selectGroupWithPrimary() {
    return this.trySelectGroup(this.groups.find(g => g.hasPrimary));
  }

  /**
   * Iterates through the groups.
   *
   * @returns {IterableIterator<Group>}
   */
  *[Symbol.iterator]() {
    for (const key in this.keyToGroup) {
      yield /** @type {Group} */(this.keyToGroup[key]);
    }
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/ControlPanelButton.js":
/*!*************************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/controls/ControlPanelButton.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ControlPanelButton)
/* harmony export */ });
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shaka-player/dist/shaka-player.ui */ "./node_modules/shaka-player/dist/shaka-player.ui.js");
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
// @ts-check





/**
 * @typedef Config
 * @property {string} className
 * @property {string} material_icon Key of button icon
 * @property {string} title Text of button tooltip
 * @property {() => void} onClick
 */

/**
 * Generic control panel button with icon, text and click handler.
 */
class ControlPanelButton extends (shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.Element) {
  /**
   * Registers a factory with specified configuration. The returned key may
   * be added to `controlPanelElements` in shaka-player config.
   *
   * @param {Identifier} env
   * @param {Partial<Config>} config
   * @returns {string} Key of the registered element factory
   */
  static register(env, config = {}) {
    const key = env.mkid();

    shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.Controls.registerElement(key, {
      create(rootElement, controls) {
        return new ControlPanelButton(rootElement, controls, config);
      },
    });

    return key;
  }

  /**
   * @param {HTMLElement} parent
   * @param {shaka.ui.Controls} controls
   * @param {Partial<Config>} config
   */
  constructor(parent, controls, config = {}) {
    super(parent, controls);

    const button = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("button", {
      className: `material-icons-round ${config.className ?? ""}`,
    }, [config.material_icon]);

    parent.appendChild(button);

    /** @protected Avoid naming conflicts with parent class */
    this.dlf = { config, button };

    if (this.eventManager && config.onClick) {
      this.eventManager.listen(button, 'click', config.onClick);
    }

    this.updateStrings();
  }

  updateStrings() {
    let tooltip = this.dlf.config.title ?? "";
    this.dlf.button.ariaLabel = tooltip;
    (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.setElementClass)(this.dlf.button, 'shaka-tooltip', tooltip !== "");
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/FlatSeekBar.js":
/*!******************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/controls/FlatSeekBar.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlatSeekBar)
/* harmony export */ });
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shaka-player/dist/shaka-player.ui */ "./node_modules/shaka-player/dist/shaka-player.ui.js");
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _Chapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Chapters */ "../Resources/Private/JavaScript/DlfMediaPlayer/Chapters.js");
/* harmony import */ var _ImageFetcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ImageFetcher */ "../Resources/Private/JavaScript/DlfMediaPlayer/ImageFetcher.js");
/* harmony import */ var _ThumbnailPreview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ThumbnailPreview */ "../Resources/Private/JavaScript/DlfMediaPlayer/ThumbnailPreview.js");
/* harmony import */ var _VariantGroups__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VariantGroups */ "../Resources/Private/JavaScript/DlfMediaPlayer/VariantGroups.js");
// @ts-check









/**
 * Seek bar that is not based on an input range element. This provides more
 * flexibility, and we don't have to deal with interactions between the input
 * thumb and chapter markers.
 *
 * Very much oriented at Shaka's SeekBar and RangeElement. The update method is
 * mostly taken from Shaka.
 *
 * Listens to the following custom events:
 * - {@link dlf.media.VariantGroupsEvent}
 * - {@link dlf.media.ChaptersEvent}
 * - {@link dlf.media.FpsEvent}
 *
 * Emits the following custom events:
 * - {@link dlf.media.SeekBarEvent}
 *
 * @implements {shaka.extern.IUISeekBar}
 */
// @ts-expect-error: IUISeekBar extends IUIRangeElement, which we don't
//                   implement (TODO: check back on Shaka?)
class FlatSeekBar extends (shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.Element) {
  static register() {
    shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.Controls.registerSeekBar({
      // @ts-expect-error: see above (IUISeekBar / IUIRangeElement)
      create(rootElement, controls) {
        return new FlatSeekBar(rootElement, controls);
      },
    });
  }

  /**
   * @param {HTMLElement} parent
   * @param {shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    this.$container = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("div", { className: "dlf-media-flat-seek-bar" }, [
      this.$range = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("div", { className: "range" }),
    ]);

    parent.prepend(this.$container);

    /** @private Avoid naming conflicts with parent class */
    this.dlf = {
      /** @type {Chapters | null} */
      chapters: null,
      /** @type {boolean} */
      hasRenderedChapters: false,
      /** @type {VariantGroups | null} */
      variantGroups: null,
      /** @type {number} */
      value: 0,
      /** @type {shaka.extern.UIConfiguration} */
      uiConfig: controls.getConfig(),
      /** @type {boolean} */
      wasPlaying: false,
      /** @type {shaka.util.Timer | null} */
      seekTimer: null,
      /** @type {ThumbnailPreview | null} */
      thumbnailPreview: null,
      /** @type {string} */
      lastGradientStr: "",
    };

    this.dlf.seekTimer = new (shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().util.Timer)(() => {
      if (this.video !== null) {
        this.video.currentTime = this.getValue();

        this.controls?.dispatchEvent(/** @type {dlf.media.ManualSeekEvent} */(
          new CustomEvent('dlf-media-manual-seek', {})
        ));
      }
    });

    if (this.player !== null) {
      this.dlf.thumbnailPreview = new _ThumbnailPreview__WEBPACK_IMPORTED_MODULE_4__["default"]({
        seekBar: this.$container,
        player: this.player,
        network: new _ImageFetcher__WEBPACK_IMPORTED_MODULE_3__["default"](),
        interaction: {
          onChangeStart: () => {
            this.controls?.setSeeking(true);

            if (this.video !== null) {
              this.dlf.wasPlaying = !this.video.paused;
              this.video.pause();
            }
          },
          onChange: (pos) => {
            this.dlf.value = pos.seconds;
            this.update();
            this.dlf.seekTimer?.tickAfter(0.125);
          },
          onChangeEnd: () => {
            this.dlf.seekTimer?.tickNow();
            this.controls?.setSeeking(false);
            if (this.dlf.wasPlaying) {
              this.video?.play();
            }
          },
        },
      });
    }

    if (this.eventManager) {
      this.eventManager.listen(this.player, 'loaded', () => {
        this.update();
      });

      this.eventManager.listen(this.player, 'variantchanged', () => {
        this.updatePreviewImageTracks();
      });

      this.eventManager.listen(this.controls, 'dlf-media-variant-groups', (e) => {
        const detail = /** @type {dlf.media.VariantGroupsEvent} */(e).detail;
        this.dlf.variantGroups = detail.variantGroups;
        this.updatePreviewImageTracks();
      });

      this.eventManager.listen(this.controls, 'dlf-media-chapters', (e) => {
        const detail = /** @type {dlf.media.ChaptersEvent} */(e).detail;
        this.dlf.chapters = detail.chapters;
        this.dlf.hasRenderedChapters = false;
        this.dlf.thumbnailPreview?.setChapters(detail.chapters);
        this.update();
      });

      this.eventManager.listen(this.controls, 'dlf-media-fps', (e) => {
        const detail = /** @type {dlf.media.FpsEvent} */(e).detail;
        this.dlf.thumbnailPreview?.setFps(detail.fps);
      });

      this.controls?.dispatchEvent(/** @type {dlf.media.SeekBarEvent} */(
        new CustomEvent('dlf-media-seek-bar', {
          detail: { seekBar: this },
        })
      ));
    }
  }

  /**
   * @override
   */
  release() {
    if (this.dlf.seekTimer !== null) {
      this.dlf.seekTimer.stop();
      this.dlf.seekTimer = null;
    }

    if (this.dlf.thumbnailPreview !== null) {
      this.dlf.thumbnailPreview.release();
      this.dlf.thumbnailPreview = null;
    }

    super.release();
  }

  get thumbnailPreview() {
    return this.dlf.thumbnailPreview;
  }

  /**
   *
   * @returns {boolean}
   */
  isThumbnailPreviewOpen() {
    return this.dlf.thumbnailPreview?.isVisible ?? false;
  }

  /**
   * Stop any active seeking/scrubbing and close thumbnail preview.
   */
  endSeek() {
    this.dlf.thumbnailPreview?.endChange();
    this.dlf.thumbnailPreview?.setIsVisible(false);
  }

  /**
   *
   * @param {boolean} value
   */
  setThumbnailSnap(value) {
    this.dlf.thumbnailPreview?.setThumbnailSnap(value);
  }

  /**
   * Adds chapter marker elements to the seekbar.
   *
   * @private
   * @param {Chapters} chapters
   * @param {number} duration Duration of the video to be assumed.
   */
  renderChapterMarkers(chapters, duration) {
    // Clear chapter markers, which would allow a full refresh
    this.$range.querySelectorAll('.dlf-media-chapter-marker').forEach((marker) => {
      marker.remove();
    });

    for (const chapter of chapters) {
      const relative = chapter.timecode / duration;

      // In particular, make sure that we don't put markers outside of the
      // seekbar for wrong timestamps.
      if (!(0 <= relative && relative < 1)) {
        continue;
      }

      const marker = document.createElement('span');
      marker.className = 'dlf-media-chapter-marker';
      marker.style.position = 'absolute';
      marker.style.left = `${relative * 100}%`;

      this.$range.append(marker);
    }
  }

  /**
   * @private
   * Determines which image tracks apply to the current variant group and
   * passes those to the thumbnail preview.
   */
  updatePreviewImageTracks() {
    if (this.dlf.thumbnailPreview === null) {
      console.warn("FlatSeekBar: Missing thumbnail preview");
      return;
    }

    if (this.dlf.variantGroups === null) {
      return;
    }

    const thumbTracks = this.dlf.variantGroups.findThumbnailTracks();
    this.dlf.thumbnailPreview.setThumbnailTracks(thumbTracks);
  }

  /**
   * @returns {number}
   */
  getValue() {
    return this.dlf.value;
  }

  /**
   * @returns {boolean}
   */
  isShowing() {
    return true;
  }

  /**
   * @param {number} value
   */
  setValue(value) {
    if (this.controls?.isSeeking()) {
      return;
    }

    this.dlf.value = value;
  }

  /**
   *
   * @param {string} color
   * @param {number} fract
   * @returns {string}
   */
  makeColor(color, fract) {
    return `${color} ${fract * 100}%`;
  }

  /**
   * Called by Controls on a timer to update the state of the seek bar.
   * Also called internally when the user interacts with the input element.
   */
  update() {
    if (this.video === null) {
      console.warn("FlatSeekBar: Missing video");
      return;
    }

    const duration = this.video.duration;
    if (!(duration > 0)) {
      return;
    }

    if (this.dlf.chapters !== null && !this.dlf.hasRenderedChapters) {
      this.renderChapterMarkers(this.dlf.chapters, duration);
      this.dlf.hasRenderedChapters = true;
    }

    const colors = this.dlf.uiConfig.seekBarColors;
    const currentTime = this.getValue();
    const bufferedLength = this.video.buffered.length;
    const bufferedStart = bufferedLength ? this.video.buffered.start(0) : 0;
    const bufferedEnd =
      bufferedLength ? this.video.buffered.end(bufferedLength - 1) : 0;

    // TODO: Use duration or seekRange?
    // const seekRange = this.player.seekRange();
    const seekRange = {
      start: 0,
      end: duration,
    };
    const seekRangeSize = seekRange.end - seekRange.start;

    const clampedBufferStart = Math.max(bufferedStart, seekRange.start);
    const clampedBufferEnd = Math.min(bufferedEnd, seekRange.end);
    const clampedCurrentTime = Math.min(
      Math.max(currentTime, seekRange.start),
      seekRange.end);

    const bufferStartDistance = clampedBufferStart - seekRange.start;
    const bufferEndDistance = clampedBufferEnd - seekRange.start;
    const playheadDistance = clampedCurrentTime - seekRange.start;

    // NOTE: the fallback to zero eliminates NaN.
    const bufferStartFraction = (bufferStartDistance / seekRangeSize) || 0;
    const bufferEndFraction = (bufferEndDistance / seekRangeSize) || 0;
    const playheadFraction = (playheadDistance / seekRangeSize) || 0;

    const unbufferedColor =
      this.dlf.uiConfig.showUnbufferedStart ? colors.base : colors.played;

    const gradient = [
      'to right',
      this.makeColor(unbufferedColor, bufferStartFraction),
      this.makeColor(colors.played, bufferStartFraction),
      this.makeColor(colors.played, playheadFraction),
      this.makeColor(colors.buffered, playheadFraction),
      this.makeColor(colors.buffered, bufferEndFraction),
      this.makeColor(colors.base, bufferEndFraction),
    ];
    const gradientStr = 'linear-gradient(' + gradient.join(',') + ')';
    if (gradientStr !== this.dlf.lastGradientStr) {
      this.dlf.lastGradientStr = gradientStr;
      this.$range.style.background = gradientStr;
    }
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/OverflowMenuButton.js":
/*!*************************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/controls/OverflowMenuButton.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OverflowMenuButton)
/* harmony export */ });
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shaka-player/dist/shaka-player.ui */ "./node_modules/shaka-player/dist/shaka-player.ui.js");
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__);
// @ts-check



/**
 * @typedef Config
 * @property {string} material_icon Key of menu icon
 * @property {string} name Text to display in menu
 * @property {() => void} onClick
 */

/**
 * Generic overflow menu item with icon, text and click handler.
 */
class OverflowMenuButton extends (shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.SettingsMenu) {
  /**
   * Registers a factory with specified configuration. The returned key may
   * be added to `overflowMenuButtons` in shaka-player config.
   *
   * @param {Identifier} env
   * @param {Partial<Config>} config
   */
  static register(env, config = {}) {
    const key = env.mkid();

    shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.OverflowMenu.registerElement(key, {
      create(rootElement, controls) {
        return new OverflowMenuButton(rootElement, controls, config);
      },
    });

    return key;
  }

  /**
   * @param {HTMLElement} parent
   * @param {shaka.ui.Controls} controls
   * @param {Partial<Config>} config
   */
  constructor(parent, controls, config = {}) {
    super(parent, controls, config.material_icon ?? "");

    /** @protected Avoid naming conflicts with parent class */
    this.dlf = { config };

    if (this.eventManager) {
      // In particular, unbind button click handler pre-attached in base class
      this.eventManager.removeAll();
      this.eventManager.listen(this.button, 'click', this.onButtonClick.bind(this));
    }

    this.updateStrings();
  }

  updateStrings() {
    this.nameSpan.textContent = this.dlf.config.name ?? "";
  }

  onButtonClick() {
    this.controls?.hideSettingsMenus();
    this.dlf.config.onClick?.();
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/PresentationTimeTracker.js":
/*!******************************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/controls/PresentationTimeTracker.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PresentationTimeTracker)
/* harmony export */ });
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shaka-player/dist/shaka-player.ui */ "./node_modules/shaka-player/dist/shaka-player.ui.js");
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vendor_VideoFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vendor/VideoFrame */ "../Resources/Private/JavaScript/DlfMediaPlayer/vendor/VideoFrame.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _lib_buildTimeString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/buildTimeString */ "../Resources/Private/JavaScript/DlfMediaPlayer/lib/buildTimeString.js");
/* harmony import */ var _Chapters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Chapters */ "../Resources/Private/JavaScript/DlfMediaPlayer/Chapters.js");
// @ts-check








/**
 * @typedef {'current-time' | 'remaining-time' | 'current-frame'} TimeModeKey
 */

/**
 * @readonly
 * @enum {number}
 */
const TimeMode = {
  CurrentTime: 0,
  RemainingTime: 1,
  CurrentFrame: 2,
  COUNT: 3,
};

/**
 * @typedef {{
 *  isReady: boolean;
 *  activeMode: number;
 *  duration: number;
 *  totalSeconds: number;
 *  vifa: VideoFrame | null;
 *  fps: number | null;
 *  chapters: Chapters | null;
 * }} State
 */

/**
 * Control panel element to show current playback time.
 *
 * Originally based upon Shaka's PresentationTimeTracker.
 *
 * Listens to the following custom events:
 * - {@link dlf.media.ChaptersEvent}
 * - {@link dlf.media.FpsEvent}
 */
class PresentationTimeTracker extends (shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.Element) {
  /**
   * Registers a factory with specified configuration. The returned key may
   * be added to `controlPanelElements` in shaka-player config.
   *
   * @param {Translator & Identifier} env
   */
  static register(env) {
    const key = env.mkid();

    shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.Controls.registerElement(key, {
      create(rootElement, controls) {
        return new PresentationTimeTracker(rootElement, controls, env);
      },
    });

    return key;
  }

  /**
   * @param {HTMLElement} parent
   * @param {shaka.ui.Controls} controls
   * @param {Translator} env
   */
  constructor(parent, controls, env) {
    super(parent, controls);

    const currentTime = (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)('button', {
      className: 'shaka-current-time shaka-tooltip',
      ariaLabel: env.t('control.time.tooltip'),
    });
    parent.appendChild(currentTime);

    /** @private Avoid naming conflicts with parent class */
    this.dlf = { env, currentTime };

    /**
     * @private
     * @type {State}
     */
    this.state = {
      isReady: false,
      activeMode: TimeMode.CurrentTime,
      totalSeconds: 0,
      duration: 0,
      vifa: null,
      fps: null,
      chapters: null,
    };

    if (this.eventManager) {
      this.eventManager.listen(currentTime, 'click', () => {
        this.render({
          activeMode: (this.state.activeMode + 1) % TimeMode.COUNT,
        });
      });

      const updateTime = this.updateTime.bind(this);
      this.eventManager.listen(this.controls, 'timeandseekrangeupdated', updateTime);

      this.eventManager.listen(this.controls, 'dlf-media-chapters', (e) => {
        const detail = /** @type {dlf.media.ChaptersEvent} */(e).detail;
        this.render({
          chapters: detail.chapters,
        });
      });

      this.eventManager.listen(this.controls, 'dlf-media-fps', (e) => {
        const detail = /** @type {dlf.media.FpsEvent} */(e).detail;
        this.render({
          vifa: detail.vifa,
          fps: detail.fps,
        });
      });
    }
  }

  updateTime() {
    if (this.controls === null || this.video === null || this.video.readyState < 1) {
      this.render({
        isReady: false,
      });
    } else {
      let duration = this.video.duration;
      if (!(duration >= 0)) { // NaN -> 0
        duration = 0;
      }

      this.render({
        isReady: true,
        duration,
        totalSeconds: (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.clamp)(this.controls.getDisplayTime(), [0, duration]),
      });
    }
  }

  /**
   *
   * @param {Partial<State>} state
   */
  render(state) {
    const newState = Object.assign({}, this.state, state);

    const newKeys = /** @type {(keyof State)[]} */(Object.keys(state));
    const shouldUpdate = newKeys.some(key => state[key] !== this.state[key]);

    if (shouldUpdate) {
      const tKey = /** @type {TimeModeKey} */({
        [TimeMode.CurrentTime]: 'current-time',
        [TimeMode.RemainingTime]: 'remaining-time',
        [TimeMode.CurrentFrame]: 'current-frame',
      }[newState.activeMode] ?? 'current-time');

      this.dlf.currentTime.textContent = this.getTimecodeText(tKey, newState);
    }

    this.state = newState;
  }

  /**
   *
   * @param {TimeModeKey} tKey
   * @param {Pick<State, 'isReady' | 'totalSeconds' | 'duration' | 'vifa' | 'fps'
   * | 'chapters'>} state
   * @returns {string}
   */
  getTimecodeText(tKey, { isReady, totalSeconds, duration, vifa, fps, chapters }) {
    // Don't show incomplete info when duration is not yet available
    if (!isReady || duration === 0) {
      return this.dlf.env.t('player.loading');
    } else {
      const showHour = duration >= 3600;

      const textValues = {
        get chapterTitle() {
          return chapters?.timeToChapter(totalSeconds)?.title ?? "_";
        },
        get currentTime() {
          return (0,_lib_buildTimeString__WEBPACK_IMPORTED_MODULE_3__["default"])(totalSeconds, showHour, fps);
        },
        get totalTime() {
          return (0,_lib_buildTimeString__WEBPACK_IMPORTED_MODULE_3__["default"])(duration, showHour, fps);
        },
        get remainingTime() {
          return (0,_lib_buildTimeString__WEBPACK_IMPORTED_MODULE_3__["default"])(duration - totalSeconds, showHour, fps);
        },
        get currentFrame() {
          return vifa?.get() ?? -1;
        },
      };

      return this.dlf.env.t(`control.time.${tKey}.text`, textValues);
    }
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/VideoTrackSelection.js":
/*!**************************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/controls/VideoTrackSelection.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoTrackSelection)
/* harmony export */ });
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shaka-player/dist/shaka-player.ui */ "./node_modules/shaka-player/dist/shaka-player.ui.js");
/* harmony import */ var shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _VariantGroups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VariantGroups */ "../Resources/Private/JavaScript/DlfMediaPlayer/VariantGroups.js");
// @ts-check






/**
 * Control panel element to show current playback time.
 *
 * Listens to the following custom events:
 * - {@link dlf.media.VariantGroupsEvent}
 */
class VideoTrackSelection extends (shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.SettingsMenu) {
  /**
   *
   * @param {Translator & Identifier} env
   */
  static register(env) {
    const key = env.mkid();

    shaka_player_dist_shaka_player_ui__WEBPACK_IMPORTED_MODULE_0___default().ui.OverflowMenu.registerElement(key, {
      create(rootElement, controls) {
        return new VideoTrackSelection(rootElement, controls, env);
      },
    });

    return key;
  }

  /**
   * @param {HTMLElement} parent
   * @param {shaka.ui.Controls} controls
   * @param {Translator} env
   */
  constructor(parent, controls, env) {
    super(parent, controls, 'switch_video');

    /** @private Avoid naming conflicts with parent class */
    this.dlf = {
      env,
      activeCheck: (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("i", {
        className: "material-icons-round shaka-chosen-item",
      }, ["done"]),
      /** @type {VariantGroups | null} */
      variantGroups: null,
    };

    this.updateStrings();
    this.updateVisibility();

    /** @type {Record<string, HTMLElement>} */
    this.menuButtons = {};

    if (this.eventManager) {
      this.eventManager.listen(this.controls, 'dlf-media-variant-groups', (ev) => {
        const detail = /** @type {dlf.media.VariantGroupsEvent} */(ev).detail;
        const variantGroups =
          this.dlf.variantGroups = detail.variantGroups;

        this.clearMenu();
        this.updateVisibility();

        try {
          for (const group of variantGroups) {
            const button = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("button", {
              $click: () => {
                this.dlf.variantGroups?.selectGroupByKey(group.key);
              },
            }, [
              (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("span", {}, [group.key]),
            ]);

            this.menu.appendChild(button);

            this.menuButtons[group.key] = button;
          }

          this.markActiveGroup();
        } catch (err) {
          // TODO: Shaka seems to handle exceptions occurring in listeners
          console.error(err);
        }
      });

      this.eventManager.listen(this.player, 'variantchanged', () => {
        this.markActiveGroup();
      });
    }
  }

  /**
   * @private
   */
  clearMenu() {
    for (const button of Object.values(this.menuButtons)) {
      button.remove();
    }
    this.menuButtons = {};
  }

  /**
   * Updates UI to show which group is active
   */
  markActiveGroup() {
    const activeGroup = this.dlf.variantGroups?.findActiveGroup();
    if (activeGroup) {
      this.menuButtons[activeGroup.key]?.appendChild(this.dlf.activeCheck);
      this.currentSelection.textContent = activeGroup.key;
    }
  }

  /**
   * Checks if the menu item should be shown and updates the UI accordingly.
   *
   * @private
   */
  updateVisibility() {
    if ((this.dlf.variantGroups?.numGroups ?? 0) > 0) {
      this.button.classList.remove('shaka-hidden');
    } else {
      this.button.classList.add('shaka-hidden');
    }
  }

  /**
   * @private
   */
  updateStrings() {
    const back = this.dlf.env.t('control.back');
    const label = this.dlf.env.t('control.video-track.title');

    this.backButton.ariaLabel = back;
    this.button.ariaLabel = label;
    this.nameSpan.textContent = label;
    this.backSpan.textContent = label;
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/index.js":
/*!************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/controls/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlPanelButton": () => (/* reexport safe */ _ControlPanelButton__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "FlatSeekBar": () => (/* reexport safe */ _FlatSeekBar__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "OverflowMenuButton": () => (/* reexport safe */ _OverflowMenuButton__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "PresentationTimeTracker": () => (/* reexport safe */ _PresentationTimeTracker__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "VideoTrackSelection": () => (/* reexport safe */ _VideoTrackSelection__WEBPACK_IMPORTED_MODULE_4__["default"])
/* harmony export */ });
/* harmony import */ var _ControlPanelButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ControlPanelButton */ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/ControlPanelButton.js");
/* harmony import */ var _FlatSeekBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FlatSeekBar */ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/FlatSeekBar.js");
/* harmony import */ var _OverflowMenuButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OverflowMenuButton */ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/OverflowMenuButton.js");
/* harmony import */ var _PresentationTimeTracker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PresentationTimeTracker */ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/PresentationTimeTracker.js");
/* harmony import */ var _VideoTrackSelection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VideoTrackSelection */ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/VideoTrackSelection.js");
// @ts-check








/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/index.js":
/*!***************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chapters": () => (/* reexport safe */ _Chapters__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "ControlPanelButton": () => (/* reexport safe */ _controls__WEBPACK_IMPORTED_MODULE_1__.ControlPanelButton),
/* harmony export */   "OverflowMenuButton": () => (/* reexport safe */ _controls__WEBPACK_IMPORTED_MODULE_1__.OverflowMenuButton),
/* harmony export */   "buildTimeString": () => (/* reexport safe */ _lib_buildTimeString__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "timeStringFromTemplate": () => (/* reexport safe */ _lib_buildTimeString__WEBPACK_IMPORTED_MODULE_2__.timeStringFromTemplate),
/* harmony export */   "DlfMediaPlayer": () => (/* reexport safe */ _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _Chapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chapters */ "../Resources/Private/JavaScript/DlfMediaPlayer/Chapters.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls */ "../Resources/Private/JavaScript/DlfMediaPlayer/controls/index.js");
/* harmony import */ var _lib_buildTimeString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/buildTimeString */ "../Resources/Private/JavaScript/DlfMediaPlayer/lib/buildTimeString.js");
/* harmony import */ var _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DlfMediaPlayer */ "../Resources/Private/JavaScript/DlfMediaPlayer/DlfMediaPlayer.js");
// @ts-check







/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/lib/buildTimeString.js":
/*!*****************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/lib/buildTimeString.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildTimeString),
/* harmony export */   "timeStringFromTemplate": () => (/* binding */ timeStringFromTemplate),
/* harmony export */   "getTimeStringParts": () => (/* binding */ getTimeStringParts)
/* harmony export */ });
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
// @ts-check



/**
 * Formats {@link totalSeconds} to a time string.
 *
 * The base format is `hh:mm:ss:ff`. Hours and frames are included depending on
 * {@link showHour} and {@link fps}. The first part is not zero-padded.
 *
 * Adopted from shaka.ui.Utils.buildTimeString.
 *
 * @param {number} totalSeconds Total number of seconds to be formatted.
 * @param {boolean} showHour Whether or not to show hours.
 * @param {number | null} fps (Optional) Number of FPS used to calculate frame
 * count.
 * @returns {string}
 */
function buildTimeString(totalSeconds, showHour, fps = null) {
  let template = showHour ? "{h}:{mm}:{ss}" : "{m}:{ss}";
  if (fps) {
    template += ":{ff}";

    if (!showHour) {
      template += "f";
    }
  }

  return timeStringFromTemplate(template, totalSeconds, fps);
}

/**
 *
 * @param {string} template Template string used for building the output.
 * @param {number} totalSeconds Total number of seconds to be formatted.
 * @param {number | null} fps (Optional) Number of FPS used to calculate frame count.
 * @returns {string}
 */
function timeStringFromTemplate(template, totalSeconds, fps = null) {
  const parts = getTimeStringParts(totalSeconds, fps ?? 0);

  return (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.fillPlaceholders)(template, {
    h: `${parts.hours}`,
    hh: (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.zeroPad)(parts.hours, 2),
    m: `${parts.totalMinutes}`,
    mm: (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.zeroPad)(parts.minutes, 2),
    ss: (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.zeroPad)(parts.seconds, 2),
    ff: (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.zeroPad)(parts.frames, 2),
  });
}

/**
 *
 * @param {number} totalSeconds
 * @param {number} fps
 * @returns {Record<'hours' | 'minutes' | 'totalMinutes' | 'seconds' | 'frames', number>}
 */
function getTimeStringParts(totalSeconds, fps = 0) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const totalMinutes = hours * 60 + minutes;
  const seconds = Math.floor(totalSeconds % 60);
  const frames = Math.floor((totalSeconds % 1) * fps);

  return { hours, minutes, totalMinutes, seconds, frames };
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/lib/thumbnails/ShakaThumbnailTrack.js":
/*!********************************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/lib/thumbnails/ShakaThumbnailTrack.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShakaThumbnailTrack)
/* harmony export */ });
// @ts-check

/**
 * @implements {dlf.media.ThumbnailTrack}
 */
class ShakaThumbnailTrack {
  /**
   *
   * @param {shaka.Player} player
   * @param {shaka.extern.Track} track Image track for thumbnails
   */
  constructor(player, track) {
    /** @private */
    this.player = player;

    /** @private */
    this.track = track;
  }

  get bandwidth() {
    return this.track.bandwidth;
  }

  /**
   *
   * @param {number} position
   * @returns {Promise<dlf.media.ThumbnailOnTrack | null>}
   */
  async getThumb(position) {
    const thumb = await this.player.getThumbnails(this.track.id, position);
    if (thumb === null) {
      return null;
    }

    return {
      track: this,
      ...thumb,
      // TODO: Make this more flexible than just accomodating ffmpeg's fps filter
      imageTime: thumb.startTime + thumb.duration / 2 - 0.00001,
      bandwidth: this.track.bandwidth,
    };
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/lib/thumbnails/sanitizeThumbnail.js":
/*!******************************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/lib/thumbnails/sanitizeThumbnail.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sanitizeThumbnail)
/* harmony export */ });
// @ts-check

/**
 * Make sure that {@link thumbnail} does not exceed given {@link maxDuration}.
 *
 * @template {dlf.media.Thumbnail} T
 * @param {T} thumbnail
 * @param {number} maxDuration
 * @returns {T | null}
 */
function sanitizeThumbnail(thumbnail, maxDuration) {
  const hasValidDuration = (
    thumbnail.startTime < maxDuration
    && thumbnail.imageTime < maxDuration
  )
  if (!hasValidDuration) {
    return null;
  }

  return {
    ...thumbnail,
    duration: Math.min(thumbnail.duration, maxDuration - thumbnail.startTime),
  };
}


/***/ }),

/***/ "../Resources/Private/JavaScript/DlfMediaPlayer/vendor/VideoFrame.js":
/*!***************************************************************************!*\
  !*** ../Resources/Private/JavaScript/DlfMediaPlayer/vendor/VideoFrame.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/** @preserve
This is based upon VideoFrame (see below). Changes:
- export default
- Slightly refine JSDoc/typings

Source: https://raw.githubusercontent.com/allensarkisyan/VideoFrame/master/VideoFrame.js

---

VideoFrame: HTML5 Video - SMTPE Time Code capturing and Frame Seeking API
@version 0.2.2
@author Allen Sarkisyan
@copyright (c) 2013 Allen Sarkisyan
@license Released under the Open Source MIT License

Contributors:
Allen Sarkisyan - Lead engineer
Paige Raynes - Product Development
Dan Jacinto - Video Asset Quality Analyst

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and/or distribute copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

- The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
- Attribution must be credited to the original authors in derivative works.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @class
 * @classdesc Main VideoFrame Implementation.
 * @param {Object} [options] - Configuration object for initialization.
 * @param {string} [options.id] (Optional) ID of video element to use. By
 * default, the first video on the page is used.
 * @param {number} [options.frameRate] (Optional) Frame rate of the video. By
 * default, 24 fps is assumed.
 */
var VideoFrame = function(options) {
	if (this === window) { return new VideoFrame(options); }
	this.obj = options || {};
	this.frameRate = this.obj.frameRate || 24;
	this.video = document.getElementById(this.obj.id) || document.getElementsByTagName('video')[0];
};

/**
 * FrameRates - Industry standard frame rates
 *
 * @namespace
 * @type {Object}
 * @property {Number} film - 24
 * @property {Number} NTSC - 29.97
 * @property {Number} NTSC_Film - 23.98
 * @property {Number} NTSC_HD - 59.94
 * @property {Number} PAL - 25
 * @property {Number} PAL_HD - 50
 * @property {Number} web - 30
 * @property {Number} high - 60
 */
var FrameRates = {
	film: 24,
	NTSC : 29.97,
	NTSC_Film: 23.98,
	NTSC_HD : 59.94,
	PAL: 25,
	PAL_HD: 50,
	web: 30,
	high: 60
};

VideoFrame.prototype = {
	/**
	 * Returns the current frame number
	 *
	 * @return {Number} - Frame number in video
	 */
	get : function() {
		return Math.floor(this.video.currentTime.toFixed(5) * this.frameRate);
	},
	/**
	 * Event listener for handling callback execution at double the current frame rate interval
	 *
	 * @param  {String} format - Accepted formats are: SMPTE, time, frame
	 * @param  {Number} tick - Number to set the interval by.
	 * @return {Number} Returns a value at a set interval
	 */
	listen : function(format, tick) {
		var _video = this;
		if (!format) { console.log('VideoFrame: Error - The listen method requires the format parameter.'); return; }
		this.interval = setInterval(function() {
			if (_video.video.paused || _video.video.ended) { return; }
			var frame = ((format === 'SMPTE') ? _video.toSMPTE() : ((format === 'time') ? _video.toTime() : _video.get()));
			if (_video.obj.callback) { _video.obj.callback(frame, format); }
			return frame;
		}, (tick ? tick : 1000 / _video.frameRate / 2));
	},
	/** Clears the current interval */
	stopListen : function() {
		var _video = this;
		clearInterval(_video.interval);
	},
	fps : FrameRates
};

/**
 * Returns the current time code in the video in HH:MM:SS format
 * - used internally for conversion to SMPTE format.
 *
 * @param  {Number} frames - The current time in the video
 * @return {String} Returns the time code in the video
 */
VideoFrame.prototype.toTime = function(frames) {
	var time = (typeof frames !== 'number' ? this.video.currentTime : frames), frameRate = this.frameRate;
	var dt = (new Date()), format = 'hh:mm:ss' + (typeof frames === 'number' ? ':ff' : '');
	dt.setHours(0); dt.setMinutes(0); dt.setSeconds(0); dt.setMilliseconds(time * 1000);
	function wrap(n) { return ((n < 10) ? '0' + n : n); }
	return format.replace(/hh|mm|ss|ff/g, function(format) {
		switch (format) {
			case "hh": return wrap(dt.getHours() < 13 ? dt.getHours() : (dt.getHours() - 12));
			case "mm": return wrap(dt.getMinutes());
			case "ss": return wrap(dt.getSeconds());
			case "ff": return wrap(Math.floor(((time % 1) * frameRate)));
		}
	});
};

/**
 * Returns the current SMPTE Time code in the video.
 * - Can be used as a conversion utility.
 *
 * @param  {Number} frame - OPTIONAL: Frame number for conversion to it's equivalent SMPTE Time code.
 * @return {String} Returns a SMPTE Time code in HH:MM:SS:FF format
 */
VideoFrame.prototype.toSMPTE = function(frame) {
	if (!frame) { return this.toTime(this.video.currentTime); }
	var frameNumber = Number(frame);
	var fps = this.frameRate;
	function wrap(n) { return ((n < 10) ? '0' + n : n); }
	var _hour = ((fps * 60) * 60), _minute = (fps * 60);
	var _hours = (frameNumber / _hour).toFixed(0);
	var _minutes = (Number((frameNumber / _minute).toString().split('.')[0]) % 60);
	var _seconds = (Number((frameNumber / fps).toString().split('.')[0]) % 60);
	var SMPTE = (wrap(_hours) + ':' + wrap(_minutes) + ':' + wrap(_seconds) + ':' + wrap(frameNumber % fps));
	return SMPTE;
};

/**
 * Converts a SMPTE Time code to Seconds
 *
 * @param  {String} SMPTE - a SMPTE time code in HH:MM:SS:FF format
 * @return {Number} Returns the Second count of a SMPTE Time code
 */
VideoFrame.prototype.toSeconds = function(SMPTE) {
	if (!SMPTE) { return Math.floor(this.video.currentTime); }
	var time = SMPTE.split(':');
	return (((Number(time[0]) * 60) * 60) + (Number(time[1]) * 60) + Number(time[2]));
};

/**
 * Converts a SMPTE Time code, or standard time code to Milliseconds
 *
 * @param  {String} SMPTE OPTIONAL: a SMPTE time code in HH:MM:SS:FF format,
 * or standard time code in HH:MM:SS format.
 * @return {Number} Returns the Millisecond count of a SMPTE Time code
 */
VideoFrame.prototype.toMilliseconds = function(SMPTE) {
	var frames = (!SMPTE) ? Number(this.toSMPTE().split(':')[3]) : Number(SMPTE.split(':')[3]);
	var milliseconds = (1000 / this.frameRate) * (isNaN(frames) ? 0 : frames);
	return Math.floor(((this.toSeconds(SMPTE) * 1000) + milliseconds));
};

/**
 * Converts a SMPTE Time code to it's equivalent frame number
 *
 * @param  {String} SMPTE - OPTIONAL: a SMPTE time code in HH:MM:SS:FF format
 * @return {Number} Returns the long running video frame number
 */
VideoFrame.prototype.toFrames = function(SMPTE) {
	var time = (!SMPTE) ? this.toSMPTE().split(':') : SMPTE.split(':');
	var frameRate = this.frameRate;
	var hh = (((Number(time[0]) * 60) * 60) * frameRate);
	var mm = ((Number(time[1]) * 60) * frameRate);
	var ss = (Number(time[2]) * frameRate);
	var ff = Number(time[3]);
	return Math.floor((hh + mm + ss + ff));
};

/**
 * Private - seek method used internally for the seeking functionality.
 *
 * @param  {String} direction - Accepted Values are: forward, backward
 * @param  {Number} frames - Number of frames to seek by.
 */
VideoFrame.prototype.__seek = function(direction, frames) {
	if (!this.video.paused) { this.video.pause(); }
	var frame = Number(this.get());
	/** To seek forward in the video, we must add 0.00001 to the video runtime for proper interactivity */
	this.video.currentTime = ((((direction === 'backward' ? (frame - frames) : (frame + frames))) / this.frameRate) + 0.00001);
};

/**
 * Seeks forward [X] amount of frames in the video.
 *
 * @param  {Number} [frames] - Number of frames to seek by.
 * @param  {Function} [callback] - Callback function to execute once seeking is complete.
 */
VideoFrame.prototype.seekForward = function(frames, callback) {
	if (!frames) { frames = 1; }
	this.__seek('forward', Number(frames));
	return (callback ? callback() : true);
};

/**
 * Seeks backward [X] amount of frames in the video.
 *
 * @param  {Number} [frames] - Number of frames to seek by.
 * @param  {Function} [callback] - Callback function to execute once seeking is complete.
 */
VideoFrame.prototype.seekBackward = function(frames, callback) {
	if (!frames) { frames = 1; }
	this.__seek('backward', Number(frames));
	return (callback ? callback() : true);
};

/**
 * For seeking to a certain SMPTE time code, standard time code, frame, second, or millisecond in the video.
 * - Was previously deemed not feasible. Veni, vidi, vici.
 *
 * @param  {Object} option - Configuration Object for seeking allowed keys are SMPTE, time, frame, seconds, and milliseconds
 * example: { SMPTE: '00:01:12:22' }, { time: '00:01:12' },  { frame: 1750 }, { seconds: 72 }, { milliseconds: 72916 }
 */
VideoFrame.prototype.seekTo = function(config) {
	var obj = config || {}, seekTime, SMPTE;
	/** Only allow one option to be passed */
	var option = Object.keys(obj)[0];

	if (option == 'SMPTE' || option == 'time') {
		SMPTE = obj[option];
		seekTime = ((this.toMilliseconds(SMPTE) / 1000) + 0.001);
		this.video.currentTime = seekTime;
		return;
	}

	switch(option) {
		case 'frame':
			SMPTE = this.toSMPTE(obj[option]);
			seekTime = ((this.toMilliseconds(SMPTE) / 1000) + 0.001);
			break;
		case 'seconds':
			seekTime = Number(obj[option]);
			break;
		case 'milliseconds':
			seekTime = ((Number(obj[option]) / 1000) + 0.001);
			break;
	}

	if (!isNaN(seekTime)) {
		this.video.currentTime = seekTime;
	}
};

/* harmony default export */ __webpack_exports__["default"] = (VideoFrame);


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/Environment.js":
/*!**********************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/Environment.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Environment)
/* harmony export */ });
/* harmony import */ var intl_messageformat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! intl-messageformat */ "./node_modules/intl-messageformat/lib/index.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
// @ts-check





/**
 * @typedef {{
 *  twoLetterIsoCode: string;
 *  phrasesInput: PhrasesDict;
 *  phrasesCompiled: Record<string, IntlMessageFormat>;
 * }} Lang
 */

/**
 * Encapsulates various global state and access to browser capabilities.
 * Construct an instance of this at the root of the app and inject / pass it
 * down to the places where it is needed.
 *
 * This allows us, for example, to use fresh `mkid` counters in test cases
 * and to mock browser capabilities if necessary.
 *
 * @implements {Browser}
 * @implements {Identifier}
 * @implements {Translator}
 */
class Environment {
  constructor() {
    /**
     * @private
     * @type {number}
     */
    this.idCnt = 0;

    /**
     * @private
     * @type {Partial<HTMLElementTagNameMap>}
     */
    this.testElements = {};

    /**
     * @private
     * @type {Lang}
     */
    this.lang = {
      twoLetterIsoCode: 'en',
      phrasesInput: {},
      phrasesCompiled: {},
    };
  }

  /**
   * @inheritdoc
   * @returns {URL}
   */
  getLocation() {
    return new URL(window.location.href);
  }

  /**
   * @inheritdoc
   * @returns {boolean}
   */
  supportsMediaSource() {
    return (
      window.MediaSource !== undefined // eslint-disable-line compat/compat
      && window.MediaSource.isTypeSupported !== undefined // eslint-disable-line compat/compat
    );
  }

  /**
   * @inheritdoc
   * @param {string} mimeType
   * @returns {boolean}
   */
  supportsCanvasExport(mimeType) {
    const dataUrl = this.getTestElement('canvas').toDataURL(mimeType);
    const actualMime = (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.dataUrlMime)(dataUrl);
    return actualMime === mimeType;
  }

  /**
   * @inheritdoc
   * @param {string} mimeType
   * @returns {boolean}
   */
  supportsVideoMime(mimeType) {
    return this.getTestElement('video').canPlayType(mimeType) !== '';
  }

  /**
   * @inheritdoc
   * @returns {boolean}
   */
  isInFullScreen() {
    return document.fullscreenElement !== null;
  }

  /**
   * @inheritdoc
   * @returns {string}
   */
  mkid() {
    return `__autoid_${++this.idCnt}`;
  }

  /**
   * Set locale and phrases for subsequent calls to {@link t}.
   *
   * Translation phrases should use the ICU MessageFormat syntax for
   * interpolation and pluralization.
   *
   * @param {LangDef} lang
   */
  setLang(lang) {
    this.lang = {
      twoLetterIsoCode: lang.twoLetterIsoCode,
      phrasesInput: lang.phrases,
      phrasesCompiled: {},
    };
  }

  /**
   * Get translated phrase of given {@link key}, using locale and phrases that
   * have been provided by the latest call to {@link setLang}.
   *
   * @param {string} key
   * @param {Record<string, string | number>} values
   * @param {(() => string) | undefined} fallback (Optional) Function to
   * generate fallback string when {@link key} is not fonud.
   * @returns {string}
   */
  t(key, values = {}, fallback = undefined) {
    let phrase = this.lang.phrasesCompiled[key];

    if (phrase === undefined) {
      const phraseStr = this.lang.phrasesInput[key];

      if (phraseStr === undefined) {
        if (typeof fallback === 'function') {
          return fallback();
        } else {
          console.error(`Warning: Translation key '${key}' not defined, fallback not provided.`);
          return key;
        }
      }

      phrase
        = this.lang.phrasesCompiled[key]
        = new intl_messageformat__WEBPACK_IMPORTED_MODULE_1__["default"](phraseStr, this.lang.twoLetterIsoCode);
    }

    return /** @type {string} */(phrase.format(values));
  }

  /**
   * @private
   * @template {keyof HTMLElementTagNameMap} K
   * @param {K} tagName
   * @returns {HTMLElementTagNameMap[K]}
   */
  getTestElement(tagName) {
    // @ts-expect-error TODO
    return this.testElements[tagName] ?? document.createElement(tagName);
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/Screenshot.js":
/*!*********************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/Screenshot.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawScreenshot": () => (/* binding */ drawScreenshot)
/* harmony export */ });
// @ts-check

/**
 * @typedef {{
 *  h: 'left' | 'right';
 *  v: 'top' | 'bottom';
 *  text: string;
 * }} ScreenshotCaption
 *
 * @typedef {{
 *  captions: ScreenshotCaption[];
 *  minWidth: number;
 * }} ScreenshotConfig
 */

/**
 *
 * @param {HTMLCanvasElement | CanvasRenderingContext2D} target Canvas to which
 * the screenshot is drawn
 * @param {HTMLVideoElement} videoDomElement Source video element from which
 * the screenshot is taken
 * @param {Partial<ScreenshotConfig>} config
 * @returns {boolean}
 */
function drawScreenshot(target, videoDomElement, config) {
  const [targetCanvas, context] =
    target instanceof HTMLCanvasElement
      ? [target, target.getContext('2d')]
      : [target.canvas, target];

  if (context === null) {
    return false;
  }

  // Make sure the target resolution is a multiple of the video resolution
  const targetFactor =
    Math.max(1, Math.ceil((config.minWidth ?? 0) / videoDomElement.videoWidth));

  targetCanvas.width = videoDomElement.videoWidth * targetFactor;
  targetCanvas.height = videoDomElement.videoHeight * targetFactor;

  context.drawImage(
    videoDomElement,
    0, 0, targetCanvas.width, targetCanvas.height
  );

  const unitHeight = targetCanvas.height / 1080;
  const textPad = 10 * unitHeight;

  context.font = `${Math.floor(25 * unitHeight)}px Arial`;
  context.fillStyle = "#FFFFFF";
  context.shadowBlur = 5;
  context.shadowColor = "black";

  for (const caption of config.captions ?? []) {
    const x = caption.h === 'left' ? textPad : targetCanvas.width - textPad;
    const y = caption.v === 'top' ? textPad : targetCanvas.height - textPad;

    context.textAlign = caption.h;
    context.fillText(caption.text, x, y);
  }

  return true;
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/SlubMediaPlayer.js":
/*!**************************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/SlubMediaPlayer.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SlubMediaPlayer)
/* harmony export */ });
/* harmony import */ var _lib_Gestures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Gestures */ "../Resources/Private/JavaScript/lib/Gestures.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _lib_Keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/Keyboard */ "../Resources/Private/JavaScript/lib/Keyboard.js");
/* harmony import */ var _lib_typoConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/typoConstants */ "../Resources/Private/JavaScript/lib/typoConstants.js");
/* harmony import */ var _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../DlfMediaPlayer */ "../Resources/Private/JavaScript/DlfMediaPlayer/index.js");
/* harmony import */ var _lib_Modals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/Modals */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/Modals.js");
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modals */ "../Resources/Private/JavaScript/SlubMediaPlayer/modals/index.js");
/* harmony import */ var _Environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Environment */ "../Resources/Private/JavaScript/SlubMediaPlayer/Environment.js");
/* harmony import */ var _keybindings_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./keybindings.json */ "../Resources/Private/JavaScript/SlubMediaPlayer/keybindings.json");
// @ts-check













/**
 * @typedef {'player' | 'modal' | 'input'} KeyboardScope Currently active
 * target/scope for mapping keybindings.
 *
 * @typedef {HTMLElement & { dlfTimecode: number }} ChapterLink
 *
 * @typedef {{
 *  help: HelpModal;
 *  bookmark: BookmarkModal;
 *  screenshot: ScreenshotModal;
 * }} AppModals
 */

class SlubMediaPlayer {
  /**
   *
   * @param {HTMLElement} container
   * @param {VideoInfo} videoInfo
   * @param {AppConfig} config
   */
  constructor(container, videoInfo, config) {
    /** @private */
    this.container = container;
    /** @private */
    this.playerMount = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)('div');
    this.container.append(this.playerMount);
    /** @private */
    this.videoInfo = videoInfo;
    /** @private */
    this.config = config;
    /** @private @type {Keybinding<KeyboardScope, keyof SlubMediaPlayer['actions']>[]} */
    this.keybindings = /** @type {any} */(_keybindings_json__WEBPACK_IMPORTED_MODULE_8__);

    /** @private @type {AppConstants} */
    this.constants = (0,_lib_typoConstants__WEBPACK_IMPORTED_MODULE_3__["default"])(config.constants ?? {}, {
      screenshotFilenameTemplate: 'Screenshot',
      screenshotCommentTemplate: '',
      prevChapterTolerance: 5,
      volumeStep: 0.05,
      seekStep: 5,
      trickPlayFactor: 4,
      forceLandscapeOnFullscreen: true,
    });

    /** @private */
    this.handlers = {
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
      onClickChapterLink: this.onClickChapterLink.bind(this),
      onCloseModal: this.onCloseModal.bind(this),
    };

    /** @private */
    this.env = new _Environment__WEBPACK_IMPORTED_MODULE_7__["default"]();
    this.env.setLang(config.lang);

    /** @private */
    this.dlfPlayer = new _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_4__.DlfMediaPlayer(this.env);

    /** @private @type {ChapterLink[]} */
    this.chapterLinks = [];

    /** @private */
    this.modals = (0,_lib_Modals__WEBPACK_IMPORTED_MODULE_5__["default"])({
      help: new _modals__WEBPACK_IMPORTED_MODULE_6__.HelpModal(this.container, this.env, {
        constants: {
          ...this.constants,
          // TODO: Refactor
          forceLandscapeOnFullscreen: Number(this.constants.forceLandscapeOnFullscreen),
        },
        keybindings: this.keybindings,
      }),
      bookmark: new _modals__WEBPACK_IMPORTED_MODULE_6__.BookmarkModal(this.container, this.env, {
        shareButtons: this.config.shareButtons,
      }),
      screenshot: new _modals__WEBPACK_IMPORTED_MODULE_6__.ScreenshotModal(this.container, this.env, {
        keybindings: this.keybindings,
        screnshotCaptions: this.config.screenshotCaptions ?? [],
        constants: this.constants,
      }),
    });

    /** @private */
    this.actions = {
      'cancel': () => {
        if (this.modals.hasOpen()) {
          this.modals.closeNext();
        } else if (this.dlfPlayer.isThumbnailPreviewOpen()) {
          this.dlfPlayer.endSeek();
        } else if (this.dlfPlayer.anySettingsMenusAreOpen()) {
          this.dlfPlayer.hideSettingsMenus();
        }
      },
      'modal.help.open': () => {
        this.openModal(this.modals.help);
      },
      'modal.help.toggle': () => {
        this.dlfPlayer.endSeek();
        this.modals.toggleExclusive(this.modals.help);
      },
      'modal.bookmark.open': () => {
        this.showBookmarkUrl();
      },
      'modal.screenshot.open': () => {
        this.showScreenshot();
      },
      'modal.screenshot.snap': () => {
        this.snapScreenshot();
      },
      'fullscreen.toggle': () => {
        this.dlfPlayer.endSeek();
        this.toggleFullScreen();
      },
      'theater.toggle': () => {
        this.dlfPlayer.endSeek();

        // @see DigitalcollectionsScripts.js
        // TODO: Make sure the theater mode isn't activated on startup; then stop persisting
        /** @type {DlfTheaterMode} */
        const ev = new CustomEvent('dlf-theater-mode', {
          detail: {
            action: 'toggle',
            persist: true,
          },
        });
        window.dispatchEvent(ev);
      },
      'playback.toggle': () => {
        if (this.dlfPlayer.paused) {
          this.dlfPlayer.play();
        } else {
          this.dlfPlayer.pause();
        }
      },
      'playback.volume.mute.toggle': () => {
        this.dlfPlayer.muted = !this.dlfPlayer.muted;
      },
      'playback.volume.inc': () => {
        this.dlfPlayer.volume = this.dlfPlayer.volume + this.constants.volumeStep;
      },
      'playback.volume.dec': () => {
        this.dlfPlayer.volume = this.dlfPlayer.volume - this.constants.volumeStep;
      },
      'playback.captions.toggle': () => {
        this.dlfPlayer.showCaptions = !this.dlfPlayer.showCaptions;
      },
      'navigate.rewind': () => {
        this.dlfPlayer.skipSeconds(-this.constants.seekStep);
      },
      'navigate.seek': () => {
        this.dlfPlayer.skipSeconds(+this.constants.seekStep);
      },
      'navigate.continuous-rewind': () => {
        this.dlfPlayer.ensureTrickPlay(-this.constants.trickPlayFactor);
      },
      'navigate.continuous-seek': () => {
        this.dlfPlayer.ensureTrickPlay(this.constants.trickPlayFactor);
      },
      'navigate.chapter.prev': () => {
        this.dlfPlayer.prevChapter();
      },
      'navigate.chapter.next': () => {
        this.dlfPlayer.nextChapter();
      },
      'navigate.frame.prev': () => {
        this.dlfPlayer.getVifa()?.seekBackward(1);
      },
      'navigate.frame.next': () => {
        this.dlfPlayer.getVifa()?.seekForward(1);
      },
      'navigate.position.percental': (
        /** @type {Keybinding<any, any>} */ kb,
        /** @type {number} */ keyIndex
      ) => {
        if (0 <= keyIndex && keyIndex < kb.keys.length) {
          // Implies kb.keys.length > 0

          const relative = keyIndex / kb.keys.length;
          const absolute = relative * this.dlfPlayer.getVideo().duration;

          this.dlfPlayer.seekTo(absolute);
        }
      },
      'navigate.thumbnails.snap': (
        /** @type {Keybinding<any, any>} */ _kb,
        /** @type {number} */ _keyIndex,
        /** @type {KeyEventMode} */ mode
      ) => {
        this.dlfPlayer.setThumbnailSnap(mode === 'down');
      },
    };

    this.modals.on('closed', this.handlers.onCloseModal);

    this.load();
  }

  /**
   * Prints global error message into {@link container} and quits.
   *
   * @private
   * @param {string} langKey
   */
  failWithError(langKey) {
    this.dlfPlayer.unmount();

    const errorBox = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)('div', {
      className: "sxnd-player-fatal-error",
    }, [this.env.t(langKey)]);

    this.container.innerHTML = "";
    this.container.append(errorBox);
  }

  /**
   * @private
   * @param {Chapters} chapters
   * @returns {number | undefined}
   */
  getStartTime(chapters) {
    const timecode = this.env.getLocation().searchParams.get('timecode');

    if (timecode !== null) {
      return timecode ? parseFloat(timecode) : undefined;
    } else if (this.videoInfo.pageNo !== undefined) {
      return chapters.at(this.videoInfo.pageNo - 1)?.timecode;
    }
  }

  /**
   * Extracts timecode to jump to when clicking on {@link link}, or `null` if
   * none could be determined.
   *
   * @private
   * @param {HTMLAnchorElement} link
   * @returns {number | null}
   */
  getLinkTimecode(link) {
    // Attempt: Parse data-timecode attribute
    const timecodeAttr = link.getAttribute("data-timecode");
    if (timecodeAttr !== null) {
      const timecode = Number(timecodeAttr);
      if (Number.isFinite(timecode)) {
        return timecode;
      }
    }

    // Attempt: Parse timecode hash in URL ("#timecode=120")
    const timecodeMatch = link.hash.match(/timecode=(\d+(\.\d?)?)/);
    if (timecodeMatch !== null) {
      const timecode = Number(timecodeMatch[1]);
      if (Number.isFinite(timecode)) {
        return timecode;
      }
    }

    return null;
  }

  /**
   * @private
   */
  async load() {
    // Find sources for supported manifest/video formats
    const videoSources = this.videoInfo.sources.filter(
      source => this.dlfPlayer.supportsMimeType(source.mimeType)
    );

    if (videoSources.length === 0) {
      this.failWithError('error.playback-not-supported');
      return;
    }

    document.querySelectorAll("a[data-timecode], .tx-dlf-tableofcontents a").forEach(el => {
      const link = /** @type {HTMLAnchorElement} */(el);
      const timecode = this.getLinkTimecode(link);
      if (timecode !== null) {
        const dlfEl = /** @type {ChapterLink} */(el);
        dlfEl.dlfTimecode = timecode;
        dlfEl.addEventListener('click', this.handlers.onClickChapterLink);
        this.chapterLinks.push(dlfEl);
      }
    });

    const chapterInfos = this.videoInfo.chapters.map(chapter => ({
      ...chapter,
      timecode: parseInt(chapter.timecode, 10),
    }));
    const chapters = new _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_4__.Chapters(chapterInfos);

    const startTime = this.getStartTime(chapters);

    this.dlfPlayer.addControlElement(
      _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_4__.ControlPanelButton.register(this.env, {
        className: "sxnd-screenshot-button",
        material_icon: 'photo_camera',
        title: this.env.t('control.screenshot.tooltip'),
        onClick: this.actions['modal.screenshot.open'],
      }),
      _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_4__.ControlPanelButton.register(this.env, {
        className: "sxnd-bookmark-button",
        material_icon: 'bookmark_border',
        title: this.env.t('control.bookmark.tooltip'),
        onClick: this.actions['modal.bookmark.open'],
      }),
      'fullscreen',
      _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_4__.ControlPanelButton.register(this.env, {
        className: "sxnd-help-button",
        material_icon: 'info_outline',
        title: this.env.t('control.help.tooltip'),
        onClick: this.actions['modal.help.open'],
      })
    );
    this.dlfPlayer.setConstants(this.constants);
    this.dlfPlayer.setLocale(this.config.lang.twoLetterIsoCode);
    if (this.videoInfo.url.poster !== undefined) {
      this.dlfPlayer.setPoster(this.videoInfo.url.poster);
    }
    this.dlfPlayer.setChapters(chapters);
    this.dlfPlayer.mount(this.playerMount);

    // Try loading video until one of the sources works.
    let loadedSource;
    for (const source of videoSources) {
      try {
        await this.dlfPlayer.loadManifest(source, startTime);
        loadedSource = source;
        break;
      } catch (e) {
        console.error(e);
      }
    }

    if (loadedSource === undefined) {
      this.failWithError('error.load-failed');
      return;
    }

    this.modals.resize();

    this.registerEventHandlers();
  }

  registerEventHandlers() {
    document.addEventListener('keydown', this.handlers.onKeyDown);
    document.addEventListener('keyup', this.handlers.onKeyUp, { capture: true });

    // TODO: Move actions to DlfMediaPlayer, then also move gesture detection there

    const g = new _lib_Gestures__WEBPACK_IMPORTED_MODULE_0__["default"]();
    g.register(this.dlfPlayer.getContainer());

    g.on('gesture', (e) => {
      if (e.event.clientY >= this.dlfPlayer.userArea.bottom) {
        return;
      }

      if (!this.dlfPlayer.isUserAreaEvent(e.event)) {
        return;
      }

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
            this.dlfPlayer.beginRelativeSeek(e.event.clientX);
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
      this.dlfPlayer.endSeek();
      this.dlfPlayer.cancelTrickPlay();
    });
  }

  /**
   * @private
   * @returns {KeyboardScope}
   */
  getKeyboardScope() {
    if (this.modals.hasOpen()) {
      return 'modal';
    }

    for (const input of Array.from(document.querySelectorAll('input:focus'))) {
      // Check that the input element is visible (would receive the event)
      if (input instanceof HTMLElement && input.offsetParent !== null) {
        return 'input';
      }
    }

    return 'player';
  }

  /**
   * @private
   * @param {KeyboardEvent} e
   */
  onKeyDown(e) {
    this.handleKey(e, 'down');
  }

  /**
   * @private
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    // Stopping propagation is a hack against the keyup handler in
    // `slub_digitalcollections`, which adds/removes a `fullscreen` CSS
    // class when releasing `f`/`Esc`.
    // TODO: Find better solutions for this.

    e.stopImmediatePropagation();

    this.handleKey(e, 'up');
    this.dlfPlayer.cancelTrickPlay();
  }

  /**
   * @private
   * @param {KeyboardEvent} e
   * @param {KeyEventMode} mode
   */
  handleKey(e, mode) {
    const curKbScope = this.getKeyboardScope();
    const result = (0,_lib_Keyboard__WEBPACK_IMPORTED_MODULE_2__.Keybindings$find)(this.keybindings, e, curKbScope);

    if (result) {
      const { keybinding, keyIndex } = result;

      e.preventDefault();

      const shouldHandle = (
        (mode === 'down' && (keybinding.keydown ?? true))
        || (mode === 'up' && (keybinding.keyup ?? false))
      );

      if (shouldHandle) {
        this.actions[keybinding.action]?.(keybinding, keyIndex, mode);
      }
    }
  }

  /**
   * @private
   * @param {MouseEvent} e
   */
  onClickChapterLink(e) {
    e.preventDefault();

    // Use `currentTarget` to get the <a> element to which the handler has
    // been attached.
    const target = /** @type {ChapterLink} */(e.currentTarget);

    this.dlfPlayer.play();
    this.dlfPlayer.seekTo(target.dlfTimecode);
  }

  /**
   * @private
   * @param {ValueOf<AppModals>} modal
   */
  onCloseModal(modal) {
    this.dlfPlayer.resumeOn(modal);
  }

  /**
   * Mostly taken from Shaka player (shaka.ui.Controls).
   *
   * We put this here so that we don't need to append the app elements (modals)
   * to the player container.
   */
  async toggleFullScreen() {
    if (document.fullscreenElement) {
      if (screen.orientation) {
        screen.orientation.unlock();
      }
      await document.exitFullscreen();
    } else {
      // If we are in PiP mode, leave PiP mode first.
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        }
        await this.container.requestFullscreen({ navigationUI: 'hide' });
        if (this.constants.forceLandscapeOnFullscreen && screen.orientation) {
          try {
            // Locking to 'landscape' should let it be either
            // 'landscape-primary' or 'landscape-secondary' as appropriate.
            await screen.orientation.lock('landscape');
          } catch (error) {
            // If screen.orientation.lock does not work on a device, it will
            // be rejected with an error. Suppress that error.
          }
        }
      } catch (e) {
        // TODO: Error handling
        console.log(e);
      }
    }
  }

  showBookmarkUrl() {
    // Don't show modal if we can't expect the current time to be properly
    // initialized
    if (!this.dlfPlayer.hasCurrentData) {
      return;
    }

    const modal = this.modals.bookmark
      .setTimecode(this.dlfPlayer.displayTime)
      .setFps(this.dlfPlayer.getFps() ?? 0);

    this.openModal(modal, /* pause= */ true);
  }

  /**
   * @returns {ScreenshotModal | null}
   */
  prepareScreenshot() {
    // Don't do screenshot if there isn't yet an image to be displayed
    if (!this.dlfPlayer.hasCurrentData) {
      return null;
    }

    return (
      this.modals.screenshot
        .setVideo(this.dlfPlayer.getVideo())
        .setMetadata(this.videoInfo.metadata)
        .setFps(this.dlfPlayer.getFps())
        .setTimecode(this.dlfPlayer.displayTime)
    );
  }

  showScreenshot() {
    const modal = this.prepareScreenshot();

    if (modal !== null) {
      this.openModal(modal, /* pause= */ true);
    }
  }

  snapScreenshot() {
    const modal = this.prepareScreenshot();

    if (modal !== null) {
      modal.snap();
    }
  }

  /**
   * @private
   * @param {ValueOf<AppModals>} modal
   * @param {boolean} pause
   */
  openModal(modal, pause = false) {
    if (pause) {
      this.dlfPlayer.pauseOn(modal);
    }

    this.dlfPlayer.endSeek();
    modal.open();
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/index.js":
/*!****************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var abortcontroller_polyfill_dist_polyfill_patch_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! abortcontroller-polyfill/dist/polyfill-patch-fetch */ "./node_modules/abortcontroller-polyfill/dist/polyfill-patch-fetch.js");
/* harmony import */ var abortcontroller_polyfill_dist_polyfill_patch_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(abortcontroller_polyfill_dist_polyfill_patch_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SlubMediaPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SlubMediaPlayer */ "../Resources/Private/JavaScript/SlubMediaPlayer/SlubMediaPlayer.js");
// @ts-check





window.SlubMediaPlayer = _SlubMediaPlayer__WEBPACK_IMPORTED_MODULE_1__["default"];


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/Component.js":
/*!************************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/lib/Component.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
// @ts-check



/**
 * @template {object} State
 */
class Component extends (events__WEBPACK_IMPORTED_MODULE_0___default()) {
  /**
   *
   * @param {State} state
   */
  constructor(state) {
    super();

    /**
     * @protected
     * @type {State}
     */
    this.state = state;

    /**
     * @private
     * @type {((prevState: State) => Partial<State>)[]}
     */
    this.pendingStateUpdates = [];

    /**
     * @private
     * @type {ReturnType<setTimeout> | null}
     */
    this.renderTimeout = null;

    /**
     * @private
     * @type {Promise<void>}
     */
    this.renderPromise = Promise.resolve();
  }

  /**
   *
   * @param {Partial<State> | ((prevState: State) => Partial<State>)} state
   */
  setState(state = {}) {
    const stateFn = typeof state === 'function' ? state : (() => state);
    this.pendingStateUpdates.push(stateFn);

    // Postpone updates so that multiple synchronous calls to `setState` don't
    // lead to multiple renderings.
    if (!this.renderTimeout) {
      this.renderPromise = new Promise((resolve) => {
        this.renderTimeout = setTimeout(() => {
          const newState = this.squashStateUpdates();
          this.render(newState);
          this.state = newState;
          this.renderTimeout = null;
          this.renderPromise = Promise.resolve();
          this.emit('updated', newState);
          resolve();
        });
      });
    }
  }

  /**
   * Returns a promise of any pending rerender being completed. (If no rerender
   * is pending, the returned promise is already resolved.)
   *
   * @returns {Promise<void>}
   */
  update() {
    return this.renderPromise;
  }

  /**
   * @private
   * @returns {State}
   */
  squashStateUpdates() {
    const newState = Object.assign({}, this.state);
    for (const updateState of this.pendingStateUpdates) {
      Object.assign(newState, updateState(newState));
    }
    this.pendingStateUpdates = [];
    return newState;
  }

  /**
   * Rerenders the component based on new state.
   *
   * `this.state` still refers to the old state during execution of this method,
   * which you may use to detect state changes.
   *
   * @abstract
   * @protected
   * @param {State} state The updated state
   */
  render(state) {
    //
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/Modals.js":
/*!*********************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/lib/Modals.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Modals)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
// @ts-check



/**
 * @template T
 * @typedef ModalFuncs
 * @property {(modal: ValueOf<T>) => void} toggleExclusive Try to toggle the
 * modal while not inducing a state of two open modals.
 * @property {(coverContainer: Element | null) => void} setFullscreen
 * @property {() => boolean} hasOpen
 * @property {() => void} closeNext
 * @property {() => void} closeAll
 * @property {() => Promise<void>} update
 * @property {() => void} resize
 */

/**
 * @template T
 * @typedef {T & ModalFuncs<T> & EventEmitter} ModalsType
 */

/**
 * Mixin to add modal-related utility functions to set of modals.
 *
 * @template {Record<string, Modal>} T
 * @param {T} modals
 * @returns {ModalsType<T>}
 */
function Modals(modals) {
  const modalsArray = Object.values(modals);

  // Set DOM element that is used to cover the background of the modals. It is
  // used to make sure that when a modal is open, the background won't respond
  // to mouse actions. It also makes it simpler to detect clicking outside of
  // an open modal.
  const modalCover = document.createElement('div');
  modalCover.className = "sxnd-modal-cover";
  modalCover.addEventListener('click', () => {
    result.closeAll();
  });
  document.body.append(modalCover);

  /** @type {ModalFuncs<T>} */
  const resultFuncs = {
    toggleExclusive: (modal) => {
      if (modal.isOpen) {
        modal.close();
      } else if (!result.hasOpen()) {
        modal.open();
      }
    },
    setFullscreen: (coverContainer) => {
      (coverContainer ?? document.body).append(modalCover);
    },
    hasOpen: () => {
      return modalsArray.some(modal => modal.isOpen);
    },
    closeNext: () => {
      for (const modal of modalsArray) {
        // TODO: Close topmost? Close most recently opened?
        if (modal.isOpen) {
          modal.close();
          break;
        }
      }
    },
    closeAll: () => {
      for (const modal of modalsArray) {
        modal.close();
      }
    },
    update: async () => {
      await Promise.all(
        modalsArray.map(modal => modal.update())
      );
    },
    resize: () => {
      for (const modal of modalsArray) {
        modal.resize();
      }
    },
  };

  /** @type {ModalsType<T>} */
  const result = Object.assign(new (events__WEBPACK_IMPORTED_MODULE_0___default())(), modals, resultFuncs);

  // TODO: Performance
  window.addEventListener('resize', () => {
    result.resize();
  });

  document.addEventListener('fullscreenchange', () => {
    result.setFullscreen(document.fullscreenElement);
  });

  for (const modal of modalsArray) {
    modal.on('updated', () => {
      if (!modal.isOpen) {
        result.emit('closed', modal);
      }

      if (result.hasOpen()) {
        modalCover.classList.add('shown');
      } else {
        modalCover.classList.remove('shown');
      }
    });
  }

  return result;
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/SimpleModal.js":
/*!**************************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/lib/SimpleModal.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SimpleModal)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/Component.js");
// @ts-check






/**
 * @typedef {{
 *  show: boolean;
 * }} BaseState
 */

/**
 * @template {object} ModalState
 * @extends {Component<BaseState & ModalState>}
 * @implements {Modal}
 */
class SimpleModal extends _Component__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   *
   * @param {HTMLElement} parent
   * @param {ModalState & Partial<BaseState>} state
   */
  constructor(parent, state) {
    super({
      show: false,
      ...state,
    });

    /**
     * @private
     */
    this.parent = parent;

    /**
     * Whether a show/hide animation is currently running. This is to avoid
     * "backlogs" of animations when the user keeps pressing a key that toggles
     * modal visibility.
     *
     * @private
     */
    this.isAnimating = false;

    /**
     * @protected
     */
    this.$main = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)('div', { className: "sxnd-modal" }, [
      this.$headline = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)('div', { className: "headline-container" }, [
        this.$title = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)('h3'),
        this.$close = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)('span', {
          className: "modal-close material-icons-round",
          $click: this.close.bind(this),
        }, ["close"]),
      ]),
      this.$body = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)('div', { className: "body-container" }),
    ]);

    this.parent.append(this.$main);

    /**
     * @private
     */
    this.jqMain = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$main);

    this.resize();
  }

  resize() {
    // TODO: Find a CSS-only approach. It should
    //  - resize dynamically relative to the parent's height (not to viewport)
    //  - allow to scroll on body when overflowing
    //  - allow transparent background of modal
    //  - allow to center the modal vertically
    this.$body.style.maxHeight = `calc(${this.parent.clientHeight}px - 11rem)`;
  }

  /**
   * Whether or not the modal is currently open.
   *
   * @returns {boolean}
   */
  get isOpen() {
    return this.state.show;
  }

  /**
   * Opens or closes the modal depending on {@link value}.
   *
   * @param {boolean} value
   */
  open(value = true) {
    if (this.isAnimating) {
      return;
    }

    // @ts-expect-error TODO: Why wouldn't this work?
    this.setState({
      show: value,
    });
  }

  /**
   * Closes the modal.
   */
  close() {
    this.open(false);
  }

  /**
   * Toggles whether the modal is opened.
   */
  toggle() {
    this.open(!this.state.show);
  }

  /**
   * @override
   * @param {BaseState & ModalState} state
   */
  render(state) {
    const { show } = state;

    if (show !== this.state.show) {
      this.isAnimating = true;
      const fn = show ? 'show' : 'hide';
      this.jqMain[fn]({
        duration: 'fast',
        complete: () => {
          this.isAnimating = false;
        },
      });
    }
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/generateTimecodeUrl.js":
/*!**********************************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/lib/generateTimecodeUrl.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateTimecodeUrl)
/* harmony export */ });
// @ts-check

/**
 *
 * @param {number | null} timecode
 * @param {Browser} env
 * @returns
 */
function generateTimecodeUrl(timecode, env) {
  const url = env.getLocation();
  if (timecode != null && timecode !== 0) {
    url.searchParams.set('timecode', timecode.toString());
  } else {
    url.searchParams.delete('timecode');
  }
  return url;
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/metadata.js":
/*!***********************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/lib/metadata.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillMetadata": () => (/* binding */ fillMetadata)
/* harmony export */ });
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
// @ts-check



/**
 *
 * @param {string} template
 * @param {MetadataArray} metadata
 * @returns {string}
 */
function fillMetadata(template, metadata) {
  const firstMetadataValues = Object.fromEntries(
    Object.entries(metadata).map(([key, values]) => [key, values[0] ?? ''])
  );

  return (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.fillPlaceholders)(template, firstMetadataValues);
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/trans.js":
/*!********************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/lib/trans.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getKeyText": () => (/* binding */ getKeyText),
/* harmony export */   "getKeybindingText": () => (/* binding */ getKeybindingText)
/* harmony export */ });
/* harmony import */ var _lib_Keyboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/Keyboard */ "../Resources/Private/JavaScript/lib/Keyboard.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
// @ts-check




/**
 * Returns a translated string describing key {@link key}.
 *
 * @param {Translator} env
 * @param {KeyboardEvent['key']} key
 * @param {boolean} mod
 * @returns {string}
 */
function getKeyText(env, key, mod) {
  const app = mod ? '.mod' : '';
  return env.t(`key.${key}${app}`, {},
    () => env.t(`key.${key}`, {},
      () => env.t(`key.generic${app}`, { key: key.toUpperCase() },
        () => env.t(`key.generic`, { key: key.toUpperCase() })
      )
    )
  );
}

/**
 * Returns a translated DOM element describing keybinding {@link kb}.
 *
 * @param {Translator} env
 * @param {Keybinding<any, any>} kb
 * @returns {HTMLElement}
 */
function getKeybindingText(env, kb) {
  const keyRanges = (0,_lib_Keyboard__WEBPACK_IMPORTED_MODULE_0__.Keybinding$splitKeyRanges)(kb.keys);
  const rangeTexts = [];
  const mod = kb.mod !== undefined || keyRanges.length > 1;
  const untoText = env.t(`key.unto${mod ? '.mod' : ''}`);

  for (const range of keyRanges) {
    const beginText = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("kbd", {}, [getKeyText(env, range.begin, mod)]);

    if (range.begin === range.end) {
      rangeTexts.push(beginText);
    } else {
      const endText = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("kbd", {}, [getKeyText(env, range.end, mod)]);

      rangeTexts.push(
        (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("span", { className: "kb-range" }, [beginText, untoText, endText])
      );
    }
  }

  let text;

  if (kb.mod) {
    const modifierText = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("kbd", {}, [env.t(`key.mod.${kb.mod}`)]);
    text = [modifierText, " + ", ...(0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.domJoin)(rangeTexts, "/")];
  } else {
    text = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.domJoin)(rangeTexts, " / ");
  }

  if (kb.repeat) {
    const rptParts = env.t('key.repeat', { key: '###' }).split('###');
    text = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.domJoin)(rptParts, text);
  }

  return (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("span", {}, text);
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/modals/BookmarkModal.js":
/*!*******************************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/modals/BookmarkModal.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BookmarkModal)
/* harmony export */ });
/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qrcode */ "./node_modules/qrcode/lib/browser.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../DlfMediaPlayer */ "../Resources/Private/JavaScript/DlfMediaPlayer/index.js");
/* harmony import */ var _lib_generateTimecodeUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/generateTimecodeUrl */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/generateTimecodeUrl.js");
/* harmony import */ var _lib_SimpleModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/SimpleModal */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/SimpleModal.js");
// @ts-check








/**
 * @typedef {(
 *  | { type: "material"; icon: string; }
 *  | { type: "image"; src: string; }
 * ) & {
 *  hrefTemplate: string;
 *  titleTranslationKey: string;
 * }} ShareButtonInfo
 *
 * @typedef {{
 *  hrefTemplate: string;
 *  element: HTMLAnchorElement;
 * }} ShareButton
 *
 * @typedef {{
 *  shareButtons: ShareButtonInfo[];
 * }} Config
 *
 * @typedef {{
 *  timecode: number | null;
 *  fps: number;
 *  startAtTimecode: boolean;
 *  showQrCode: boolean;
 * }} State
 */

/**
 * @extends {SimpleModal<State>}
 */
class BookmarkModal extends _lib_SimpleModal__WEBPACK_IMPORTED_MODULE_4__["default"] {
  /**
   *
   * @param {HTMLElement} element
   * @param {Translator & Identifier & Browser} env
   * @param {Partial<Config>} config
   */
  constructor(element, env, config) {
    super(element, {
      timecode: null,
      fps: 0,
      startAtTimecode: true,
      showQrCode: false,
    });

    /** @private @type {string | null} */
    this.lastRenderedUrl = null;

    /** @private */
    this.handlers = {
      handleClickShareButton: this.handleClickShareButton.bind(this),
    };

    /** @private */
    this.env = env;

    this.$main.classList.add('bookmark-modal');
    this.$title.innerText = this.env.t('modal.bookmark.title');

    const startAtCheckId = this.env.mkid();

    const shareButtons = (config.shareButtons ?? []).map(this.createShareButton.bind(this));
    this.shareButtons = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.filterNonNull)(shareButtons);

    this.$body.append(
      (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("div", {}, [
        this.shareButtons.length > 0 && (
          (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("div", { className: "share-buttons" },
            this.shareButtons.map(btn => btn.element)
          )
        ),
        (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("div", { className: "url-line" }, [
          this.$urlInput = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("input", {
            type: "url",
            readOnly: true,
            value: location.href,
          }),
          (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("a", {
            href: "javascript:void(0)",
            className: "copy-to-clipboard",
            title: this.env.t('modal.bookmark.copy-link'),
            $click: this.handleCopyToClipboard.bind(this),
          }, [
            (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("i", { className: "material-icons-round" }, ["content_copy"]),
          ]),
        ]),
        this.$startAt = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("div", { className: "start-at" }, [
          this.$startAtCheck = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("input", {
            type: "checkbox",
            id: startAtCheckId,
            $change: this.handleChangeStartAtTimecode.bind(this),
          }),
          this.$startAtLabel = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("label", { htmlFor: startAtCheckId }),
        ]),
        this.$qrCanvasContainer = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("div", { className: "url-qrcode" }, [
          (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("hr"),
          this.$qrCanvas = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("canvas"),
        ]),
      ])
    );
  }

  /**
   *
   * @param {ShareButtonInfo} info
   * @return {ShareButton}
   */
  createShareButton(info) {
    /** @type {HTMLElement} */
    let iconElement;

    switch (info.type) {
      case "material":
        iconElement = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("i", { className: "material-icons-round" }, [info.icon]);
        break;

      case "image":
        iconElement = (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("img", { src: info.src });
        break;
    }

    return {
      hrefTemplate: info.hrefTemplate,
      element: (0,_lib_util__WEBPACK_IMPORTED_MODULE_1__.e)("a", {
        title: this.env.t(info.titleTranslationKey ?? "", {}, () => ""),
        target: "_blank",
        rel: "noopener noreferrer",
        $click: this.handlers.handleClickShareButton,
      }, [iconElement]),
    };
  }

  /**
   *
   * @param {MouseEvent} e
   */
  handleClickShareButton(e) {
    const element =/** @type {HTMLAnchorElement} */(e.currentTarget);

    if (element.href === "dlf:qr_code") {
      e.preventDefault();

      this.setState({
        showQrCode: true,
      });
    }
  }

  async handleCopyToClipboard() {
    const url = this.generateUrl(this.state);

    // Besides being necessary for `execCommand`, the focus is also meant to
    // provide visual feedback to the user.
    // TODO: Improve user feedback, also when an exception occurs
    this.$urlInput.focus();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    } else {
      document.execCommand('copy');
    }
  }

  /**
   *
   * @param {Event} e
   */
  handleChangeStartAtTimecode(e) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    this.setState({
      startAtTimecode: e.target.checked,
    });
  }

  /**
   *
   * @param {number} timecode
   * @returns {this}
   */
  setTimecode(timecode) {
    this.setState({ timecode });
    return this;
  }

  /**
   *
   * @param {number} fps
   * @returns {this}
   */
  setFps(fps) {
    this.setState({ fps });
    return this;
  }

  /**
   * @private
   * @param {State} state
   */
  generateUrl(state) {
    const timecode = state.startAtTimecode ? state.timecode : null;
    return (0,_lib_generateTimecodeUrl__WEBPACK_IMPORTED_MODULE_3__["default"])(timecode, this.env).toString();
  }

  /**
   * @override
   * @param {boolean} value
   */
  open(value = true) {
    super.open(value);

    if (!value) {
      this.setState({ showQrCode: false });
    }
  }

  /**
   * @override
   * @param {import('../lib/SimpleModal').BaseState & State} state
   */
  render(state) {
    super.render(state);

    const { show, timecode, fps, startAtTimecode, showQrCode } = state;

    const url = this.generateUrl(state);
    const urlChanged = url !== this.lastRenderedUrl;

    if (urlChanged) {
      const encodedUrl = encodeURIComponent(url);

      for (const btn of this.shareButtons) {
        btn.element.href = btn.hrefTemplate.replace(/{url}/g, encodedUrl);
      }

      this.$urlInput.value = url;
      this.lastRenderedUrl = url;
    }

    if (urlChanged || showQrCode !== this.state.showQrCode) {
      this.renderQrCode(showQrCode ? url : null);
    }

    // TODO: Just disable when timecode is 0?
    if (timecode === null || timecode === 0) {
      this.$startAt.classList.remove('shown');
    } else {
      this.$startAtCheck.checked = startAtTimecode;
      this.$startAtLabel.innerText =
        this.env.t('modal.bookmark.start-at-current-time', {
          timecode: (0,_DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_2__.buildTimeString)(timecode, true, fps),
        });

      this.$startAt.classList.add('shown');
    }

    if (show && show !== this.state.show) {
      this.$urlInput.select();
    }
  }

  /**
   *
   * @param {string | null} text
   */
  async renderQrCode(text) {
    if (text !== null) {
      try {
        await qrcode__WEBPACK_IMPORTED_MODULE_0__.toCanvas(this.$qrCanvas, text);
        this.$qrCanvasContainer.classList.add("dlf-visible");
      } catch (e) {
        alert(this.env.t('error.qrcode'));
        console.error(e);
      }
    } else {
      this.$qrCanvasContainer.classList.remove("dlf-visible");
    }
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/modals/HelpModal.js":
/*!***************************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/modals/HelpModal.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HelpModal)
/* harmony export */ });
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _lib_SimpleModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/SimpleModal */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/SimpleModal.js");
/* harmony import */ var _lib_trans__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/trans */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/trans.js");
// @ts-check





/**
 * @typedef {string} KeybindingKind See `Keybinding::kind`.
 * @typedef {string} KeybindingAction See `Keybinding::action`.
 * @typedef {Keybinding<string, KeybindingAction>} ShownKeybinding
 * @typedef {Record<KeybindingKind, Record<KeybindingAction, ShownKeybinding[]>>} KeybindingGroups
 */

/**
 * Groups list of keybindings by overall group (used to split by tables)
 * and action.
 *
 * @param {ShownKeybinding[]} keybindings
 * @returns {KeybindingGroups}
 */
function groupKeybindings(keybindings) {
  // Prepopulate to determine an order
  /** @type {KeybindingGroups} */
  const result = {
    'navigate': {},
    'player': {},
    'other': {},
  };

  const keybindingsSorted = keybindings.slice();
  keybindingsSorted.sort((a, b) => a.order - b.order);

  for (const kb of keybindingsSorted) {
    let kind = result[kb.kind];
    if (!kind) {
      kind = result[kb.kind] = {};
    }

    let action = kind[kb.action];
    if (!action) {
      action = kind[kb.action] = [];
    }

    action.push(kb);
  }

  return result;
}

/**
 * @extends {SimpleModal<{}>}
 */
class HelpModal extends _lib_SimpleModal__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Translator} env
   * @param {object} config
   * @param {Record<string, string | number>} config.constants
   * @param {ShownKeybinding[]} config.keybindings
   */
  constructor(parent, env, config) {
    super(parent, {});

    /** @private */
    this.env = env;
    /** @private */
    this.config = config;

    this.createBodyDom();
  }

  createBodyDom() {
    const env = this.env;

    this.$main.classList.add('help-modal');
    this.$title.innerText = env.t('modal.help.title');

    const allKbGrouped = groupKeybindings(this.config.keybindings);

    const els = (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.e)("table", { className: "keybindings-table" }, (
      Object.entries(allKbGrouped)
        .flatMap(([kind, kbGrouped]) => {
          const keybindings = [...Object.entries(kbGrouped)];
          if (keybindings.length === 0) {
            return;
          }

          return [
            (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.e)("thead", {}, [
              (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.e)("th", { className: "kb-group", colSpan: 2 }, [
                env.t(`action.kind.${kind}`)
              ]),
            ]),
            (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.e)("tbody", {}, (
              keybindings.map(([action, kbs]) => (
                (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.e)("tr", {}, [
                  (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.e)("td", { className: "key" }, this.listKeybindings(kbs)),
                  (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.e)("td", { className: "action" }, [this.describeAction(action)]),
                ])
              ))
            ))
          ];
        })
    ));

    this.$body.append(els);
  }

  /**
   * Generates and concatenates texts of multiple keybindings.
   *
   * @param {ShownKeybinding[]} kbs
   */
  listKeybindings(kbs) {
    return (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.domJoin)(kbs.map(kb => (0,_lib_trans__WEBPACK_IMPORTED_MODULE_2__.getKeybindingText)(this.env, kb)), (0,_lib_util__WEBPACK_IMPORTED_MODULE_0__.e)("br"));
  }

  /**
   * Returns a translated string describing {@link action}.
   *
   * @param {KeybindingAction} action
   * @returns {string}
   */
  describeAction(action) {
    return this.env.t(`action.${action}`, this.config.constants);
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/modals/ScreenshotModal.js":
/*!*********************************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/modals/ScreenshotModal.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScreenshotModal)
/* harmony export */ });
/* harmony import */ var _lib_image_imageFormats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/image/imageFormats */ "../Resources/Private/JavaScript/lib/image/imageFormats.js");
/* harmony import */ var _DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DlfMediaPlayer */ "../Resources/Private/JavaScript/DlfMediaPlayer/index.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/util */ "../Resources/Private/JavaScript/lib/util.js");
/* harmony import */ var _lib_generateTimecodeUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/generateTimecodeUrl */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/generateTimecodeUrl.js");
/* harmony import */ var _lib_metadata__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/metadata */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/metadata.js");
/* harmony import */ var _lib_SimpleModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/SimpleModal */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/SimpleModal.js");
/* harmony import */ var _lib_trans__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/trans */ "../Resources/Private/JavaScript/SlubMediaPlayer/lib/trans.js");
/* harmony import */ var _Screenshot__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Screenshot */ "../Resources/Private/JavaScript/SlubMediaPlayer/Screenshot.js");
/* harmony import */ var _lib_typoConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/typoConstants */ "../Resources/Private/JavaScript/lib/typoConstants.js");
// @ts-check











/**
 * @typedef {{
 *  metadata: MetadataArray | null;
 *  showMetadata: boolean;
 *  fps: number | null;
 *  timecode: number | null;
 *  supportedImageFormats: ImageFormatDesc[];
 *  selectedImageFormat: ImageFormatDesc | null;
 * }} State
 *
 * @typedef {{
 *  screenshotFilenameTemplate: string;
 *  screenshotCommentTemplate: string;
 * }} Constants
 *
 * @typedef {{
 *  keybindings: Keybinding<any, any>[];
 *  screnshotCaptions: import('../Screenshot').ScreenshotCaption[];
 *  constants: import('../../lib/typoConstants').TypoConstants<Constants>;
 * }} Config
 */

/**
 * @extends {SimpleModal<State>}
 */
class ScreenshotModal extends _lib_SimpleModal__WEBPACK_IMPORTED_MODULE_5__["default"] {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Translator & Identifier & Browser} env
   * @param {Config} config
   */
  constructor(parent, env, config) {
    const supportedImageFormats = _lib_image_imageFormats__WEBPACK_IMPORTED_MODULE_0__["default"].filter(
      format => env.supportsCanvasExport(format.mimeType)
    );

    super(parent, {
      metadata: null,
      showMetadata: true,
      fps: null,
      timecode: null,
      supportedImageFormats,
      selectedImageFormat: supportedImageFormats[0] ?? null,
    });

    /** @private */
    this.env = env;
    /** @private @type {HTMLVideoElement | null} */
    this.videoDomElement = null;
    /** @private */
    this.config = config;
    /** @private */
    this.constants = (0,_lib_typoConstants__WEBPACK_IMPORTED_MODULE_8__["default"])(config.constants, {
      screenshotFilenameTemplate: 'Screenshot',
      screenshotCommentTemplate: '',
    });

    const snapKeybinding = this.config.keybindings.find(
      kb => kb.action === 'modal.screenshot.snap'
    );

    this.$main.classList.add('screenshot-modal');
    this.$title.innerText = env.t('modal.screenshot.title');

    const idShowMetadata = env.mkid();
    const radioGroup = env.mkid();

    this.$body.append(
      (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("div", { className: "screenshot-config" }, [
        (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("h4", {}, [env.t('modal.screenshot.configuration')]),
        (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("section", { className: "metadata-config" }, [
          (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("h1", {}, [env.t('modal.screenshot.metadata')]),
          (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("div", { className: "metadata-overlay" }, [
            (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("input", {
              type: "checkbox",
              id: idShowMetadata,
              checked: this.state.showMetadata,
              $change: this.handleChangeShowMetadata.bind(this),
            }),
            (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("label", { htmlFor: idShowMetadata }, [
              env.t('modal.screenshot.metadata-overlay'),
            ]),
          ]),
        ]),
        (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("section", {}, [
          (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("h1", {}, [env.t('modal.screenshot.file-format')]),
          (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("div", {}, (
            this.state.supportedImageFormats.map(format => {
              const radioId = env.mkid();

              return (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("span", { className: "file-format-option" }, [
                (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("input", {
                  id: radioId,
                  name: radioGroup,
                  type: 'radio',
                  checked: format.mimeType === this.state.selectedImageFormat?.mimeType,
                  $change: () => {
                    this.setState({
                      selectedImageFormat: format,
                    });
                  },
                }),
                (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("label", { htmlFor: radioId }, [` ${format.label}`]),
              ]);
            })
          )),
        ]),
        (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("a", {
          href: "#",
          className: "download-link",
          $click: this.handleDownloadImage.bind(this),
        }, [
          (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("i", {
            className: "material-icons-round inline-icon",
          }, ["download"]),
          env.t('modal.screenshot.download-image'),
        ]),
        snapKeybinding && (
          (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("aside", { className: "snap-tip" }, [
            (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("i", {
              className: "material-icons-round inline-icon",
            }, ["info_outline"]),
            (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("span", {}, (
              (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.domJoin)(
                env.t('modal.screenshot.snap-tip', { keybinding: "{kb}" }).split('{kb}'),
                (0,_lib_trans__WEBPACK_IMPORTED_MODULE_6__.getKeybindingText)(env, snapKeybinding)
              )
            )),
          ])
        ),
      ]),

      this.$canvas = (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.e)("canvas")
    );
  }

  /**
   * Sets video DOM element for upcoming screenshots.
   *
   * @param {HTMLVideoElement} video
   * @returns {this}
   */
  setVideo(video) {
    this.videoDomElement = video;
    return this;
  }

  /**
   * Triggers UI update using new {@link metadata}.
   *
   * @param {MetadataArray} metadata
   * @returns {this}
   */
  setMetadata(metadata) {
    this.setState({ metadata });
    return this;
  }

  /**
   * Triggers UI update using new {@link fps}.
   *
   * @param {number | null} fps
   * @returns {this}
   */
  setFps(fps) {
    this.setState({ fps });
    return this;
  }

  /**
   * Triggers UI update using new {@link timecode}.
   *
   * @param {number} timecode
   * @returns {this}
   */
  setTimecode(timecode) {
    this.setState({ timecode });
    return this;
  }

  /**
   * @private
   * @param {Event} e
   */
  handleChangeShowMetadata(e) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    this.setState({
      showMetadata: e.target.checked,
    });
  }

  /**
   * @private
   * @param {MouseEvent} e
   */
  async handleDownloadImage(e) {
    e.preventDefault();

    // We could've set `.download-image[href]` in `render()` or in the radio
    // box change listener, but avoid this for performance reasons.

    await this.downloadCurrentImage(this.state);
  }

  /**
   * @param {Pick<State, 'showMetadata' | 'metadata'>} state
   */
  renderCurrentScreenshot({ showMetadata, metadata }) {
    if (this.videoDomElement === null) {
      // TODO: Error handling
      return false;
    }

    const config = {
      captions: showMetadata ? this.getCaptions(metadata) : [],
      minWidth: 1000,
    };

    (0,_Screenshot__WEBPACK_IMPORTED_MODULE_7__.drawScreenshot)(this.$canvas, this.videoDomElement, config);

    return true;
  }

  /**
   *
   * @param {Pick<State, 'metadata'| 'fps' | 'timecode' | 'selectedImageFormat'>} state
   */
  async downloadCurrentImage(state) {
    const { metadata, timecode, selectedImageFormat } = state;
    if (metadata === null || timecode === null || selectedImageFormat === null) {
      console.error("one of [metadata, timecode, selectedImageFormat] is null");
      return false;
    }

    const image = await this.makeImageBlob(
      this.$canvas, selectedImageFormat, metadata, timecode);
    const filename = this.getFilename(metadata, state.fps, timecode, selectedImageFormat);

    (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.download)(image, filename);

    return true;
  }

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {ImageFormatDesc} imageFormat
   * @param {MetadataArray} metadata
   * @param {number} timecode
   */
  async makeImageBlob(canvas, imageFormat, metadata, timecode) {
    const imageBlob = await (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.canvasToBlob)(canvas, imageFormat.mimeType);
    const imageDataStr = await (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.blobToBinaryString)(imageBlob);
    const image = imageFormat.parseBinaryString(imageDataStr);

    if (image) {
      const url = (0,_lib_generateTimecodeUrl__WEBPACK_IMPORTED_MODULE_3__["default"])(timecode, this.env);

      image.addMetadata({
        title: metadata.title?.[0] ?? "",
        // NOTE: Don't localize (not only relevant to current user)
        comment: this.fillExtendedMetadata(this.constants.screenshotCommentTemplate, {
          ...metadata,
          url: [url.toString()],
        }),
      });
      const buffer = (0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.binaryStringToArrayBuffer)(image.toBinaryString());
      return new Blob([buffer], { type: imageBlob.type });
    } else {
      return imageBlob;
    }
  }

  /**
   *
   * @param {MetadataArray} metadata
   * @param {number | null} fps
   * @param {number} timecode
   * @param {ImageFormatDesc} selectedImageFormat
   * @return {string}
   */
  getFilename(metadata, fps, timecode, selectedImageFormat) {
    const basename = this.fillExtendedMetadata(
      (0,_DlfMediaPlayer__WEBPACK_IMPORTED_MODULE_1__.timeStringFromTemplate)(this.constants.screenshotFilenameTemplate, timecode, fps),
      metadata
    );

    const extension = selectedImageFormat.extension;

    return `${(0,_lib_util__WEBPACK_IMPORTED_MODULE_2__.sanitizeBasename)(basename)}.${extension}`;
  }

  /**
   *
   * @param {MetadataArray | null} metadata
   * @returns {import('../Screenshot').ScreenshotCaption[]}
   */
  getCaptions(metadata) {
    return this.config.screnshotCaptions.map(caption => ({
      ...caption,
      text: this.fillExtendedMetadata(caption.text, metadata ?? {}),
    }));
  }

  /**
   *
   * @private
   * @param {string} template
   * @param {MetadataArray} metadata
   * @returns {string}
   */
  fillExtendedMetadata(template, metadata) {
    return (0,_lib_metadata__WEBPACK_IMPORTED_MODULE_4__.fillMetadata)(template, {
      ...metadata,
      host: [`${location.protocol}//${location.host}`],
    });
  }

  /**
   * Downloads image without opening the modal.
   */
  async snap() {
    // Parameters may be on the way via setState (TODO: Refactor)
    await this.update();

    const state = this.state;
    const success = (
      this.renderCurrentScreenshot(state)
      && await this.downloadCurrentImage(state)
    );

    if (!success) {
      alert(this.env.t('modal.screenshot.error'));
    }
  }

  /**
   * @override
   * @param {import('../lib/SimpleModal').BaseState & State} state
   */
  render(state) {
    super.render(state);

    const shouldRender = (
      state.show
      && (!this.state.show || state.showMetadata !== this.state.showMetadata)
    );

    if (shouldRender) {
      this.renderCurrentScreenshot(state);
    }
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/modals/index.js":
/*!***********************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/modals/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BookmarkModal": () => (/* reexport safe */ _BookmarkModal__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "HelpModal": () => (/* reexport safe */ _HelpModal__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "ScreenshotModal": () => (/* reexport safe */ _ScreenshotModal__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _BookmarkModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookmarkModal */ "../Resources/Private/JavaScript/SlubMediaPlayer/modals/BookmarkModal.js");
/* harmony import */ var _HelpModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HelpModal */ "../Resources/Private/JavaScript/SlubMediaPlayer/modals/HelpModal.js");
/* harmony import */ var _ScreenshotModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScreenshotModal */ "../Resources/Private/JavaScript/SlubMediaPlayer/modals/ScreenshotModal.js");
// @ts-check






/***/ }),

/***/ "../Resources/Private/JavaScript/lib/Gestures.js":
/*!*******************************************************!*\
  !*** ../Resources/Private/JavaScript/lib/Gestures.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gestures)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
// @ts-check



/**
 * @typedef {{
 *  x: number;
 *  y: number;
 * }} Position
 *
 * @typedef {'north' | 'east' | 'south' | 'west'} Direction
 *
 * @typedef {{
 *  type: 'tapdown' | 'tapup';
 *  event: PointerEvent;
 *  position: Position;
 *  tapCount: number;
 * }} TapEvent
 *
 * @typedef {{
 *  type: 'hold';
 *  event: PointerEvent;
 *  position: Position;
 *  tapCount: number;
 * }} HoldEvent
 *
 * @typedef {{
 *  type: 'swipe';
 *  event: PointerEvent;
 *  begin: Position;
 *  end: Position;
 *  angle: number;
 *  direction: Direction;
 * }} SwipeEvent
 *
 * @typedef {TapEvent | HoldEvent | SwipeEvent} GestureEvent
 *
 * @typedef {{
 *  date: Date;
 *  positionRel: Position;
 *  positionClientPx: Position;
 *  positionPx: Position;
 * }} Stat
 *
 * @typedef {{
 *  gesture: (event: GestureEvent) => void;
 *  release: () => void;
 * }} Handlers
 *
 * @typedef {{
 *  tapMaxDelay: number;
 *  tapMaxDistance: number;
 *  swipeMinDistance: number;
 *  holdMinDelay: number;
 * }} Config
 */

/**
 * @extends {TypedEvents<Handlers>}
 */
class Gestures {
  /**
   * @param {Partial<Config>} config
   */
  constructor(config = {}) {
    /** @private @type {Config} */
    this.config = {
      tapMaxDelay: 500,
      tapMaxDistance: 20,
      swipeMinDistance: 100,
      holdMinDelay: 200, // TODO: Use something more dynamic, such as difference to double click?
      ...config
    };

    /** @private @type {Record<TapEvent['type'], Stat | null>} */
    this.last = {
      'tapdown': null,
      'tapup': null,
    }
    /** @private @type {ReturnType<setTimeout> | null} */
    this.holdTimeout = null;
    /** @private @type {number} */
    this.tapCount = 0;

    /** @private */
    this.handlers = {
      contextmenu: this.handleContextMenu.bind(this),
      pointerdown: this.handlePointerDown.bind(this),
      pointerup: this.handlePointerUp.bind(this),
      pointercancel: this.handlePointerCancel.bind(this),
      pointerleave: this.handlePointerLeave.bind(this),
    };

    /** @private */
    this.events = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
  }

  /**
   *
   * @param {GlobalEventHandlers} container
   */
  register(container) {
    container.addEventListener('contextmenu', this.handlers.contextmenu);
    container.addEventListener('pointerdown', this.handlers.pointerdown);
    container.addEventListener('pointerup', this.handlers.pointerup);
    container.addEventListener('pointercancel', this.handlers.pointercancel);
    container.addEventListener('pointerleave', this.handlers.pointerleave);
  }

  /**
   *
   * @param {GlobalEventHandlers} container
   */
  deregister(container) {
    container.removeEventListener('contextmenu', this.handlers.contextmenu);
    container.removeEventListener('pointerdown', this.handlers.pointerdown);
    container.removeEventListener('pointerup', this.handlers.pointerup);
    container.removeEventListener('pointercancel', this.handlers.pointercancel);
    container.removeEventListener('pointerleave', this.handlers.pointerleave);
  }

  /**
   *
   * @template {keyof Handlers} T
   * @param {T} event
   * @param {Handlers[T]} callback
   */
  on(event, callback) {
    this.events.on(event, callback);
  }

  /**
   *
   * @param {MouseEvent} e
   */
  handleContextMenu(e) {
    // Release if non-left mouse button is clicked
    this.release();
  }

  /**
   *
   * @param {PointerEvent} e
   */
  handlePointerDown(e) {
    // Release if non-left mouse button is clicked
    if (e.button !== 0) {
      this.release();
      return;
    }

    const cur = this.getStat(e);

    if (this.getContinuation(this.last['tapup'], cur) === 'tap') {
      this.tapCount++;
    } else {
      this.tapCount = 1;
    }

    const tapCount = this.tapCount;

    this.clearHold();

    this.holdTimeout = setTimeout(() => {
      this.events.emit('gesture', /** @type {HoldEvent} */({
        type: 'hold',
        event: e,
        position: cur.positionRel,
        tapCount: tapCount,
      }));
    }, this.config.holdMinDelay);

    this.emitTap('tapdown', e, cur);
  }

  /**
   *
   * @param {PointerEvent} e
   */
  handlePointerUp(e) {
    if (e.button !== 0) {
      return;
    }

    const cur = this.getStat(e);

    this.clearHold();

    const cont = this.getContinuation(this.last['tapdown'], cur);
    if (cont === 'tap') {
      this.emitTap('tapup', e, cur);
    } else if (this.tapCount === 1 && cont === 'swipe') {
      // The cast should be appropriate because swipe can only be detected
      // when last tapdown is set
      const begin = /** @type {Stat} */ (this.last['tapdown']);
      const end = cur;

      // atan2 takes y coordinate counter-clockwise
      const angle = Math.atan2(
        begin.positionPx.y - end.positionPx.y,
        end.positionPx.x - begin.positionPx.x
      );
      const angleDegAbs = Math.abs(angle / Math.PI * 180);

      /** @type {Direction} */
      let direction;
      if (angleDegAbs < 45) {
        direction = 'east';
      } else if (angleDegAbs < 135) {
        direction = angle > 0 ? 'north' : 'south';
      } else {
        direction = 'west';
      }

      this.events.emit('gesture', /** @type {SwipeEvent} */({
        type: 'swipe',
        event: e,
        begin: begin.positionRel,
        end: end.positionRel,
        angle,
        direction,
      }));

      this.reset();
    } else {
      this.release();
    }
  }

  /**
   *
   * @param {PointerEvent} e
   */
  handlePointerCancel(e) {
    this.release();
  }

  /**
   *
   * @param {PointerEvent} e
   */
  handlePointerLeave(e) {
    const { tapdown, tapup } = this.last;

    if (tapdown === null || (tapup !== null && tapdown.date > tapup.date)) {
      this.release();
    }
  }

  /**
   * @private
   * @param {TapEvent['type']} type
   * @param {PointerEvent} event
   * @param {Stat} stat
   */
  emitTap(type, event, stat) {
    this.events.emit('gesture', /** @type {TapEvent} */({
      type,
      event,
      position: stat.positionRel,
      tapCount: this.tapCount,
    }));

    this.last[type] = stat;
  }

  /**
   * @private
   */
  release() {
    const isActive = this.isActive;
    this.reset();
    if (isActive) {
      this.events.emit('release');
    }
  }

  /**
   * @private
   */
  reset() {
    this.tapCount = 0;
    this.clearHold();
    this.last = {
      'tapdown': null,
      'tapup': null,
    };
  }

  /**
   * @private
   */
  get isActive() {
    return this.tapCount !== 0 || this.last.tapdown !== null || this.last.tapup !== null;
  }

  /**
   * @private
   * @param {MouseEvent} e
   * @returns {Stat}
   */
  getStat(e) {
    const bounding = /** @type {HTMLElement} */(e.target).getBoundingClientRect();

    const positionClientPx = {
      x: e.clientX,
      y: e.clientY,
    };

    const positionPx = {
      x: e.screenX || positionClientPx.x,
      y: e.screenY || positionClientPx.y,
    };

    const positionRel = {
      x: (positionClientPx.x - bounding.left) / bounding.width,
      y: (positionClientPx.y - bounding.top) / bounding.height,
    };

    return {
      date: new Date(),
      positionClientPx,
      positionPx,
      positionRel,
    };
  }

  /**
   *
   * @param {Stat | null} last
   * @param {Stat} current
   */
  getContinuation(last, current) {
    if (last === null) {
      return 'tap';
    }

    if (current.date.valueOf() - last.date.valueOf() > this.config.tapMaxDelay) {
      return 'cancel';
    }

    const distanceSq = (
      (current.positionPx.x - last.positionPx.x) ** 2
      + (current.positionPx.y - last.positionPx.y) ** 2
    );

    if (distanceSq <= this.config.tapMaxDistance ** 2) {
      return 'tap';
    }

    if (distanceSq >= this.config.swipeMinDistance ** 2) {
      return 'swipe';
    }

    return 'cancel';
  }

  /**
   * @private
   */
  clearHold() {
    if (this.holdTimeout !== null) {
      clearTimeout(this.holdTimeout);
      this.holdTimeout = null;
    }
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/lib/Keyboard.js":
/*!*******************************************************!*\
  !*** ../Resources/Private/JavaScript/lib/Keyboard.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Modifier": () => (/* binding */ Modifier),
/* harmony export */   "modifiersFromEvent": () => (/* binding */ modifiersFromEvent),
/* harmony export */   "Keybindings$find": () => (/* binding */ Keybindings$find),
/* harmony export */   "Keybinding$splitKeyRanges": () => (/* binding */ Keybinding$splitKeyRanges)
/* harmony export */ });
// @ts-check

/**
 * Keyboard modifier flags for use in a bitset.
 *
 * See typings of `Keybinding`.
 */
const Modifier = {
  None: 0,
  CtrlMeta: 1,
  Shift: 2,
  Alt: 4,
};

/**
 * Extract bitset of active modifier keys from a keyboard event.
 *
 * @param {KeyboardEvent} e
 */
function modifiersFromEvent(e) {
  let mod = Modifier.None;

  if ((e.ctrlKey && e.key !== 'Control') || (e.metaKey && e.key !== 'Meta')) {
    mod |= Modifier.CtrlMeta;
  }

  if (e.shiftKey && e.key !== 'Shift') {
    mod |= Modifier.Shift;
  }

  if (e.altKey && e.key !== 'Alt') {
    mod |= Modifier.Alt;
  }

  return mod;
}

/**
 *
 * @template {string} ScopeT
 * @template {string} ActionT
 * @param {Keybinding<ScopeT, ActionT>[]} keybindings
 * @param {KeyboardEvent} e
 * @param {ScopeT} currentScope
 * @returns {{ keybinding: Keybinding<ScopeT, ActionT>, keyIndex: number } | undefined}
 */
function Keybindings$find(keybindings, e, currentScope) {
  const mod = modifiersFromEvent(e);

  // Ignore casing, e.g. for `S` vs. `Shift + S`.
  const key = e.key.toLowerCase();

  for (const kb of keybindings) {
    const keyIndex = kb.keys.findIndex(k => k.toLowerCase() === key);
    if (keyIndex === -1) {
      continue;
    }

    const isSuitable = (
      (kb.repeat == null || kb.repeat === e.repeat)
      && (kb.scope == null || kb.scope === currentScope)
      && Modifier[kb.mod ?? 'None'] === mod
    );

    if (isSuitable) {
      return {
        keybinding: kb,
        keyIndex,
      };
    }
  }
}

/**
 * @typedef {{ begin: KeyboardEvent['key']; end: KeyboardEvent['key'] }} KeyRange
 */

/**
 *
 * @param {KeyboardEvent['key'][]} keys
 * @returns {KeyRange[]}
 */
function Keybinding$splitKeyRanges(keys) {
  const result = [];

  /** @type {KeyRange | null} */
  let nextRange = null;
  for (const key of keys) {
    if (nextRange === null) {
      nextRange = { begin: key, end: key };
    } else if (key.charCodeAt(0) === nextRange.end.charCodeAt(0) + 1) {
      nextRange.end = key;
    } else {
      result.push(nextRange);
      nextRange = { begin: key, end: key };
    }
  }

  if (nextRange !== null) {
    result.push(nextRange);
  }

  return result;
}


/***/ }),

/***/ "../Resources/Private/JavaScript/lib/TimecodeIndex.js":
/*!************************************************************!*\
  !*** ../Resources/Private/JavaScript/lib/TimecodeIndex.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TimecodeIndex)
/* harmony export */ });
// @ts-check

/**
 * @typedef {{
 *  timecode: number;
 * }} TimecodeIndexObject;
 */

/**
 * @template {TimecodeIndexObject} T
 */
class TimecodeIndex {
  /**
   *
   * @param {readonly T[]} elements
   */
  constructor(elements) {
    /**
     * List of elements sorted by timecode.
     *
     * @protected
     */
    this.elements = elements.slice();
    this.elements.sort((a, b) => a.timecode - b.timecode);

    /**
     * @protected
     * @type {Map<T, number>}
     */
    this.elementToIndex = new Map();

    for (const [i, element] of this.elements.entries()) {
      this.elementToIndex.set(element, i);
    }
  }

  /**
   * Returns the element at the specified {@link index} relative to timecode
   * order, or `undefined` if the index is out of bounds.
   *
   * @param {number} index
   * @returns {T | undefined}
   */
  at(index) {
    return this.elements[index];
  }

  /**
   * Returns the index of the specified {@link element} relative to timecode
   * order, or `undefined` if the element is not found.
   *
   * @param {T} element
   * @returns {number | undefined}
   */
  indexOf(element) {
    return this.elementToIndex.get(element);
  }

  /**
   * Returns the element that is found when advancing {@link offset} steps from
   * {@link element}. The {@link offset} may be negative.
   *
   * @param {T} element
   * @param {number} offset
   * @returns {T | undefined}
   */
  advance(element, offset = 1) {
    const idx = this.indexOf(element);
    if (idx !== undefined) {
      return this.elements[idx + offset];
    }
  }

  /**
   * Returns the element that spans across the specified {@link timecode}.
   *
   * @param {number} timecode
   * @returns {T | undefined}
   */
  timeToElement(timecode) {
    return this.timeToEntry(timecode)?.[1];
  }

  /**
   * Returns the element that spans across the specified {@link timecode}, and
   * its index.
   *
   * @param {number} timecode
   * @returns {[number, T] | undefined}
   */
  timeToEntry(timecode) {
    // As the last element is open-ended, we do a binary search like so:
    // - Reduce until we have at most two candidates left
    // - Return the greater element that works

    // Make sure that the typecasts are safe
    if (this.elements.length === 0) {
      return;
    }

    let lower = 0;
    let upper = this.elements.length - 1;

    while (lower + 1 < upper) {
      const next = Math.floor((lower + upper) / 2);

      if (/** @type {T} */(this.elements[next]).timecode <= timecode) {
        lower = next;
      } else {
        upper = next;
      }
    }

    const upperEl = /** @type {T} */(this.elements[upper]);
    if (upperEl.timecode <= timecode) {
      return [upper, upperEl];
    }

    const lowerEl = /** @type {T} */(this.elements[lower]);
    if (lowerEl.timecode <= timecode) {
      return [lower, lowerEl];
    }
  }

  /**
   * Iterates through the elements (ordered by timecode).
   *
   * @returns {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return this.elements.values();
  }

  /**
   * Iterates through the elements (reversely ordered by timecode).
   *
   * @returns {IterableIterator<T>}
   */
  *reversed() {
    for (let i = this.elements.length - 1; i >= 0; i--) {
      yield /** @type {T} */(this.elements[i]);
    }
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/lib/image/imageFormats.js":
/*!*****************************************************************!*\
  !*** ../Resources/Private/JavaScript/lib/image/imageFormats.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jpeg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jpeg */ "../Resources/Private/JavaScript/lib/image/jpeg/index.js");
/* harmony import */ var _png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./png */ "../Resources/Private/JavaScript/lib/image/png/index.js");
// @ts-check




/**
 * @type {ImageFormatDesc[]}
 */
const imageFormats = [
  {
    mimeType: 'image/png',
    extension: "png",
    label: "PNG",
    parseBinaryString: (s) => {
      return _png__WEBPACK_IMPORTED_MODULE_1__["default"].fromBinaryString(s);
    },
  },
  {
    mimeType: 'image/jpeg',
    extension: "jpg",
    label: "JPEG",
    parseBinaryString: (s) => {
      return _jpeg__WEBPACK_IMPORTED_MODULE_0__["default"].fromBinaryString(s);
    },
  },
  {
    mimeType: 'image/tiff',
    extension: "tiff",
    label: "TIFF",
    parseBinaryString: () => undefined,
  },
];

/* harmony default export */ __webpack_exports__["default"] = (imageFormats);


/***/ }),

/***/ "../Resources/Private/JavaScript/lib/image/jpeg/index.js":
/*!***************************************************************!*\
  !*** ../Resources/Private/JavaScript/lib/image/jpeg/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JPEG)
/* harmony export */ });
/* harmony import */ var piexifjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! piexifjs */ "./node_modules/piexifjs/piexif.js");
/* harmony import */ var piexifjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(piexifjs__WEBPACK_IMPORTED_MODULE_0__);
// @ts-check



/**
 * @typedef {{
 *  '0th': Record<ValueOf<typeof piexifjs.ImageIFD>, string>;
 *  'Exif': Record<ValueOf<typeof piexifjs.ExifIFD>, string>;
 * }} ExifData
 */

/**
 * @implements {ImageFormat}
 */
class JPEG {
  /**
   *
   * @param {string} jpegData Binary string of JPEG data
   */
  constructor(jpegData) {
    /**
     * @private
     * @type {string}
     */
    this.jpeg = jpegData;

    /**
     * @private
     * @type {ExifData}
     */
    this.exif = piexifjs__WEBPACK_IMPORTED_MODULE_0___default().load(jpegData);
  }

  /**
   * Constructs JPEG image from binary string.
   *
   * @param {string} s
   * @returns {JPEG}
   */
  static fromBinaryString(s) {
    return new JPEG(s);
  }

  /**
   * Exports the JPEG image to a binary string.
   *
   * @returns {string}
   */
  toBinaryString() {
    const exifDump = piexifjs__WEBPACK_IMPORTED_MODULE_0___default().dump(this.exif);
    return piexifjs__WEBPACK_IMPORTED_MODULE_0___default().insert(exifDump, this.jpeg);
  }

  /**
   * Add EXIF metadata to the JPEG image.
   *
   * @param {Partial<ImageMetadata>} metadata
   */
  addMetadata(metadata) {
    if (metadata.title) {
      // https://www.exiv2.org/tags.html
      //   "A character string giving the title of the image."
      // TODO: Filter out non-ASCII?
      this.exif['0th'][(piexifjs__WEBPACK_IMPORTED_MODULE_0___default().ImageIFD.ImageDescription)] = metadata.title;
    }

    if (metadata.comment) {
      // TODO: exiftool says "Invalid EXIF text encoding for UserComment"?
      this.exif['Exif'][(piexifjs__WEBPACK_IMPORTED_MODULE_0___default().ExifIFD.UserComment)] = metadata.comment;
    }
  }

  /**
   * @returns {ImageMetadata}
   */
  getMetadata() {
    return {
      title: this.exif['0th'][(piexifjs__WEBPACK_IMPORTED_MODULE_0___default().ImageIFD.ImageDescription)] ?? "",
      comment: this.exif['Exif'][(piexifjs__WEBPACK_IMPORTED_MODULE_0___default().ExifIFD.UserComment)] ?? "",
    };
  }
}


/***/ }),

/***/ "../Resources/Private/JavaScript/lib/image/png/index.js":
/*!**************************************************************!*\
  !*** ../Resources/Private/JavaScript/lib/image/png/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPNG": () => (/* binding */ isPNG),
/* harmony export */   "default": () => (/* binding */ PNG),
/* harmony export */   "itos": () => (/* binding */ itos),
/* harmony export */   "stoi": () => (/* binding */ stoi),
/* harmony export */   "crc32": () => (/* binding */ crc32)
/* harmony export */ });
// @ts-check

const PNG_SIG = String.fromCharCode(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);

/**
 * Check PNG signature
 *
 * @param {string} s
 * @returns {boolean}
 */
function isPNG(s) {
  var sig = s.substr(0, 8);
  return (sig === PNG_SIG);
}

/**
 * @typedef {{ type: 'raw'; rawType: string; rawData: string; }} ChunkInfoRaw
 * @typedef {{ type: 'iTXt'; keyword: string; text: string; }} ChunkInfoItxt
 * @typedef {{ type: 'IEND' }} ChunkInfoIend
 * @typedef {ChunkInfoRaw | ChunkInfoItxt | ChunkInfoIend} ChunkInfo
 *
 * @typedef {{ size: number; type: string; data: string; crc: number; }} Chunk
 */

/**
 * @implements {ImageFormat}
 */
class PNG {
  /**
   * @param {Chunk} headerChunk
   * @param {Chunk[]} chunks
   */
  constructor(headerChunk, chunks) {
    /**
     * @private
     * @type {Chunk}
     */
    this.headerChunk = headerChunk;

    /**
     * @private
     * @type {Chunk[]}
     */
    this.chunks = chunks;
  }

  /**
   *
   * @param {ChunkInfo} info
   */
  static createChunk(info) {
    const c = {};

    switch (info.type) {
      case 'raw':
        c.type = info.rawType;
        c.data = info.rawData;
        break;

      case 'iTXt':
        c.type = 'iTXt';
        // See http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html#C.iTXt
        c.data = `${info.keyword.replace(/\0/g, '')}\0\0\0\0\0${info.text}`;
        break;

      case 'IEND':
        c.type = 'IEND';
        c.data = "";
        break;
    }

    c.size = c.data.length;
    c.crc = crc32(c.type + c.data);

    return c;
  }

  /**
   *
   * @param {ChunkInfo} info
   */
  addChunk(info) {
    const chunk = PNG.createChunk(info);

    switch (chunk.type) {
      // Insert textual chunks immediately after header. While the specification
      // does not impose any restriction, exiftool warns that some readers may
      // ignore textal chunks after IDAT.
      // TODO: preserve / don't invert order of textual chunks
      case 'iTXt':
        this.chunks.unshift(chunk);
        break;

      default:
        throw new Error(`Adding chunk type ${chunk.type} is not supported.`);
    }
  }

  /**
   *
   * @param {string} s
   * @returns {PNG | undefined}
   */
  static fromBinaryString(s) {
    // read signature
    var sig = s.substr(0, 8);
    if (!isPNG(sig)) return;
    s = s.substr(8); // chomp sig
    let headerChunk;
    var chunklist = [];
    // read chunk list
    while (s !== '') {
      var chunk = {};
      // read chunk size
      var size = stoi(s.substr(0, 4));
      if (size < 0) {
        // If the size is negative, the data is likely corrupt, but we'll let
        // the caller decide if any of the returned chunks are usable.
        // We'll move forward in the file with the minimum chunk length (12 bytes).
        size = 0;
      }
      var buf = s.substr(0, size + 12);
      s = s.substr(size + 12); // delete this chunk
      // read chunk data
      chunk.size = size;
      chunk.type = buf.substr(4, 4);
      chunk.data = buf.substr(8, size);
      chunk.crc = stoi(buf.substr(8 + size, 4));

      // Store IHDR separately and ignore IEND chunks to simplify prepending
      // and pushing to the chunks array. We re-insert these chunks on write.
      if (chunk.type === 'IHDR') {
        headerChunk = chunk;
      } else if (chunk.type !== 'IEND') {
        chunklist.push(chunk);
      }
    }

    return headerChunk === undefined
      ? undefined
      : new PNG(headerChunk, chunklist);
  }

  /**
   *
   * @returns {string}
   */
  toBinaryString() {
    var pf = PNG_SIG;

    const appendChunk = (/** @type {Chunk} */ chunk) => {
      // check size
      // chunk.size = chunk.data.length;
      // calc crc
      // var crc_v = crc32(chunk.type + chunk.data);
      //
      var buf = "";
      buf += itos(chunk.size, 4);
      buf += chunk.type;
      buf += chunk.data;
      buf += itos(chunk.crc, 4);
      // console.log("w", chunk.size, chunk.type, chunk.crc >>> 0);
      pf += buf;
    };

    appendChunk(this.headerChunk);

    for (const chunk of this.chunks) {
      appendChunk(chunk);
    }

    appendChunk(PNG.createChunk({ type: 'IEND' }));

    return pf;
  }

  /**
   *
   * @param {Partial<ImageMetadata>} metadata
   */
  addMetadata(metadata) {
    // Predefined keywords in PNG textual chunks:
    //   http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html#C.Anc-text

    for (const [key, value] of Object.entries(metadata)) {
      // It may happen, for example, that a key exists, but is set to undefined
      if (!value) {
        continue;
      }

      const pngKeyword = {
        'title': 'Title',
        'comment': 'Comment',
      }[key];

      if (pngKeyword) {
        this.addChunk({
          type: 'iTXt',
          keyword: pngKeyword,
          text: value,
        });
      }
    }
  }
}

/**
 *
 * @param {number} v
 * @param {number} size
 * @returns {string}
 */
function itos(v, size) {
  var a = [];
  var t = size - 1;
  while (t >= 0) {
    var c = v & 0xFF;
    a[t--] = c;
    v = v >> 8;
  }
  a = a.map(function (v) {
    return String.fromCharCode(v);
  });
  return a.join('');
}

/**
 *
 * @param {string} s
 * @returns {number}
 */
function stoi(s) {
  var v = 0;
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    v = (v << 8) | (c & 0xFF);
  }
  return v;
}

/**
 *
 * @param {string} str
 * @returns {number}
 */
function crc32(str) {
  var hexTable = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
  var crc = 0 ^ (-1);
  for (var i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ /** @type {number} */(hexTable[(crc ^ str.charCodeAt(i)) & 0xFF]);
  }
  return (crc ^ (-1)) >>> 0;
}


/***/ }),

/***/ "../Resources/Private/JavaScript/lib/typoConstants.js":
/*!************************************************************!*\
  !*** ../Resources/Private/JavaScript/lib/typoConstants.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ typoConstants)
/* harmony export */ });
// @ts-check

/**
 * @typedef {string | number | boolean | null | undefined} TypoValue
 */

/**
 * @template Obj
 * @typedef {Partial<Record<keyof Obj, TypoValue>>} TypoConstants
 */

/**
 * Simple utility to parse constants into a typed object.
 *
 * @template {Record<string, TypoValue>} Obj
 * @param {TypoConstants<Obj>} values
 * @param {Obj} defaults
 * @returns {Obj}
 */
function typoConstants(values, defaults) {
  const result = /** @type {Obj} */(Object.assign({}, defaults));

  for (const [key, def] of Object.entries(defaults)) {
    const value = values[key];
    const valueDefaulted = value ?? def;

    switch (typeof def) {
      case 'boolean':
        // @ts-expect-error
        result[key] = valueDefaulted === true || Boolean(Number(valueDefaulted));
        break;

      case 'number':
        // @ts-expect-error
        result[key] = Number(valueDefaulted);
        break;

      case 'string':
        // @ts-expect-error
        result[key] = String(valueDefaulted);
        break;
    }
  }

  return result;
}


/***/ }),

/***/ "../Resources/Private/JavaScript/lib/util.js":
/*!***************************************************!*\
  !*** ../Resources/Private/JavaScript/lib/util.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "fillPlaceholders": () => (/* binding */ fillPlaceholders),
/* harmony export */   "zeroPad": () => (/* binding */ zeroPad),
/* harmony export */   "dataUrlMime": () => (/* binding */ dataUrlMime),
/* harmony export */   "canvasToBlob": () => (/* binding */ canvasToBlob),
/* harmony export */   "blobToBinaryString": () => (/* binding */ blobToBinaryString),
/* harmony export */   "blobToImage": () => (/* binding */ blobToImage),
/* harmony export */   "loadImage": () => (/* binding */ loadImage),
/* harmony export */   "download": () => (/* binding */ download),
/* harmony export */   "withObjectUrl": () => (/* binding */ withObjectUrl),
/* harmony export */   "binaryStringToArrayBuffer": () => (/* binding */ binaryStringToArrayBuffer),
/* harmony export */   "cancelAction": () => (/* binding */ cancelAction),
/* harmony export */   "disableDragging": () => (/* binding */ disableDragging),
/* harmony export */   "domJoin": () => (/* binding */ domJoin),
/* harmony export */   "e": () => (/* binding */ e),
/* harmony export */   "setElementClass": () => (/* binding */ setElementClass),
/* harmony export */   "sanitizeBasename": () => (/* binding */ sanitizeBasename),
/* harmony export */   "textToHtml": () => (/* binding */ textToHtml),
/* harmony export */   "filterNonNull": () => (/* binding */ filterNonNull)
/* harmony export */ });
// @ts-check

/**
 * Clamps {@link value} into the closed interval [{@link min}, {@link max}].
 *
 * @param {number} value
 * @param {[number, number]} range
 * @returns {number}
 */
function clamp(value, [min, max]) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

/**
 *
 * @private
 * @param {string} template
 * @param {Record<string, string | undefined>} values
 * @returns {string}
 */
function fillPlaceholders(template, values) {
  let result = template;

  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) {
      result = result.split(`{${key}}`).join(value);
    }
  }

  return result;
}

/**
 * Zero-pad {@link value} to at least {@link length} digits.
 *
 * @param {number} value
 * @param {number} length
 * @returns {string}
 */
function zeroPad(value, length) {
  return value.toString().padStart(length, '0');
}

/**
 * Extracts the mime type from a data URL.
 *
 * @param {string} dataUrl
 * @returns {string | undefined}
 */
function dataUrlMime(dataUrl) {
  return dataUrl.match(/data:(.*);/)?.[1];
}

/**
 * Creates a `Blob` representing the image contained in the canvas.
 *
 * This is a promisification of `canvas.toBlob(type, quality)`.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {string} mimeType
 * @param {number | undefined} quality JPEG or WebP image quality in range
 * `[0, 1]`.
 * @returns {Promise<Blob>}
 */
function canvasToBlob(canvas, mimeType, quality = undefined) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject();
      }
    }, mimeType, quality);
  });
}

/**
 *
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
function blobToBinaryString(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(null);
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsBinaryString(blob);
  });
}

/**
 * Loads a `Blob` that contains an image into an `HTMLImageElement`.
 *
 * @param {Blob} blob
 * @returns {Promise<HTMLImageElement>}
 */
function blobToImage(blob) {
  return withObjectUrl(blob, loadImage);
}

/**
 * Loads an image from {@link src} into an `HTMLImageElement`.
 *
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
async function loadImage(src) {
  const image = e('img');
  image.decoding = 'async';
  image.src = src;
  await image.decode();
  return image;
}

/**
 * Downloads a file from a `Blob` or from a URL.
 *
 * @param {Blob | string} obj
 * @param {string} filename Name of the target file.
 */
function download(obj, filename) {
  if (typeof obj === 'string') {
    e("a", { href: obj, download: filename }).click();
  } else {
    withObjectUrl(obj, (objectUrl) => {
      download(objectUrl, filename);
    });
  }
}

/**
 * Calls {@link callback} with a temporary object URL to {@link obj}.
 *
 * The object URL is automatically resolved once the callback returns, or, if
 * the callback returns a promise, once that promise resolves.
 *
 * @template T
 * @param {Blob | MediaSource} obj
 * @param {(objectUrl: string) => T} callback
 * @returns {T}
 */
function withObjectUrl(obj, callback) {
  // Outside of try-catch because no cleanup needed if this throws
  const objectUrl = URL.createObjectURL(obj);

  let result;

  try {
    result = callback(objectUrl);
  } catch (e) {
    URL.revokeObjectURL(objectUrl);
    throw e;
  }

  if (result instanceof Promise) {
    const resultPromise = result;

    // @ts-expect-error
    // - The typing isn't exact because `T` could be extending `Promise` (TODO).
    // - Simply doing `result.then().catch()` or `result.finally()` without
    //   creating a new Promise wouldn't suffice, as that would alter behavior
    //   w.r.t. unhandled rejections (TODO: demnstrate in test case?).
    return new Promise((resolve, reject) => {
      resultPromise
        .then((value) => {
          URL.revokeObjectURL(objectUrl);
          resolve(value);
        })
        .catch((e) => {
          URL.revokeObjectURL(objectUrl);
          reject(e);
        });
    });
  } else {
    URL.revokeObjectURL(objectUrl);
    return result;
  }
}

/**
 *
 * @param {string} s
 * @returns {ArrayBuffer}
 */
function binaryStringToArrayBuffer(s) {
  const buffer = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) {
    buffer[i] = s.charCodeAt(i);
  }
  return buffer;
}

/**
 * May be used as event handlers in situations where the default action should
 * not be triggered (for example, to prevent dragging or submitting a form).
 *
 * @param {Event} e
 * @returns {boolean}
 */
function cancelAction(e) {
  e.preventDefault();
  return false;
}

/**
 * Ensures that an element may not be dragged.
 *
 * @param {HTMLElement} e
 */
function disableDragging(e) {
  e.draggable = false;
  e.ondragstart = cancelAction;
}

/**
 * Return a new array derived from {@link array} by inserting copies of
 * {@link elements} between any two consecutive elements.
 *
 * @param {(string | HTMLElement)[]} array
 * @param {(string | HTMLElement) | (string | HTMLElement)[]} elements
 * @returns {(string | HTMLElement)[]}
 */
function domJoin(array, elements) {
  const result = [];

  const elementsArr = Array.isArray(elements) ? elements : [elements];

  for (let i = 0; i < array.length; i++) {
    if (i > 0) {
      for (const element of elementsArr) {
        const elementClone = typeof element === 'string'
          ? element
          : /** @type {HTMLElement} */(element.cloneNode(true));

        result.push(elementClone);
      }
    }

    result.push(/** @type {string | HTMLElement} */(array[i]));
  }

  return result;
}

/**
 * Creates a nested HTML element.
 *
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tag
 * @param {Partial<HTMLElementTagNameMap[K]> & Partial<EventListeners<'$'>>} attrs
 * @param {(HTMLElement | string | null | undefined | boolean)[]} children
 * @returns {HTMLElementTagNameMap[K]}
 */
function e(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (key[0] === '$') {
      // @ts-expect-error: `Object.entries()` is too coarse-grained
      element.addEventListener(key.substring(1), value);
    } else {
      // @ts-expect-error: `Object.entries()` is too coarse-grained
      element[key] = value;
    }
  }

  for (const child of children) {
    if (typeof child === 'string') {
      element.append(
        document.createTextNode(child)
      );
    } else if (child instanceof HTMLElement) {
      element.append(child);
    }
  }

  return element;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 * @param {boolean} hasClass
 */
function setElementClass(element, className, hasClass) {
  if (hasClass) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

/**
 * Sanitizes {@link str} for use in a file name.
 *
 * @param {string} str
 * @returns {string}
 */
function sanitizeBasename(str) {
  const result = str.replace(/[^a-zA-Z0-9()]+/g, "_");
  return result.length > 0 ? result : "_";
}

/**
 * Returns HTML-encoded string that represents {@link text}.
 *
 * @param {string} text
 * @returns {string}
 */
function textToHtml(text) {
  return e('span', { innerText: text }).innerHTML;
}

/**
 *
 * @template T
 * @param {(T | null)[]} arr
 * @returns {T[]}
 */
function filterNonNull(arr) {
  return arr.filter(
    /** @type {(x: T | null) => x is T} */(x => x !== null)
  );
}


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = jQuery;

/***/ }),

/***/ "../Resources/Private/JavaScript/SlubMediaPlayer/keybindings.json":
/*!************************************************************************!*\
  !*** ../Resources/Private/JavaScript/SlubMediaPlayer/keybindings.json ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"keys":["Escape"],"action":"cancel","kind":"other","order":100},{"keys":["F1"],"repeat":false,"action":"modal.help.toggle","kind":"other","order":99},{"keys":["b"],"scope":"player","action":"modal.bookmark.open","kind":"other","order":30},{"keys":["s"],"scope":"player","action":"modal.screenshot.open","kind":"other","order":31},{"keys":["s"],"mod":"Shift","scope":"player","action":"modal.screenshot.snap","kind":"other","order":32},{"keys":["f"],"repeat":false,"scope":"player","action":"fullscreen.toggle","kind":"player","order":20},{"keys":["t"],"repeat":false,"scope":"player","action":"theater.toggle","kind":"player","order":21},{"keys":[" "],"repeat":false,"scope":"player","action":"playback.toggle","kind":"player","order":0},{"keys":["m"],"repeat":false,"scope":"player","action":"playback.volume.mute.toggle","kind":"player","order":12},{"keys":["ArrowUp"],"scope":"player","action":"playback.volume.inc","kind":"player","order":10},{"keys":["ArrowDown"],"scope":"player","action":"playback.volume.dec","kind":"player","order":11},{"keys":["c"],"repeat":false,"scope":"player","action":"playback.captions.toggle","kind":"player","order":13},{"keys":["ArrowLeft"],"repeat":false,"scope":"player","action":"navigate.rewind","kind":"navigate","order":0},{"keys":["ArrowRight"],"repeat":false,"scope":"player","action":"navigate.seek","kind":"navigate","order":1},{"keys":["ArrowLeft"],"repeat":true,"scope":"player","action":"navigate.continuous-rewind","kind":"navigate","order":2},{"keys":["ArrowRight"],"repeat":true,"scope":"player","action":"navigate.continuous-seek","kind":"navigate","order":3},{"mod":"CtrlMeta","keys":["ArrowLeft"],"scope":"player","action":"navigate.chapter.prev","kind":"navigate","order":10},{"mod":"CtrlMeta","keys":["ArrowRight"],"scope":"player","action":"navigate.chapter.next","kind":"navigate","order":11},{"keys":["0","1","2","3","4","5","6","7","8","9"],"scope":"player","action":"navigate.position.percental","kind":"navigate","order":25},{"mod":"Shift","keys":["ArrowLeft"],"scope":"player","action":"navigate.frame.prev","kind":"navigate","order":20},{"mod":"Shift","keys":["ArrowRight"],"scope":"player","action":"navigate.frame.next","kind":"navigate","order":21},{"keys":[","],"scope":"player","action":"navigate.frame.prev","kind":"navigate","order":20},{"keys":["."],"scope":"player","action":"navigate.frame.next","kind":"navigate","order":21},{"keys":["Shift"],"scope":"player","action":"navigate.thumbnails.snap","kind":"navigate","order":30,"keydown":true,"keyup":true}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"SxndPlayerApp": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkslub_web_sachsendigital"] = self["webpackChunkslub_web_sachsendigital"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["SxndPlayerVendor"], () => (__webpack_require__("../Resources/Private/JavaScript/SlubMediaPlayer/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=SxndPlayerApp.js.map