const $ = require('jquery');
const { BookmarkModal } = require('./BookmarkModal');
const { Chapters } = require('./Chapters');
const { SimpleModal } = require('./SimpleModal');
const { renderScreenshot } = require('./Screenshot');
const { buildTimeString } = require('./util');

require('../../Less/VideoPlayer/VideoPlayer.less');
require('./controls.css');

const PREV_CHAPTER_TOLERANCE = 5;

var video;
var controls;
var manifestUri;
var player;
var vifa;
var fps = 25;
let chapters;
let helpModal;
let bookmarkModal;
/**
 * @type {SachsenShakaPlayer}
 */
let sxndPlayer;

function isModalOpen() {
  return helpModal.isOpen || bookmarkModal.isOpen;
}

// TODO: Pull all the global variables into this class
class SachsenShakaPlayer {
  constructor() {
    //
  }

  async initialize() {
    chapters = new Chapters(window.VIDEO_CHAPTERS);

    // Create a Player instance.
    video = document.getElementById('video');
    manifestUri = document.getElementsByClassName('mime-type-video')[0].getAttribute('data-url') + '.mpd';
    const ui = video['ui'];
    controls = ui.getControls();
    player = new shaka.Player(video);

    const config = {
      addSeekBar: true,
      'controlPanelElements': [
        'play_pause',
        'chapters_menu',
        myapp.PresentationTimeTracker.KEY,
        'spacer',
        'volume',
        'mute',
        myapp.Replay10Button.KEY,
        myapp.SkipPreviousButton.KEY,
        myapp.SkipNextButton.KEY,
        myapp.Forward10Button.KEY,
        myapp.CaptureButton.KEY,
        myapp.BookmarkButton.KEY,
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

    // Attach player to the window to make it easy to access in the JS console.
    window.player = player;
    window.ui = ui;

    // Listen for error events.
    player.addEventListener('error', this.onPlayerErrorEvent.bind(this));
    controls.addEventListener('error', this.onUiErrorEvent.bind(this));

    vifa = VideoFrame({
      id: 'video',
      frameRate: fps,
      callback: function (response) {
        console.log('callback response: ' + response);
      }
    });

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!');
      const timecode = new URL(window.location).searchParams.get('timecode');
      if (timecode) {
        await player.load(manifestUri, parseFloat(timecode));
      } else {
        await player.load(manifestUri);
      }
    } catch (e) {
      // onError is executed if the asynchronous load fails.
      onError(e);
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
    return video.currentTime;
  }

  get displayTime() {
    return controls.getDisplayTime();
  }

  getCurrentChapter() {
    return this.timeToChapter(this.currentTime);
  }

  timeToChapter(timecode) {
    return chapters.timeToChapter(timecode);
  }

  play() {
    video.play();
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
      video.currentTime = position;
    } else if (typeof position.timecode === 'number') {
      video.currentTime = position.timecode;
    }
  }

  skipSeconds(delta) {
    // TODO: Consider end of video
    video.currentTime += delta;
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
      this.seekTo(chapters.advance(cur, +1));
    }
  }

  showBookmarkUrl() {
    bookmarkModal.setTimecode(controls.getDisplayTime()).open();
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
  sxndPlayer = new SachsenShakaPlayer();
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
      controls.toggleFullScreen();
    } else if (e.key == ' ') {
      e.preventDefault();
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    } else if (e.key == "ArrowUp") {
      e.preventDefault();
      video.volume = Math.min(1, video.volume + 0.05);
    } else if (e.key == "ArrowDown") {
      e.preventDefault();
      video.volume = Math.max(0, video.volume - 0.05);
    } else if (e.key == "ArrowLeft") {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        sxndPlayer.prevChapter();
      } else if (e.shiftKey) {
        vifa.seekBackward(1);
      } else {
        sxndPlayer.skipSeconds(-10);
      }
    } else if (e.key == "ArrowRight") {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        sxndPlayer.nextChapter();
      } else if (e.shiftKey) {
        vifa.seekForward(1);
      } else {
        sxndPlayer.skipSeconds(+10);
      }
    } else if (e.key == 'm') {
      e.preventDefault();
      video.muted = !video.muted;
    } else if (e.key == '.') {
      e.preventDefault();
      vifa.seekForward(1);
    } else if (e.key == ',') {
      e.preventDefault();
      vifa.seekBackward(1);
    } else if (e.key == 'b') {
      e.preventDefault();
      sxndPlayer.showBookmarkUrl();
    }
  });
}

class myapp { }

// add some custom buttons

// -----------------------------------------------------------------------
// 1. Capture-Button
// -----------------------------------------------------------------------
// Use shaka.ui.Element as a base class
myapp.CaptureButton = class extends shaka.ui.Element {
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


// Factory that will create a button at run time.
myapp.CaptureButton.Factory = class {
  create(rootElement, controls) {
    return new myapp.CaptureButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  myapp.CaptureButton.KEY,
  new myapp.CaptureButton.Factory()
);

// -----------------------------------------------------------------------
// 2. Skip-Next-Button
// -----------------------------------------------------------------------
// Use shaka.ui.Element as a base class
myapp.SkipNextButton = class extends shaka.ui.Element {
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
      vifa.seekForward(1);
    });
  }
};


// Factory that will create a button at run time.
myapp.SkipNextButton.Factory = class {
  create(rootElement, controls) {
    return new myapp.SkipNextButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  myapp.SkipNextButton.KEY,
  new myapp.SkipNextButton.Factory()
);

// -----------------------------------------------------------------------
// 3. Skip-Previous-Button
// -----------------------------------------------------------------------
// Use shaka.ui.Element as a base class
myapp.SkipPreviousButton = class extends shaka.ui.Element {
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
      vifa.seekBackward(1);
    });
  }
};

