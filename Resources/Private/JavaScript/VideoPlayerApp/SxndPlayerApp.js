// @ts-check

import { e } from '../lib/util';
import { Modifier, modifiersFromEvent } from '../lib/Keyboard';
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
 * @typedef {'player' | 'modal'} KeyboardScope Currently active target/scope
 * for mapping keybindings.
 *
 * @typedef {HTMLElement & { sxndTimecode: number }} ChapterLink
 */

export default class SxndPlayerApp {
  /**
   *
   * @param {HTMLElement} container
   * @param {VideoInfo} videoInfo
   * @param {LangDef} lang
   */
  constructor(container, videoInfo, lang) {
    /** @private */
    this.container = container;
    /** @private */
    this.playerMount = e('div');
    this.container.append(this.playerMount);
    /** @private */
    this.videoInfo = videoInfo;
    /** @private */
    this.lang = lang;
    /** @private @type {Keybinding<KeyboardScope, keyof SxndPlayerApp['actions']>[]} */
    this.keybindings = /** @type {any} */(keybindings);

    /** @private */
    this.constants = {
      /** Number of seconds in which to still rewind to previous chapter. */
      prevChapterTolerance: 5,
      /** Volume increase/decrease in relevant keybinding. */
      volumeStep: 0.05,
      /** Number of seconds to seek or rewind in relevant keybinding. */
      seekStep: 10,
      /** Trick play factor for continuous rewind/seek. */
      trickPlayFactor: 4,
    };

    /** @private */
    this.handlers = {
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
      onClickChapterLink: this.onClickChapterLink.bind(this),
    };

    /** @private */
    this.env = new Environment();
    this.env.setLang(lang);

    /** @private */
    this.sxndPlayer = new SachsenShakaPlayer(this.env);

    // Check if we've got a URL for a supported manifest format
    /** @private */
    this.manifestUri = null;
    for (const format of SachsenShakaPlayer.initSupport()) {
      if (videoInfo.url[format]) {
        this.manifestUri = videoInfo.url[format];
        break;
      }
    }

    /** @private @type {ChapterLink[]} */
    this.chapterLinks = [];

    /** @private */
    this.modals = Modals({
      help: new HelpModal(this.container, this.env, {
        constants: this.constants,
        keybindings: this.keybindings,
      }),
      bookmark: new BookmarkModal(this.container, this.env),
      screenshot: new ScreenshotModal(this.container, this.env),
    });

    /** @private */
    this.actions = {
      'cancel': () => {
        if (this.modals.hasOpen()) {
          this.modals.closeNext();
        } else if (this.sxndPlayer.isThumbnailPreviewOpen()) {
          this.sxndPlayer.hideThumbnailPreview();
        } else if (this.sxndPlayer.anySettingsMenusAreOpen()) {
          this.sxndPlayer.hideSettingsMenus();
        }
      },
      'modal.help.open': () => {
        this.sxndPlayer.hideThumbnailPreview();
        this.modals.help.open();
      },
      'modal.help.toggle': () => {
        this.sxndPlayer.hideThumbnailPreview();
        this.modals.help.toggle();
      },
      'modal.bookmark.open': () => {
        this.showBookmarkUrl();
      },
      'modal.screenshot.open': () => {
        this.showScreenshot();
      },
      'fullscreen.toggle': () => {
        this.sxndPlayer.hideThumbnailPreview();
        this.sxndPlayer.toggleFullScreen();
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
    };

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
    if (this.manifestUri === null) {
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
        material_icon: 'photo_camera',
        title: this.env.t('control.screenshot.tooltip'),
        onClick: this.actions['modal.screenshot.open'],
      }),
      ControlPanelButton.register(this.env, {
        material_icon: 'bookmark_border',
        title: this.env.t('control.bookmark.tooltip'),
        onClick: this.actions['modal.bookmark.open'],
      }),
      ControlPanelButton.register(this.env, {
        material_icon: 'help_outline',
        title: this.env.t('control.help.tooltip'),
        onClick: this.actions['modal.help.open'],
      })
    );
    this.sxndPlayer.setConstants(this.constants);
    this.sxndPlayer.setLocale(this.lang.twoLetterIsoCode);
    this.sxndPlayer.setPoster(this.videoInfo.url.poster);
    this.sxndPlayer.setChapters(chapters);
    this.sxndPlayer.mount(this.playerMount);

    try {
      await this.sxndPlayer.loadManifest(this.manifestUri, startTime);
    } catch (e) {
      console.error(e);
      this.failWithError('error.load-failed');
    }

    this.modals.resize();

    document.addEventListener('keydown', this.handlers.onKeyDown, { capture: true });
    document.addEventListener('keyup', this.handlers.onKeyUp, { capture: true });
  }

  /**
   * @private
   * @returns {KeyboardScope}
   */
  getKeyboardScope() {
    if (this.modals.hasOpen()) {
      return 'modal';
    }

    return 'player';
  }

  /**
   * @private
   * @param {KeyboardEvent} e
   */
  onKeyDown(e) {
    let stopPropagation = true;

    const mod = modifiersFromEvent(e);
    const curKbScope = this.getKeyboardScope();

    const keybinding = this.keybindings.find(kb => (
      typeof this.actions[kb.action] === 'function'
      && kb.key === e.key
      && (kb.repeat == null || kb.repeat === e.repeat)
      && (kb.scope == null || kb.scope === curKbScope)
      && Modifier[kb.mod ?? 'None'] === mod
    ));

    if (keybinding) {
      e.preventDefault();
      this.actions[keybinding.action]();

      if (keybinding.propagate === true) {
        stopPropagation = false;
      }
    }

    if (stopPropagation) {
      // Stop propagation to suppress Shaka's default keybindings.
      //
      // TODO: Find a better solution; tweak this behavior
      e.stopImmediatePropagation();
    }
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

    this.sxndPlayer.cancelTrickPlay();
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

  showBookmarkUrl() {
    this.sxndPlayer.pause();
    this.sxndPlayer.hideThumbnailPreview();
    this.modals.bookmark
      .setTimecode(this.sxndPlayer.displayTime)
      .setFps(this.sxndPlayer.getFps() ?? 0)
      .open();
  }

  showScreenshot() {
    this.sxndPlayer.pause();
    this.sxndPlayer.hideThumbnailPreview();
    this.modals.screenshot
      .setVideo(this.sxndPlayer.getVideo())
      .setMetadata(this.videoInfo.metadata)
      .setTimecode(this.sxndPlayer.displayTime)
      .open();
  }
}
