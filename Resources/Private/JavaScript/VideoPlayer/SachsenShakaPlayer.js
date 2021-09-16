const $ = require('jquery');
const { renderScreenshot } = require('./Screenshot');
const { buildTimeString } = require('./util');

require('../../Less/VideoPlayer/VideoPlayer.less');
require('./controls.css');

var video;
var controls;
var manifestUri;
var player;
var vifa;
var fps = 25;



var chapters = [
  { time: 0, title: 'Intro' },
  { time: 5, title: 'Chapter 1' },
  { time: 10, title: 'Chapter 2' },
  { time: 15, title: 'Chapter 3' },
  { time: 20, title: 'Outro' },
];

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

async function initPlayer() {
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
    'overflowMenuButtons' : ['language', 'playback_rate', 'loop', 'quality', 'picture_in_picture', 'captions'],
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
  player.addEventListener('error', onPlayerErrorEvent);
  controls.addEventListener('error', onUIErrorEvent);

  vifa = VideoFrame({
    id: 'video',
    frameRate: fps,
    callback : function(response) {
        console.log('callback response: ' + response);
    }
  });

  $('a[data-timecode]').on('click', function () {
    const timecode = $(this).data('timecode');
    play(timecode);
  });

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
    const timecode = new URL(window.location).searchParams.get('timecode');
    if(timecode) {
      await player.load(manifestUri,parseFloat(timecode) );
      //play(parseFloat(timecode));
    } else {
      await player.load(manifestUri);
    }
  } catch (e) {
    // onError is executed if the asynchronous load fails.
    onError(e);
  }
}

function onPlayerErrorEvent(errorEvent) {
    // Extract the shaka.util.Error object from the event.
    onPlayerError(event.detail);
}

function onPlayerError(error) {
  // Handle player error
  console.error('Error code', error.code, 'object', error);
}

function onUIErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event.detail);
}

function initFailed(errorEvent) {
  // Handle the failure to load; errorEvent.detail.reasonCode has a
  // shaka.ui.FailReasonCode describing why.
  console.error('Unable to load the UI library!');
  }

/**
 * plays the media from a individual position in media stream
 * @param seconds
 */
function play(seconds) {

  if (video.paused) {
    // if video is pause, we have to start it first
    video.play();
  }
  // set position to currenTime
  video.currentTime = seconds;
}

// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
document.addEventListener('shaka-ui-loaded', initPlayer);
// Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
// to load (e.g. due to lack of browser support).
document.addEventListener('shaka-ui-load-failed', initFailed);

document.addEventListener('keydown', (e) => {
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
  } else if (e.key == 'p') {
    e.preventDefault();
    vifa.seekForward(1);
  }
});

class myapp {}

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
    this.button_.title = 'Einzelbild zurück';
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
      video.currentTime = video.currentTime + 10;
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
      video.currentTime = video.currentTime - 10;
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
    this.eventManager.listen(this.button_, 'click', () => {
      generateUrl();
    });
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
    this.currentTime_.title = 'Aktuelle Laufzeit / Gesamtlaufzeit';
    this.setValue_('0:00');
    this.parent.appendChild(this.currentTime_);
    this.activeMode = 0;

    this.eventManager.listen(this.currentTime_, 'click', () => {
      // We toggle the time display here --> change mode on click --> values get updated in timeandseekrangeupdated event
      // current time: HH:MM:SS:FF
      // remaining time
      // current frame
      this.activeMode = (this.activeMode + 1) % TimeMode.COUNT;
    });

    this.eventManager.listen(this.controls, 'timeandseekrangeupdated', () => {
      let displayTime = this.controls.getDisplayTime();
      const showHour = video.duration >= 3600;

      switch (this.activeMode) {
        case TimeMode.CurrentTime:
        default:
          this.updateTime_();
          this.currentTime_.title = 'Aktuelle Laufzeit / Gesamtlaufzeit';
          break;
        case TimeMode.RemainingTime:
          this.setValue_(buildTimeString(video.duration - displayTime, showHour));
          this.currentTime_.title = 'Restlaufzeit';
          break;
        case TimeMode.CurrentFrame:
          this.setValue_(vifa.get());
          this.currentTime_.title = 'Frame-Nummer';
          break;
      }
    });

  }

  /** @private */
  setValue_(value) {
    // To avoid constant updates to the DOM, which makes debugging more
    // difficult, only set the value if it has changed.  If we don't do this
    // check, the DOM updates constantly, this element flashes in the debugger
    // in Chrome, and you can't make changes in the CSS panel.
    if (value != this.currentTime_.textContent) {
      this.currentTime_.textContent = value;
    }
  }

  updateTime_() {
    const showHour = video.duration >= 3600;
    let displayTime = this.controls.getDisplayTime();

    let value = buildTimeString(displayTime, showHour);

    // calculate frame number and append it to the value
    value += ':' + ("0" + (vifa.get() % fps)).slice(-2);
    if (video.duration) {
      value += ' / ' + buildTimeString(video.duration, showHour);
    }
    this.setValue_(value);
    this.currentTime = value;
    //this.currentTime_.disabled = true;
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


/**
 * Helper functions
 */

function resizeVideoCanvas() {
    var view, player, video;
    view = $('.document-view');
    player = $('.mediaplayer-container');
    video = $("video");
    video.css({
        width: '100%',
        height: 'auto',
    });
    if(player.height() > view.height()) {
        video.css({
            width: '80%',
            height: 'auto',
        });
    }
}

function generateUrl() {
  const url = new URL(window.location);
  url.searchParams.set('timecode', controls.getDisplayTime());

  var $urlInput = $('#url-field'), urlContainer = $('#url-container');
  $urlInput.val(url.toString());
  urlContainer.show('fast');
}
