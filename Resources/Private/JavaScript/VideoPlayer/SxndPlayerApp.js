import BookmarkModal from './BookmarkModal';
import Chapters from './Chapters';
import ControlPanelButton from './controls/ControlPanelButton';
import Environment from './Environment';
import HelpModal from './HelpModal';
import { Modifier, modifiersFromEvent } from './Keyboard';
import Modals from './Modals';
import SachsenShakaPlayer from './SachsenShakaPlayer';
import ScreenshotModal from './ScreenshotModal';

import keybindings from './keybindings.json';

/**
 * @typedef {'player' | 'modal'} KeyboardScope Currently active target/scope for mapping keybindings.
 */

class SxndPlayerApp {
  /**
   *
   * @param {HTMLElement} container
   * @param {any} videoInfo
   * @param {object} lang
   * @param {string} lang.locale
   * @param {string} lang.twoLetterIsoCode
   * @param {Record<string, string>} lang.phrases
   */
  constructor(container, videoInfo, lang) {
    this.container = container;
    this.videoInfo = videoInfo;
    this.lang = lang;

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

    this.handlers = {
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
      onClickChapterLink: this.onClickChapterLink.bind(this),
    };

    this.env = new Environment();
    this.env.setLang(lang);

    // Check if we've got a URL for a supported manifest format
    this.manifestUri = null;
    for (const format of SachsenShakaPlayer.initSupport()) {
      if (videoInfo.url[format]) {
        this.manifestUri = videoInfo.url[format];
        break;
      }
    }
    if (this.manifestUri === null) {
      this.failWithError('error.playback-not-supported');
      return;
    }

    // TODO: Use arrays inside the app, avoid this transformation?
    const videoMetadata = this.videoInfo.metadata.metadata;
    for (const key of Object.keys(videoMetadata)) {
      if (Array.isArray(videoMetadata[key])) {
        if (videoMetadata[key].length > 0) {
          videoMetadata[key] = videoMetadata[key][0];
        } else {
          delete videoMetadata[key];
        }
      }
    }

    this.actions = {
      'cancel': () => {
        this.hideThumbnailPreview();
        this.modals.closeNext();
      },
      'modal.help.open': () => {
        this.hideThumbnailPreview();
        this.modals.help.open();
      },
      'modal.help.toggle': () => {
        this.hideThumbnailPreview();
        this.modals.help.toggle();
      },
      'modal.bookmark.open': () => {
        this.showBookmarkUrl();
      },
      'modal.screenshot.open': () => {
        this.showScreenshot();
      },
      'fullscreen.toggle': () => {
        this.hideThumbnailPreview();
        this.sxndPlayer.controls.toggleFullScreen();
      },
      'playback.toggle': () => {
        if (this.sxndPlayer.video.paused) {
          this.sxndPlayer.video.play();
        } else {
          this.sxndPlayer.video.pause();
        }
      },
      'playback.volume.mute.toggle': () => {
        this.sxndPlayer.video.muted = !this.sxndPlayer.video.muted;
      },
      'playback.volume.inc': () => {
        this.sxndPlayer.video.volume = Math.min(1, this.sxndPlayer.video.volume + this.constants.volumeStep);
      },
      'playback.volume.dec': () => {
        this.sxndPlayer.video.volume = Math.max(0, this.sxndPlayer.video.volume - this.constants.volumeStep);
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
        this.sxndPlayer.vifa?.seekBackward(1);
      },
      'navigate.frame.next': () => {
        this.sxndPlayer.vifa?.seekForward(1);
      },
    };

    this.keybindings = keybindings;

    this.load();
  }

  failWithError(langKey) {
    const errorBox = document.createElement('div');
    errorBox.className = "sxnd-player-fatal-error";
    errorBox.innerText = this.env.t(langKey);

    this.container.innerHTML = "";
    this.container.append(errorBox);
  }

