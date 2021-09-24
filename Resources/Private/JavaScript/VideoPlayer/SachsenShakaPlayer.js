import $ from 'jquery';
import BookmarkModal from './BookmarkModal';
import Chapters from './Chapters';
import SimpleModal from './SimpleModal';
import { renderScreenshot } from './Screenshot';
import { buildTimeString } from './util';

import '../../Less/VideoPlayer/VideoPlayer.less';
import './controls.css';

const PREV_CHAPTER_TOLERANCE = 5;

let helpModal;
let bookmarkModal;
/**
 * @type {SachsenShakaPlayer}
 */
let sxndPlayer;

function isModalOpen() {
  return helpModal.isOpen || bookmarkModal.isOpen;
}

class SachsenShakaPlayer {
  /**
   *
   * @param {object} config
   * @param {HTMLVideoElement} config.video
   * @param {string} config.manifestUri
   * @param {number?} config.timecode
   */
  constructor(config) {
    this.video = config.video;
    this.manifestUri = config.manifestUri;
    this.initialTimecode = config.timecode;
  }

  async initialize() {
    this.chapters = new Chapters(window.VIDEO_CHAPTERS);

    this.fps = 25;
    const ui = this.video['ui'];
    this.controls = ui.getControls();
    this.player = new shaka.Player(this.video);

    // Store player instance so that our custom controls may access it
    this.controls.elSxndPlayer = this;

    const config = {
      addSeekBar: true,
      'controlPanelElements': [
        'play_pause',
        'chapters_menu',
        PresentationTimeTracker.KEY,
        'spacer',
        'volume',
        'mute',
        Replay10Button.KEY,
        SkipPreviousButton.KEY,
        SkipNextButton.KEY,
        Forward10Button.KEY,
        CaptureButton.KEY,
        BookmarkButton.KEY,
        'fullscreen',
        'overflow_menu'
      ],
      'overflowMenuButtons': ['language', 'playback_rate', 'loop', 'quality', 'picture_in_picture', 'captions'],
      'addBigPlayButton': true,
      'seekBarColors': {
        base: 'rgba(255, 255, 255, 0.3)',
        buffered: 'rgba(255, 255, 255, 0.54)',
        played: 'rgb(255, 255, 255)',
        adBreaks: 'rgb(255, 204, 0)',
      }
    };
    ui.configure(config);

    this.renderChapterMarkers();

    // Listen for error events.
    this.player.addEventListener('error', this.onPlayerErrorEvent.bind(this));
    this.controls.addEventListener('error', this.onUiErrorEvent.bind(this));

    this.vifa = VideoFrame({
      id: this.video.id,
      frameRate: this.fps,
      callback: function (response) {
        console.log('callback response: ' + response);
      }
    });

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!');
      await this.player.load(this.manifestUri, this.initialTimecode);
    } catch (e) {
      // onError is executed if the asynchronous load fails.
      onError(e);
    }
  }

  renderChapterMarkers() {
    const seekBar = document.querySelector('.shaka-seek-bar-container');

    for (const chapter of this.chapters) {
      const relative = chapter.timecode / this.video.duration;

      // In particular, make sure that we don't put markers outside of the
      // seekbar for wrong timestamps.
      if (!(0 <= relative && relative < 1)) {
        continue;
      }

      // The outer <span /> is to give some leeway, making the chapter marker
      // easier to hit.

      const marker = document.createElement('span');
      marker.className = 'sxnd-chapter-marker';
      marker.style.position = 'absolute';
      marker.style.left = `${chapter.timecode / this.video.duration * 100}%`;
      marker.title = chapter.title;
      marker.addEventListener('click', () => {
        this.play();
        this.seekTo(chapter);
      });

      const markerInner = document.createElement('span');
      marker.append(markerInner);

      seekBar.append(marker);
    }
  }

  onPlayerErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onPlayerError(event.detail);
  }

  onUiErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onPlayerError(event.detail);
  }

  onPlayerError(error) {
    // Handle player error
    console.error('Error code', error.code, 'object', error);
  }

  get currentTime() {
    return this.video.currentTime;
  }

  get displayTime() {
    return this.controls.getDisplayTime();
  }

  getCurrentChapter() {
    return this.timeToChapter(this.currentTime);
  }

  timeToChapter(timecode) {
    return this.chapters.timeToChapter(timecode);
  }

  play() {
    this.video.play();
  }

  /**
   *
   * @param {*} position Timecode or chapter
   */
  seekTo(position) {
    if (position == null) {
      return;
    }

    if (typeof position === 'number') {
      this.video.currentTime = position;
    } else if (typeof position.timecode === 'number') {
      this.video.currentTime = position.timecode;
    }
  }

  skipSeconds(delta) {
    // TODO: Consider end of video
    this.video.currentTime += delta;
  }

  /**
   * Within {@link PREV_CHAPTER_TOLERANCE} seconds of a chapter, jump to the
   * start of the previous chapter. After that, jump to the start of the current
   * chapter. As a fallback, jump to the start of the video.
   */
  prevChapter() {
    this.seekTo(
      this.timeToChapter(this.currentTime - PREV_CHAPTER_TOLERANCE) ?? 0
    );
  }

  nextChapter() {
    let cur = this.getCurrentChapter();
    if (cur) {
      this.seekTo(this.chapters.advance(cur, +1));
    }
  }

  showBookmarkUrl() {
    bookmarkModal.setTimecode(this.displayTime).open();
  }
}

