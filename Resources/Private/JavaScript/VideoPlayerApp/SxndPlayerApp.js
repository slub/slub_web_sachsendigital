// @ts-check

import Gestures from '../lib/Gestures';
import { e } from '../lib/util';
import { Keybindings$find } from '../lib/Keyboard';
import typoConstants from '../lib/typoConstants';
import {
  Chapters,
  ControlPanelButton,
  SachsenShakaPlayer,
} from '../VideoPlayer';

import Modals from './lib/Modals';
import { BookmarkModal, HelpModal, ScreenshotModal } from './modals';
import Environment from './Environment';

import '../../Less/VideoPlayer/VideoPlayerApp.less';

import keybindings from './keybindings.json';

/**
 * @typedef {'player' | 'modal' | 'input'} KeyboardScope Currently active
 * target/scope for mapping keybindings.
 *
 * @typedef {HTMLElement & { sxndTimecode: number }} ChapterLink
 *
 * @typedef {{
 *  help: HelpModal;
 *  bookmark: BookmarkModal;
 *  screenshot: ScreenshotModal;
 * }} AppModals
 */

export default class SxndPlayerApp {
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
    this.playerMount = e('div');
    this.container.append(this.playerMount);
    /** @private */
    this.videoInfo = videoInfo;
    /** @private */
    this.config = config;
    /** @private @type {Keybinding<KeyboardScope, keyof SxndPlayerApp['actions']>[]} */
    this.keybindings = /** @type {any} */(keybindings);

    /** @private @type {AppConstants} */
    this.constants = typoConstants(config.constants ?? {}, {
      prevChapterTolerance: 5,
      volumeStep: 0.05,
      seekStep: 10,
      trickPlayFactor: 4,
      forceLandscapeOnFullscreen: true,
    });

    /** @private */
    this.handlers = {
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
      onClickChapterLink: this.onClickChapterLink.bind(this),
      onPlay: this.onPlay.bind(this),
      onCloseModal: this.onCloseModal.bind(this),
    };

    /** @private */
    this.env = new Environment();
    this.env.setLang(config.lang);

    /** @private */
    this.sxndPlayer = new SachsenShakaPlayer(this.env);

    /** @private @type {ChapterLink[]} */
    this.chapterLinks = [];

    /** @private */
    this.sxnd = {
      /**
       * The object that has caused current pause state, if any.
       *
       * @type {ValueOf<AppModals> | null}
       */
      pausedOn: null,
    };

    /** @private */
    this.modals = Modals({
      help: new HelpModal(this.container, this.env, {
        constants: {
          ...this.constants,
          // TODO: Refactor
          forceLandscapeOnFullscreen: Number(this.constants.forceLandscapeOnFullscreen),
        },
        keybindings: this.keybindings,
      }),
      bookmark: new BookmarkModal(this.container, this.env, {
        shareButtons: this.config.shareButtons,
      }),
      screenshot: new ScreenshotModal(this.container, this.env, {
        keybindings: this.keybindings,
        screenshotFilenameTemplate: this.config.screenshotFilenameTemplate,
      }),
    });