// Factory that will create a button at run time.
myapp.SkipPreviousButton.Factory = class {
  create(rootElement, controls) {
    return new myapp.SkipPreviousButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  myapp.SkipPreviousButton.KEY,
  new myapp.SkipPreviousButton.Factory()
);

// -----------------------------------------------------------------------
// 4. Foward 10seconds Button
// -----------------------------------------------------------------------
// Use shaka.ui.Element as a base class
myapp.Forward10Button = class extends shaka.ui.Element {
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
      sxndPlayer.skipSeconds(+10);
    });
  }
};

// Factory that will create a button at run time.
myapp.Forward10Button.Factory = class {
  create(rootElement, controls) {
    return new myapp.Forward10Button(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  myapp.Forward10Button.KEY,
  new myapp.Forward10Button.Factory()
);

// -----------------------------------------------------------------------
// 5. Replay 10seconds Button
// -----------------------------------------------------------------------
// Use shaka.ui.Element as a base class
myapp.Replay10Button = class extends shaka.ui.Element {
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
      sxndPlayer.skipSeconds(-10);
    });
  }
};

// Factory that will create a button at run time.
myapp.Replay10Button.Factory = class {
  create(rootElement, controls) {
    return new myapp.Replay10Button(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  myapp.Replay10Button.KEY,
  new myapp.Replay10Button.Factory()
);

// -----------------------------------------------------------------------
// 6. Bookmark-Button
// -----------------------------------------------------------------------
// Use shaka.ui.Element as a base class
myapp.BookmarkButton = class extends shaka.ui.Element {
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
    this.eventManager.listen(this.button_, 'click', () => sxndPlayer.showBookmarkUrl());
  }
};


// Factory that will create a button at run time.
myapp.BookmarkButton.Factory = class {
  create(rootElement, controls) {
    return new myapp.BookmarkButton(rootElement, controls);
  }
};

// Register our factory with the controls, so controls can create button instances.
shaka.ui.Controls.registerElement(
  myapp.BookmarkButton.KEY,
  new myapp.BookmarkButton.Factory()
);

const TimeMode = {
  CurrentTime: 0,
  RemainingTime: 1,
  CurrentFrame: 2,
  COUNT: 3,
};

/**
 * @extends {shaka.ui.Element}
 * @final
 * @export
 */
myapp.PresentationTimeTracker = class extends shaka.ui.Element {
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
      const showHour = video.duration >= 3600;

      let text, title;

      switch (activeMode) {
        case TimeMode.CurrentTime:
        default:
          text = buildTimeString(totalSeconds, showHour);
          if (vifa) {
            text += ':' + ("0" + (vifa.get() % fps)).slice(-2);
          }
          if (video.duration) {
            text += ' / ' + buildTimeString(video.duration, showHour);
          }
          title = 'Aktuelle Laufzeit / Gesamtlaufzeit';
          break;

        case TimeMode.RemainingTime:
          text = buildTimeString(video.duration - totalSeconds, showHour);
          title = 'Restlaufzeit';
          break;

        case TimeMode.CurrentFrame:
          text = `${vifa.get()}`;
          title = 'Frame-Nummer';
          break;
      }

      let currentChapter = chapters.timeToChapter(totalSeconds);
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
 * @final
 */
myapp.PresentationTimeTracker.Factory = class {
  /** @override */
  create(rootElement, controls) {
    return new myapp.PresentationTimeTracker(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  myapp.PresentationTimeTracker.KEY,
  new myapp.PresentationTimeTracker.Factory()
);




// myapp.ChaptersMenu = class extends shaka.ui.Element {
//   constructor(parent, controls, chapters) {
//     super(parent, controls);

//     this.chapters_ = chapters;

//     // The actual button that will be displayed
//     this.button_ = document.createElement('button');
//     this.button_.className = 'shaka-overflow-menu-button shaka-no-propagation material-icons-round';
//     this.button_.title = 'Chapters';
//     this.button_.textContent = 'toc';
//     this.button_.innerHTML = '<ul><li>hallo</li></ul>';
//     this.parent.appendChild(this.button_);


//   }
// };

// myapp.ChaptersMenu.Factory = class {
//   constructor(chapters) {
//     this.chapters_ = chapters;
//   }

//   create(rootElement, controls) {
//     return new myapp.ChaptersMenu (rootElement, controls, this.chapters_);
//   }
// };

// shaka.ui.Controls.registerElement(
//     'chapters_menu',
//     new myapp.ChaptersMenu.Factory(() => {
//       chapters;
//       // Calculate and return chapter metadata here
//     }));


// /**
//  * generates timeline markers for chapter selection
//  */
// function generateChapters() {
//   var length = getMediaLength();
//   var seekBar = $('.jp-seek-bar');

//   $('.chapter').each(function() {
//       var timecode = $(this).data('timecode');
//       var title = $(this).data('title');
//       $('<span />', {
//           'class': 'jp-chapter-marker',
//           title: $(this).data('title'),
//           style: 'position: absolute; left: ' + ((timecode -0.5) * 100 / length) + '%',
//           click: function() {
//               play(timecode);
//           }

//       }).appendTo(seekBar);
//   });
// }


// This will add three buttons to the controls panel (in that order): shaka-provided
// rewind and fast forward button and out custom skip button, referenced by the name
// we used when registering the factory with the controls.
//ui['controlPanelElements'] = ['rewind', 'fast_forward', 'skip'];
