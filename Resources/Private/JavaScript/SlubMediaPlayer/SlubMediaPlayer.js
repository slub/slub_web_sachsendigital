// @ts-check

import { e } from '../lib/util';
import { Keybindings$find } from '../lib/Keyboard';
import typoConstants from '../lib/typoConstants';
import {
  action,
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

export default class SlubMediaPlayer extends DlfMediaPlayer {
  /**
   *
   * @param {HTMLElement} container
   * @param {HTMLElement} fullscreenElement
   * @param {VideoInfo} videoInfo
   * @param {AppConfig} config
   */
  constructor(container, fullscreenElement, videoInfo, config) {
    const env = new Environment();
    env.setLang(config.lang);

    super(env);

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

    this.constants = /** @type {any} */(
      typoConstants(config.constants ?? {}, this.constants)
    );

    /** @private */
    this.handlers = {
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
      onClickChapterLink: this.onClickChapterLink.bind(this),
      onCloseModal: this.onCloseModal.bind(this),
    };

    this.setPlayerMode(videoInfo.mode ?? 'auto', videoInfo.fallbackMode ?? 'audio');

    /** @private @type {ChapterLink[]} */
    this.chapterLinks = [];

    /** @private */
    this.modals = null;

    this.createModals();
  }

  createModals() {
    /** @private */
    this.modals = Modals({
      help: new HelpModal(this.fullscreenElement, this.env, {
        constants: {
          ...this.constants,
          // TODO: Refactor
          forceLandscapeOnFullscreen: Number(this.constants.forceLandscapeOnFullscreen),
        },
        keybindings: this.keybindings,
        actionIsAvailable: (actionKey) => {
          // @ts-expect-error
          const action = this.actions[actionKey];
          return action !== undefined && action.isAvailable();
        },
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
   * @override
   */
  constantDefaults() {
    return {
      ...super.constantDefaults(),
      forceLandscapeOnFullscreen: true,
    };
  }

  /**
   * @override
   */
  getActions() {
    return {
      ...super.getActions(),
      'cancel': action(() => {
        if (this.modals?.hasOpen()) {
          this.modals.closeNext();
        } else {
          this.ui.handleEscape();
        }
      }),
      'modal.help.open': action(() => {
        this.openModal(this.modals?.help);
      }),
      'modal.help.toggle': action(() => {
        if (this.modals !== null) {
          this.ui.seekBar?.endSeek();
          this.modals.toggleExclusive(this.modals.help);
        }
      }),
      'modal.bookmark.open': action(() => {
        this.showBookmarkUrl();
      }),
      'modal.screenshot.open': action({
        isAvailable: () => {
          return !this.isAudioOnly();
        },
        execute: () => {
          this.showScreenshot();
        },
      }),
      'modal.screenshot.snap': action({
        isAvailable: () => {
          return !this.isAudioOnly();
        },
        execute: () => {
          this.snapScreenshot();
        },
      }),
      'theater.toggle': action(() => {
        this.ui.seekBar?.endSeek();

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
      }),
    };
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
   * @override
   * @returns {Promise<boolean>}
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
    if (this.ui instanceof ShakaFrontend) {
      this.ui.addControlElement(
        ControlPanelButton.register(this.env, {
          className: "sxnd-screenshot-button",
          material_icon: 'photo_camera',
          title: this.env.t('control.screenshot.tooltip'),
          onClickAction: this.actions['modal.screenshot.open'],
        }),
        ControlPanelButton.register(this.env, {
          className: "sxnd-bookmark-button",
          material_icon: 'bookmark_border',
          title: this.env.t('control.bookmark.tooltip'),
          onClickAction: this.actions['modal.bookmark.open'],
        }),
        FullScreenButton.register(this.env, {
          onClickAction: this.actions['fullscreen.toggle'],
        }),
        ControlPanelButton.register(this.env, {
          className: "sxnd-help-button",
          material_icon: 'info_outline',
          title: this.env.t('control.help.tooltip'),
          onClickAction: this.actions['modal.help.open'],
        })
      );
    }
    this.ui.updatePlayerProperties({
      locale: this.config.lang.twoLetterIsoCode,
    });
    this.ui.updateMediaProperties({
      poster: this.videoInfo.url.poster,
    });
    this.setChapters(chapters);
    this.setStartTime(startTime ?? null);
    this.setSources(this.videoInfo.sources);
    this.mount(this.playerMount);

    const hasLoadedVideo = await super.load();
    if (!hasLoadedVideo) {
      return false;
    }

    this.modals?.resize();

    document.addEventListener('keydown', this.handlers.onKeyDown, { capture: true });
    document.addEventListener('keyup', this.handlers.onKeyUp, { capture: true });

    return true;
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
    if (this.ui instanceof ShakaFrontend) {
      if (e.key === 'F2') {
        this.ui.updatePlayerProperties({ mode: 'audio' });
        this.modals?.resize();
      } else if (e.key === 'F4') {
        this.ui.updatePlayerProperties({ mode: 'video' });
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
    this.cancelTrickPlay();
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

      const action = this.actions[keybinding.action];

      if (shouldHandle && action !== undefined && action.isAvailable()) {
        action.execute(keybinding, keyIndex, mode);
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

    this.media.play();
    this.seekTo(target.dlfTimecode);
  }

  /**
   * @private
   * @param {ValueOf<AppModals>} modal
   */
  onCloseModal(modal) {
    this.resumeOn(modal);
  }

  /**
   * @override
   */
  async toggleFullScreen() {
    // We use this instead of Shaka's toggleFullScreen so that we don't need to
    // append the app elements (modals) to the player container.
    this.env.toggleFullScreen(this.fullscreenElement,
      this.constants.forceLandscapeOnFullscreen);
  }

  showBookmarkUrl() {
    // Don't show modal if we can't expect the current time to be properly
    // initialized
    if (!this.hasCurrentData) {
      return;
    }

    const modal = this.modals?.bookmark
      .setTimecode(this.displayTime)
      .setFps(this.getFps() ?? 0);

    this.openModal(modal, /* pause= */ true);
  }

  /**
   * @returns {ScreenshotModal | undefined}
   */
  prepareScreenshot() {
    // Don't do screenshot if there isn't yet an image to be displayed
    if (!this.hasCurrentData) {
      return;
    }

    return (
      this.modals?.screenshot
        .setVideo(this.video)
        .setMetadata(this.videoInfo.metadata)
        .setFps(this.getFps())
        .setTimecode(this.displayTime)
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
      this.pauseOn(modal);
    }

    this.ui.seekBar?.endSeek();
    modal.open();
  }
}
