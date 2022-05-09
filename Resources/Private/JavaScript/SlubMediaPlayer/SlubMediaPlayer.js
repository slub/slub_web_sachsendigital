// @ts-check

import { e } from '../lib/util';
import { Keybindings$find } from '../lib/Keyboard';
import typoConstants from '../lib/typoConstants';
import {
  Chapters,
  ControlPanelButton,
  DlfMediaPlayer,
  FullScreenButton,
} from '../DlfMediaPlayer';
import ShakaFrontend from '../DlfMediaPlayer/frontend/ShakaFrontend';

import Modals from './lib/Modals';
import { BookmarkModal, HelpModal, ScreenshotModal } from './modals';
import Environment from './Environment';

import keybindings from './keybindings.json';

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

export default class SlubMediaPlayer {
  /**
   *
   * @param {HTMLElement} container
   * @param {HTMLElement} fullscreenElement
   * @param {VideoInfo} videoInfo
   * @param {AppConfig} config
   */
  constructor(container, fullscreenElement, videoInfo, config) {
    /** @private */
    this.container = container;
    /** @private */
    this.fullscreenElement = fullscreenElement;
    /** @private */
    this.playerMount = e('div');
    this.container.append(this.playerMount);
    /** @private */
    this.videoInfo = videoInfo;
    /** @private */
    this.config = config;
    /** @private @type {Keybinding<KeyboardScope, keyof SlubMediaPlayer['actions']>[]} */
    this.keybindings = /** @type {any} */(keybindings);

    /** @private @type {AppConstants} */
    this.constants = typoConstants(config.constants ?? {}, {
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
    this.env = new Environment();
    this.env.setLang(config.lang);

    /** @private */
    this.dlfPlayer = new DlfMediaPlayer(this.env);
    this.dlfPlayer.parseConstants(config.constants ?? {});

    /** @private @type {ChapterLink[]} */
    this.chapterLinks = [];

    /** @private */
    this.modals = null;

    /** @private */
    this.dlfPlayer.actions['fullscreen.toggle'] = () => {
      this.dlfPlayer.ui.seekBar?.endSeek();
      this.toggleFullScreen();
    };
    this.actions = Object.assign({}, this.dlfPlayer.actions, {
      'cancel': () => {
        if (this.modals?.hasOpen()) {
          this.modals.closeNext();
        } else {
          this.dlfPlayer.ui.handleEscape();
        }
      },
      'modal.help.open': () => {
        this.openModal(this.modals?.help);
      },
      'modal.help.toggle': () => {
        if (this.modals !== null) {
          this.dlfPlayer.ui.seekBar?.endSeek();
          this.modals.toggleExclusive(this.modals.help);
        }
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
      'theater.toggle': () => {
        this.dlfPlayer.ui.seekBar?.endSeek();

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
    });

    this.createModals();
    this.load();
  }

  createModals() {
    /** @private */
    this.modals = Modals({
      help: new HelpModal(this.fullscreenElement, this.env, {
        constants: {
          ...this.constants,
          ...this.dlfPlayer.getConstants(),
          // TODO: Refactor
          forceLandscapeOnFullscreen: Number(this.constants.forceLandscapeOnFullscreen),
        },
        keybindings: this.keybindings,
      }),
      bookmark: new BookmarkModal(this.fullscreenElement, this.env, {
        shareButtons: this.config.shareButtons,
      }),
      screenshot: new ScreenshotModal(this.fullscreenElement, this.env, {
        keybindings: this.keybindings,
        screnshotCaptions: this.config.screenshotCaptions ?? [],
        constants: this.config.constants ?? {},
      }),
    });

    this.modals.on('closed', this.handlers.onCloseModal);
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
    const chapters = new Chapters(chapterInfos);

    const startTime = this.getStartTime(chapters);

    // TODO: How to deal with this check?
    if (this.dlfPlayer.ui instanceof ShakaFrontend) {
      this.dlfPlayer.ui.addControlElement(
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
        FullScreenButton.register(this.env, {
          onClick: this.actions['fullscreen.toggle'],
        }),
        ControlPanelButton.register(this.env, {
          className: "sxnd-help-button",
          material_icon: 'info_outline',
          title: this.env.t('control.help.tooltip'),
          onClick: this.actions['modal.help.open'],
        })
      );
    }
    this.dlfPlayer.ui.updatePlayerProperties({
      locale: this.config.lang.twoLetterIsoCode,
    });
    this.dlfPlayer.ui.updateMediaProperties({
      poster: this.videoInfo.url.poster,
    });
    this.dlfPlayer.setChapters(chapters);
    this.dlfPlayer.setStartTime(startTime ?? null);
    this.dlfPlayer.setSources(this.videoInfo.sources);
    this.dlfPlayer.mount(this.playerMount);

    const hasLoadedVideo = await this.dlfPlayer.load();
    if (!hasLoadedVideo) {
      return;
    }

    this.modals?.resize();

    this.registerEventHandlers();
  }

  registerEventHandlers() {
    document.addEventListener('keydown', this.handlers.onKeyDown, { capture: true });
    document.addEventListener('keyup', this.handlers.onKeyUp, { capture: true });
  }

  /**
   * @private
   * @returns {KeyboardScope}
   */
  getKeyboardScope() {
    if (this.modals?.hasOpen()) {
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
    // Hack against Shaka reacting to Escape key to close overflow menu;
    // we do this ourselves. (TODO: Find a better solution)
    if (e.key === 'Escape') {
      e.stopImmediatePropagation();
    }

    // TODO: Remove
    if (this.dlfPlayer.ui instanceof ShakaFrontend) {
      if (e.key === 'F2') {
        this.dlfPlayer.ui.updatePlayerProperties({ mode: 'audio' });
        this.modals?.resize();
      } else if (e.key === 'F4') {
        this.dlfPlayer.ui.updatePlayerProperties({ mode: 'video' });
        this.modals?.resize();
      }
    }

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

    this.dlfPlayer.media.play();
    this.dlfPlayer.seekTo(target.dlfTimecode);
  }

  /**
   * @private
   * @param {ValueOf<AppModals>} modal
   */
  onCloseModal(modal) {
    this.dlfPlayer.resumeOn(modal);
  }

  async toggleFullScreen() {
    // We use this instead of Shaka's toggleFullScreen so that we don't need to
    // append the app elements (modals) to the player container.
    this.env.toggleFullScreen(this.fullscreenElement,
      this.constants.forceLandscapeOnFullscreen);
  }

  showBookmarkUrl() {
    // Don't show modal if we can't expect the current time to be properly
    // initialized
    if (!this.dlfPlayer.hasCurrentData) {
      return;
    }

    const modal = this.modals?.bookmark
      .setTimecode(this.dlfPlayer.displayTime)
      .setFps(this.dlfPlayer.getFps() ?? 0);

    this.openModal(modal, /* pause= */ true);
  }

  /**
   * @returns {ScreenshotModal | undefined}
   */
  prepareScreenshot() {
    // Don't do screenshot if there isn't yet an image to be displayed
    if (!this.dlfPlayer.hasCurrentData) {
      return;
    }

    return (
      this.modals?.screenshot
        .setVideo(this.dlfPlayer.media)
        .setMetadata(this.videoInfo.metadata)
        .setFps(this.dlfPlayer.getFps())
        .setTimecode(this.dlfPlayer.displayTime)
    );
  }

  showScreenshot() {
    const modal = this.prepareScreenshot();
    this.openModal(modal, /* pause= */ true);
  }

  snapScreenshot() {
    const modal = this.prepareScreenshot();
    modal?.snap();
  }

  /**
   * @private
   * @param {ValueOf<AppModals>=} modal
   * @param {boolean} pause
   */
  openModal(modal, pause = false) {
    if (modal == null) {
      return;
    }

    if (pause) {
      this.dlfPlayer.pauseOn(modal);
    }

    this.dlfPlayer.ui.seekBar?.endSeek();
    modal.open();
  }
}