    /** @private */
    this.actions = {
      'cancel': () => {
        if (this.modals.hasOpen()) {
          this.modals.closeNext();
        } else if (this.sxndPlayer.isThumbnailPreviewOpen()) {
          this.sxndPlayer.endSeek();
        } else if (this.sxndPlayer.anySettingsMenusAreOpen()) {
          this.sxndPlayer.hideSettingsMenus();
        }
      },
      'modal.help.open': () => {
        this.openModal(this.modals.help);
      },
      'modal.help.toggle': () => {
        this.sxndPlayer.endSeek();
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
        this.sxndPlayer.endSeek();
        this.toggleFullScreen();
      },
      'theater.toggle': () => {
        this.sxndPlayer.endSeek();

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
        if (this.sxndPlayer.paused) {
          this.sxndPlayer.play();
        } else {
          this.sxndPlayer.pause();
        }
      },
      'playback.volume.mute.toggle': () => {
        this.sxndPlayer.muted = !this.sxndPlayer.muted;
      },
      'playback.volume.inc': () => {
        this.sxndPlayer.volume = this.sxndPlayer.volume + this.constants.volumeStep;
      },
      'playback.volume.dec': () => {
        this.sxndPlayer.volume = this.sxndPlayer.volume - this.constants.volumeStep;
      },
      'playback.captions.toggle': () => {
        this.sxndPlayer.showCaptions = !this.sxndPlayer.showCaptions;
      },
      'navigate.rewind': () => {
        this.sxndPlayer.skipSeconds(-this.constants.seekStep);
      },
      'navigate.seek': () => {
        this.sxndPlayer.skipSeconds(+this.constants.seekStep);
      },
      'navigate.continuous-rewind': () => {
        this.sxndPlayer.ensureTrickPlay(-this.constants.trickPlayFactor);
      },
      'navigate.continuous-seek': () => {
        this.sxndPlayer.ensureTrickPlay(this.constants.trickPlayFactor);
      },
      'navigate.chapter.prev': () => {
        this.sxndPlayer.prevChapter();
      },
      'navigate.chapter.next': () => {
        this.sxndPlayer.nextChapter();
      },
      'navigate.frame.prev': () => {
        this.sxndPlayer.getVifa()?.seekBackward(1);
      },
      'navigate.frame.next': () => {
        this.sxndPlayer.getVifa()?.seekForward(1);
      },
      'navigate.position.percental': (
        /** @type {Keybinding<any, any>} */ kb,
        /** @type {number} */ keyIndex
      ) => {
        if (0 <= keyIndex && keyIndex < kb.keys.length) {
          // Implies kb.keys.length > 0

          const relative = keyIndex / kb.keys.length;
          const absolute = relative * this.sxndPlayer.getVideo().duration;

          this.sxndPlayer.seekTo(absolute);
        }
      },
      'navigate.thumbnails.snap': (
        /** @type {Keybinding<any, any>} */ _kb,
        /** @type {number} */ _keyIndex,
        /** @type {KeyEventMode} */ mode
      ) => {
        this.sxndPlayer.setThumbnailSnap(mode === 'down');
      },
    };

    this.modals.on('closed', this.handlers.onCloseModal);
    this.sxndPlayer.getVideo().addEventListener('play', this.handlers.onPlay);