/**
 *
 * Initialize the Shaka-Player App
 *
 */

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }

}

// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
document.addEventListener('shaka-ui-loaded', () => {
  const timecode = new URL(window.location).searchParams.get('timecode');

  sxndPlayer = new SachsenShakaPlayer({
    video: document.getElementById('video'),
    manifestUri: document.getElementsByClassName('mime-type-video')[0].getAttribute('data-url') + '.mpd',
    timecode: timecode ? parseFloat(timecode) : undefined,
  });

  sxndPlayer.initialize();

  $('a[data-timecode]').on('click', function () {
    const timecode = $(this).data('timecode');
    sxndPlayer.play();
    sxndPlayer.seekTo(timecode);
  });

  helpModal = new SimpleModal(document.querySelector('.dfgplayer-help'));
  bookmarkModal = new BookmarkModal(document.querySelector('.bookmark-modal'));

  registerKeybindings();
});

// Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
// to load (e.g. due to lack of browser support).
document.addEventListener('shaka-ui-load-failed', (errorEvent) => {
  // Handle the failure to load; errorEvent.detail.reasonCode has a
  // shaka.ui.FailReasonCode describing why.
  console.error('Unable to load the UI library!');
});

function registerKeybindings() {
  document.addEventListener('keydown', (e) => {
    if (e.key == 'F1') {
      e.preventDefault();
      helpModal.toggle();
    } else if (e.key == 'Escape') {
      e.preventDefault();

      if (helpModal.isOpen) {
        helpModal.close();
      } else if (bookmarkModal.isOpen) {
        bookmarkModal.close();
      }
    }

    if (isModalOpen()) {
      return;
    }

    if (e.key == 'f') {
      e.preventDefault();
      sxndPlayer.controls.toggleFullScreen();
    } else if (e.key == ' ') {
      e.preventDefault();
      if (sxndPlayer.video.paused) {
        sxndPlayer.video.play();
      } else {
        sxndPlayer.video.pause();
      }
    } else if (e.key == "ArrowUp") {
      e.preventDefault();
      sxndPlayer.video.volume = Math.min(1, sxndPlayer.video.volume + 0.05);
    } else if (e.key == "ArrowDown") {
      e.preventDefault();
      sxndPlayer.video.volume = Math.max(0, sxndPlayer.video.volume - 0.05);
    } else if (e.key == "ArrowLeft") {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        sxndPlayer.prevChapter();
      } else if (e.shiftKey) {
        sxndPlayer.vifa.seekBackward(1);
      } else {
        sxndPlayer.skipSeconds(-10);
      }
    } else if (e.key == "ArrowRight") {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        sxndPlayer.nextChapter();
      } else if (e.shiftKey) {
        sxndPlayer.vifa.seekForward(1);
      } else {
        sxndPlayer.skipSeconds(+10);
      }
    } else if (e.key == 'm') {
      e.preventDefault();
      sxndPlayer.video.muted = !sxndPlayer.video.muted;
    } else if (e.key == '.') {
      e.preventDefault();
      sxndPlayer.vifa.seekForward(1);
    } else if (e.key == ',') {
      e.preventDefault();
      sxndPlayer.vifa.seekBackward(1);
    } else if (e.key == 'b') {
      e.preventDefault();
      sxndPlayer.showBookmarkUrl();
    }
  });
}