  load() {
    this.chapterLinks = Array.from(
      document.querySelectorAll("a[data-timecode]")
    );

    for (const el of this.chapterLinks) {
      el.sxndTimecode = Number(el.getAttribute("data-timecode"));
    }

    const video = document.createElement("video");
    video.id = 'video';
    video.poster = this.videoInfo.url.poster;
    video.style.width = "100%";
    video.style.height = "100%";
    this.container.append(video);

    const chapters = new Chapters(this.videoInfo.chapters);

    let timecode = new URL(window.location).searchParams.get('timecode');
    if (timecode === null && this.videoInfo.pageNo !== undefined) {
      timecode = chapters.at(this.videoInfo.pageNo - 1).timecode;
    }
    const startTime = timecode ? parseFloat(timecode) : undefined;

    const sxndPlayer = new SachsenShakaPlayer({
      env: this.env,
      container: this.container,
      video: document.getElementById('video'),
      chapters,
      controlPanelButtons: [
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
        }),
      ],
      constants: this.constants,
    });

    sxndPlayer.initialize();
    sxndPlayer.setLocale(this.lang.twoLetterIsoCode);

    sxndPlayer.loadManifest(this.manifestUri, startTime)
      .then(() => {
        document.addEventListener('keydown', this.handlers.onKeyDown, { capture: true });
        document.addEventListener('keyup', this.handlers.onKeyUp, { capture: true });

        for (const el of this.chapterLinks) {
          el.addEventListener('click', this.handlers.onClickChapterLink);
        }
      })
      .catch(() => {
        this.failWithError('error.load-failed');
      });

    this.modals = Modals({
      help: new HelpModal(this.container, this.env, {
        constants: this.constants,
        keybindings: this.keybindings,
      }),
      bookmark: new BookmarkModal(this.container, this.env),
      screenshot: new ScreenshotModal(this.container, this.env, {
        video: sxndPlayer.video,
      }),
    });

    this.sxndPlayer = sxndPlayer;
  }

  hideThumbnailPreview() {
    this.sxndPlayer.controls.dispatchEvent(new Event('sxnd-thumbs-close'));
  }

  /**
   *
   * @returns {KeyboardScope}
   */
  getKeyboardScope() {
    if (this.modals.hasOpen()) {
      return 'modal';
    }

    return 'player';
  }

  /**
   *
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
      // However, do this conditionally as we may not want to stop propagation
      // for Esc, because Shaka should close the overflow menu on Esc.
      //
      // TODO: Find a better solution; tweak this behavior
      e.stopImmediatePropagation();
    }
  }

  /**
   *
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    // Stopping propagation is a hack against the keyup handler in
    // `slub_digitalcollections`, which adds/removes a `fullscreen` CSS class
    // when releasing `f`/`Esc`.
    // TODO: Find better solutions for this.

    e.stopImmediatePropagation();

    this.sxndPlayer.cancelTrickPlay();
  }

  /**
   *
   * @param {MouseEvent} e
   */
  onClickChapterLink(e) {
    e.preventDefault();

    // Use `currentTarget` to get the <a> element to which the handler has been
    // attached.
    const timecode = Number(e.currentTarget.getAttribute('data-timecode'));
    this.sxndPlayer.play();
    this.sxndPlayer.seekTo(timecode);
  }

  showBookmarkUrl() {
    this.sxndPlayer.pause();
    this.hideThumbnailPreview();
    this.modals.bookmark
      .setTimecode(this.sxndPlayer.displayTime)
      .setFps(this.sxndPlayer.fps ?? 0)
      .open();
  }

  showScreenshot() {
    this.sxndPlayer.pause();
    this.hideThumbnailPreview();
    this.modals.screenshot
      .setMetadata(this.videoInfo.metadata)
      .setTimecode(this.sxndPlayer.displayTime)
      .open();
  }
}

window.SxndPlayerApp = SxndPlayerApp;
