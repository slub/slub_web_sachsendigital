import $ from 'jquery';

import BookmarkModal from './BookmarkModal';
import BookmarkButton from './controls/BookmarkButton';
import CaptureButton from './controls/CaptureButton';
import HelpModal from './HelpModal';
import Modals from './Modals';
import SachsenShakaPlayer from './SachsenShakaPlayer';
import ScreenshotModal from './ScreenshotModal';

class SxndPlayerApp {
  constructor(container, videoInfo, locale) {
    this.container = container;
    this.videoInfo = videoInfo;
    this.locale = locale;

    CaptureButton.onClick = this.showScreenshot.bind(this);
    BookmarkButton.onClick = this.showBookmarkUrl.bind(this);

    document.addEventListener('shaka-ui-loaded', this.onShakaUiLoaded.bind(this));

    // This is a hack against the keyup handler in `slub_digitalcollections`,
    // which adds/removes a `fullscreen` CSS class when releasing `f`/`Esc`.
    // TODO: Find a better solution for this.
    window.addEventListener('keyup', e => {
      e.stopImmediatePropagation();
    }, { capture: true });
  }

  onShakaUiLoaded() {
    const video = document.createElement("video");
    video.id = 'video';
    video.poster = this.videoInfo.url.poster;
    video.style.width = "100%";
    video.style.height = "100%";
    this.container.append(video);

    const timecode = new URL(window.location).searchParams.get('timecode');

    const sxndPlayer = new SachsenShakaPlayer({
      container: this.container,
      video: document.getElementById('video'),
      manifestUri: this.videoInfo.url.manifest,
      timecode: timecode ? parseFloat(timecode) : undefined,
      videoInfo: this.videoInfo,
    });

    sxndPlayer.initialize();

    sxndPlayer.setLocale(this.locale);

    $('a[data-timecode]').on('click', function () {
      const timecode = $(this).data('timecode');
      sxndPlayer.play();
      sxndPlayer.seekTo(timecode);
    });

    this.modals = Modals({
      help: new HelpModal(this.container),
      bookmark: new BookmarkModal(this.container),
      screenshot: new ScreenshotModal(this.container, sxndPlayer.video),
    });

    this.sxndPlayer = sxndPlayer;

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(e) {
    if (e.key == 'F1') {
      e.preventDefault();
      this.modals.help.toggle();
    } else if (e.key == 'Escape') {
      e.preventDefault();
      this.modals.closeNext();
    }

    if (this.modals.hasOpen()) {
      return;
    }

    if (e.key == 'f') {
      e.preventDefault();
      this.sxndPlayer.controls.toggleFullScreen();
    } else if (e.key == ' ') {
      e.preventDefault();
      if (this.sxndPlayer.video.paused) {
        this.sxndPlayer.video.play();
      } else {
        this.sxndPlayer.video.pause();
      }
    } else if (e.key == "ArrowUp") {
      e.preventDefault();
      this.sxndPlayer.video.volume = Math.min(1, this.sxndPlayer.video.volume + 0.05);
    } else if (e.key == "ArrowDown") {
      e.preventDefault();
      this.sxndPlayer.video.volume = Math.max(0, this.sxndPlayer.video.volume - 0.05);
    } else if (e.key == "ArrowLeft") {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        this.sxndPlayer.prevChapter();
      } else if (e.shiftKey) {
        this.sxndPlayer.vifa.seekBackward(1);
      } else {
        this.sxndPlayer.skipSeconds(-10);
      }
    } else if (e.key == "ArrowRight") {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        this.sxndPlayer.nextChapter();
      } else if (e.shiftKey) {
        this.sxndPlayer.vifa.seekForward(1);
      } else {
        this.sxndPlayer.skipSeconds(+10);
      }
    } else if (e.key == 'm') {
      e.preventDefault();
      this.sxndPlayer.video.muted = !this.sxndPlayer.video.muted;
    } else if (e.key == '.') {
      e.preventDefault();
      this.sxndPlayer.vifa.seekForward(1);
    } else if (e.key == ',') {
      e.preventDefault();
      this.sxndPlayer.vifa.seekBackward(1);
    } else if (e.key == 'b') {
      e.preventDefault();
      this.showBookmarkUrl();
    } else if (e.key == 's') {
      e.preventDefault();
      this.showScreenshot();
    }
  }

  showBookmarkUrl() {
    this.sxndPlayer.pause();
    this.modals.bookmark.setTimecode(this.sxndPlayer.displayTime).open();
  }

  showScreenshot() {
    this.sxndPlayer.pause();
    this.modals.screenshot.setMetadata(this.videoInfo.metadata).open();
  }
}

window.SxndPlayerApp = SxndPlayerApp;