class CaptureButton extends shaka.ui.Element {
  static KEY = 'capture';

  constructor(parent, controls) {
    super(parent, controls);

    // The actual button that will be displayed
    this.button_ = document.createElement('button');
    this.button_.className = 'material-icons-round';
    this.button_.title = 'Screenshot';
    this.button_.textContent = 'photo_camera';
    this.parent.appendChild(this.button_);

    // Listen for clicks on the button
    this.eventManager.listen(this.button_, 'click', () => {
      renderScreenshot(document.getElementById('video'));
    });
  }
};

CaptureButton.Factory = class {
  create(rootElement, controls) {
    return new CaptureButton(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  CaptureButton.KEY,
  new CaptureButton.Factory()
);

class SkipNextButton extends shaka.ui.Element {
  static KEY = 'skip_next';

  constructor(parent, controls) {
    super(parent, controls);

    // The actual button that will be displayed
    this.button_ = document.createElement('button');
    this.button_.className = 'material-icons-round';
    this.button_.title = 'Einzelbild weiter';
    this.button_.textContent = 'skip_next'; // independent of KEY
    this.parent.appendChild(this.button_);

    // Listen for clicks on the button
    this.eventManager.listen(this.button_, 'click', () => {
      this.controls.elSxndPlayer.vifa.seekForward(1);
    });
  }
};

SkipNextButton.Factory = class {
  create(rootElement, controls) {
    return new SkipNextButton(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  SkipNextButton.KEY,
  new SkipNextButton.Factory()
);

class SkipPreviousButton extends shaka.ui.Element {
  static KEY = 'skip_previous';

  constructor(parent, controls) {
    super(parent, controls);

    // The actual button that will be displayed
    this.button_ = document.createElement('button');
    this.button_.className = 'material-icons-round';
    this.button_.title = 'Einzelbild zurück';
    this.button_.textContent = 'skip_previous'; // independent of KEY
    this.parent.appendChild(this.button_);

    // Listen for clicks on the button
    this.eventManager.listen(this.button_, 'click', () => {
      this.controls.elSxndPlayer.vifa.seekBackward(1);
    });
  }
};

SkipPreviousButton.Factory = class {
  create(rootElement, controls) {
    return new SkipPreviousButton(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  SkipPreviousButton.KEY,
  new SkipPreviousButton.Factory()
);

class Forward10Button extends shaka.ui.Element {
  static KEY = 'forward_10';

  constructor(parent, controls) {
    super(parent, controls);

    // The actual button that will be displayed
    this.button_ = document.createElement('button');
    this.button_.className = 'material-icons-round';
    this.button_.title = '10 Sekunden vor';
    this.button_.textContent = 'forward_10'; // independent of KEY
    this.parent.appendChild(this.button_);

    // Listen for clicks on the button
    this.eventManager.listen(this.button_, 'click', () => {
      this.controls.elSxndPlayer.skipSeconds(+10);
    });
  }
};

Forward10Button.Factory = class {
  create(rootElement, controls) {
    return new Forward10Button(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  Forward10Button.KEY,
  new Forward10Button.Factory()
);

class Replay10Button extends shaka.ui.Element {
  static KEY = 'replay_10';

  constructor(parent, controls) {
    super(parent, controls);

    // The actual button that will be displayed
    this.button_ = document.createElement('button');
    this.button_.className = 'material-icons-round';
    this.button_.title = '10 Sekunden zurück';
    this.button_.textContent = 'replay_10'; // independent of KEY
    this.parent.appendChild(this.button_);

    // Listen for clicks on the button
    this.eventManager.listen(this.button_, 'click', () => {
      this.controls.elSxndPlayer.skipSeconds(-10);
    });
  }
};

Replay10Button.Factory = class {
  create(rootElement, controls) {
    return new Replay10Button(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  Replay10Button.KEY,
  new Replay10Button.Factory()
);

class BookmarkButton extends shaka.ui.Element {
  static KEY = 'bookmark';

  constructor(parent, controls) {
    super(parent, controls);

    // The actual button that will be displayed
    this.button_ = document.createElement('button');
    this.button_.className = 'material-icons-round';
    this.button_.title = 'Bookmark';
    this.button_.textContent = 'bookmark_border';
    this.parent.appendChild(this.button_);

    // Listen for clicks on the button
    this.eventManager.listen(this.button_, 'click', () => this.controls.elSxndPlayer.showBookmarkUrl());
  }
};


BookmarkButton.Factory = class {
  create(rootElement, controls) {
    return new BookmarkButton(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  BookmarkButton.KEY,
  new BookmarkButton.Factory()
);

const TimeMode = {
  CurrentTime: 0,
  RemainingTime: 1,
  CurrentFrame: 2,
  COUNT: 3,
};

class PresentationTimeTracker extends shaka.ui.Element {
  static KEY = 'time_and_duration_frame';

  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    /** @type {!HTMLButtonElement} */
    this.currentTime_ = document.createElement('button');
    this.currentTime_.classList.add('shaka-current-time');
    this.parent.appendChild(this.currentTime_);

    this.state = {};

    this.render({
      totalSeconds: 0,
      activeMode: TimeMode.CurrentTime,
    });

    this.eventManager.listen(this.currentTime_, 'click', () => {
      // We toggle the time display here --> change mode on click --> values get updated in timeandseekrangeupdated event
      // current time: HH:MM:SS:FF
      // remaining time
      // current frame
      this.render({
        activeMode: (this.state.activeMode + 1) % TimeMode.COUNT,
      });
    });

    this.eventManager.listen(this.controls, 'timeandseekrangeupdated', () => {
      this.render({
        totalSeconds: this.controls.getDisplayTime(),
      });
    });
  }

  render(state) {
    const newState = Object.assign({}, this.state, state);

    const { totalSeconds, activeMode } = newState;
    if (totalSeconds !== this.state.totalSeconds || activeMode !== this.state.activeMode) {
      const elSxndPlayer = this.controls.elSxndPlayer;

      const showHour = elSxndPlayer.video.duration >= 3600;

      let text, title;

      switch (activeMode) {
        case TimeMode.CurrentTime:
        default:
          text = buildTimeString(totalSeconds, showHour);
          if (elSxndPlayer.vifa) {
            text += ':' + ("0" + (elSxndPlayer.vifa.get() % elSxndPlayer.fps)).slice(-2);
          }
          if (elSxndPlayer.video.duration) {
            text += ' / ' + buildTimeString(elSxndPlayer.video.duration, showHour);
          }
          title = 'Aktuelle Laufzeit / Gesamtlaufzeit';
          break;

        case TimeMode.RemainingTime:
          text = buildTimeString(elSxndPlayer.video.duration - totalSeconds, showHour);
          title = 'Restlaufzeit';
          break;

        case TimeMode.CurrentFrame:
          text = `${elSxndPlayer.vifa.get()}`;
          title = 'Frame-Nummer';
          break;
      }

      let currentChapter = elSxndPlayer.chapters.timeToChapter(totalSeconds);
      if (currentChapter) {
        text += ` – ${currentChapter.title}`;
      }

      this.currentTime_.textContent = text;
      this.currentTime_.title = title;
    }

    this.state = newState;
  }
};


/**
 * @implements {shaka.extern.IUIElement.Factory}
 */
PresentationTimeTracker.Factory = class {
  create(rootElement, controls) {
    return new PresentationTimeTracker(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  PresentationTimeTracker.KEY,
  new PresentationTimeTracker.Factory()
);