    this.load();
  }

  /**
   * Prints global error message into {@link container} and quits.
   *
   * @private
   * @param {string} langKey
   */
  failWithError(langKey) {
    this.sxndPlayer.unmount();

    const errorBox = e('div', {
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
      source => this.sxndPlayer.supportsMimeType(source.mimeType)
    );

    if (videoSources.length === 0) {
      this.failWithError('error.playback-not-supported');
      return;
    }

    document.querySelectorAll("a[data-timecode], .tx-dlf-tableofcontents a").forEach(el => {
      const link = /** @type {HTMLAnchorElement} */(el);
      const timecode = this.getLinkTimecode(link);
      if (timecode !== null) {
        const sxndEl = /** @type {ChapterLink} */(el);
        sxndEl.sxndTimecode = timecode;
        sxndEl.addEventListener('click', this.handlers.onClickChapterLink);
        this.chapterLinks.push(sxndEl);
      }
    });

    const chapterInfos = this.videoInfo.chapters.map(chapter => ({
      ...chapter,
      timecode: parseInt(chapter.timecode, 10),
    }));
    const chapters = new Chapters(chapterInfos);

    const startTime = this.getStartTime(chapters);

    this.sxndPlayer.addControlElement(
      ControlPanelButton.register(this.env, {
        className: "sxnd-screenshot-button",
        material_icon: 'photo_camera',
        title: this.env.t('control.screenshot.tooltip'),
        onClick: this.actions['modal.screenshot.open'],
      }),
      ControlPanelButton.register(this.env, {
        className: "sxnd-bookmark-button",
        material_icon: 'bookmark_border',
        title: this.env.t('control.bookmark.tooltip'),
        onClick: this.actions['modal.bookmark.open'],
      }),
      'fullscreen',
      ControlPanelButton.register(this.env, {
        className: "sxnd-help-button",
        material_icon: 'info_outline',
        title: this.env.t('control.help.tooltip'),
        onClick: this.actions['modal.help.open'],
      })
    );
    this.sxndPlayer.setConstants(this.constants);
    this.sxndPlayer.setLocale(this.config.lang.twoLetterIsoCode);
    if (this.videoInfo.url.poster !== undefined) {
      this.sxndPlayer.setPoster(this.videoInfo.url.poster);
    }
    this.sxndPlayer.setChapters(chapters);
    this.sxndPlayer.mount(this.playerMount);

    // Try loading video until one of the sources works.
    let loadedSource;
    for (const source of videoSources) {
      try {
        await this.sxndPlayer.loadManifest(source, startTime);
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

    // TODO: Move actions to SachsenShakaPlayer, then also move gesture detection there

    const g = new Gestures();
    g.register(this.sxndPlayer.getContainer());

    g.on('gesture', (e) => {
      if (e.event.clientY >= this.sxndPlayer.userArea.bottom) {
        return;
      }

      switch (e.type) {
        case 'tapup':
          if (e.event.pointerType === 'mouse') {
            if (this.sxndPlayer.isUserAreaEvent(e.event)) {
              if (e.tapCount <= 2) {
                this.actions['playback.toggle']();
              }

              if (e.tapCount === 2) {
                this.actions['fullscreen.toggle']();
              }
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
            this.sxndPlayer.beginRelativeSeek(e.event.clientX);
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
      this.sxndPlayer.endSeek();
      this.sxndPlayer.cancelTrickPlay();
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
    this.sxndPlayer.cancelTrickPlay();
  }

  /**
   * @private
   * @param {KeyboardEvent} e
   * @param {KeyEventMode} mode
   */
  handleKey(e, mode) {
    const curKbScope = this.getKeyboardScope();
    const result = Keybindings$find(this.keybindings, e, curKbScope);

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

    this.sxndPlayer.play();
    this.sxndPlayer.seekTo(target.sxndTimecode);
  }

  /**
   * @private
   */
  onPlay() {
    this.sxnd.pausedOn = null;
  }

  /**
   * @private
   * @param {any} obj
   */
  pauseOn(obj) {
    if (this.sxnd.pausedOn === null && !this.sxndPlayer.paused) {
      this.sxnd.pausedOn = obj;
      this.sxndPlayer.pause();
    }
  }

  /**
   * @private
   * @param {any} obj
   */
  resumeOn(obj) {
    if (this.sxnd.pausedOn === obj) {
      this.sxndPlayer.play();
      this.sxnd.pausedOn = null;
    }
  }

  /**
   * @private
   * @param {ValueOf<AppModals>} modal
   */
  onCloseModal(modal) {
    this.resumeOn(modal);
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
    if (!this.sxndPlayer.hasCurrentData) {
      return;
    }

    const modal = this.modals.bookmark
      .setTimecode(this.sxndPlayer.displayTime)
      .setFps(this.sxndPlayer.getFps() ?? 0);

    this.openModal(modal, /* pause= */ true);
  }

  /**
   * @returns {ScreenshotModal | null}
   */
  prepareScreenshot() {
    // Don't do screenshot if there isn't yet an image to be displayed
    if (!this.sxndPlayer.hasCurrentData) {
      return null;
    }

    return (
      this.modals.screenshot
        .setVideo(this.sxndPlayer.getVideo())
        .setMetadata(this.videoInfo.metadata)
        .setFps(this.sxndPlayer.getFps())
        .setTimecode(this.sxndPlayer.displayTime)
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
      this.pauseOn(modal);
    }

    this.sxndPlayer.endSeek();
    modal.open();
  }
}
