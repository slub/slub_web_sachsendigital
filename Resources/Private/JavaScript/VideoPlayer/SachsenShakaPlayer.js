import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/ui/controls.less';

import Chapters from './Chapters';
import FlatSeekBar from './controls/FlatSeekBar';
import PresentationTimeTracker from './controls/PresentationTimeTracker';
import Environment from './Environment';

import '../../Less/VideoPlayer/VideoPlayer.less';

export default class SachsenShakaPlayer {
  /**
   * Please call {@link initSupport} once before instantiating players.
   *
   * @param {object} config
   * @param {Environment} config.env
   * @param {HTMLElement} config.container
   * @param {HTMLVideoElement} config.video
   * @param {Chapters} config.chapters
   * @param {string[]} config.controlPanelButtons
   * @param {string[]} config.overflowMenuButtons
   * @param {object} config.constants
   * @param {number} config.constants.prevChapterTolerance
   */
  constructor(config) {
    this.env = config.env;
    this.container = config.container;
    this.video = config.video;
    this.chapters = config.chapters;
    this.controlPanelButtons = config.controlPanelButtons ?? [];
    this.overflowMenuButtons = config.overflowMenuButtons ?? [];

    this.constants = Object.assign({
      prevChapterTolerance: 5,
    }, config.constants);

    this.handlers = {
      onTrackChange: this.onTrackChange.bind(this),
    };
  }

  /**
   * Installs polyfills and returns the supported manifest formats in order of
   * preference.
   *
   * @returns {('mpd' | 'hls')[]}
   */
  static initSupport() {
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
      // Conditions taken from shaka.util.Platform.supportsMediaSource()
      return window.MediaSource && window.MediaSource.isTypeSupported
        ? ['mpd', 'hls']
        : ['hls'];
    } else {
      return [];
    }
  }

  initialize() {
    this.fps = null;
    this.vifa = null;

    this.player = new shaka.Player(this.video);
    const ui = new shaka.ui.Overlay(this.player, this.container, this.video);
    this.controls = ui.getControls();

    // Store player instance so that our custom controls may access it
    this.controls.elSxndPlayer = this;

    // TODO: Somehow avoid overriding the SeekBar globally?
    FlatSeekBar.register();

    const config = {
      addSeekBar: true,
      'controlPanelElements': [
        'play_pause',
        'chapters_menu',
        PresentationTimeTracker.register(this.env),
        'spacer',
        'volume',
        'mute',
        ...this.controlPanelButtons,
        'fullscreen',
        'overflow_menu'
      ],
      'overflowMenuButtons': ['language', 'playback_rate', 'loop', 'quality', 'picture_in_picture', 'captions', ...this.overflowMenuButtons],
      'addBigPlayButton': true,
      'seekBarColors': {
        base: 'rgba(255, 255, 255, 0.3)',
        buffered: 'rgba(255, 255, 255, 0.54)',
        played: 'rgb(255, 255, 255)',
        adBreaks: 'rgb(255, 204, 0)',
      }
    };
    ui.configure(config);

    // Listen for error events.
    this.player.addEventListener('error', this.onPlayerErrorEvent.bind(this));
    this.controls.addEventListener('error', this.onUiErrorEvent.bind(this));

    this.player.addEventListener('adaptation', this.handlers.onTrackChange);
    this.player.addEventListener('variantchanged', this.handlers.onTrackChange);
  }

  async loadManifest(manifestUri, startTime) {
    await this.player.load(manifestUri, startTime);

    const manifest = this.player.getManifest();

    for (const imageStream of manifest.imageStreams) {
      // The HLS parser apparently does not report dimensions of thumbnails,
      // so `getThumbnails()` will not return correct size and position of a
      // thumbnail within the tileset. By setting width = 1 and height = 1,
      // we will at least receive the relative size and position, which in
      // `ThumbnailPreview::renderImageAndShow()` we scale to the absolute
      // values.
      // TODO: Dispense of this
      imageStream.width = 1;
      imageStream.height = 1;
    }
  }

  onTrackChange() {
    this.updateFrameRate();
  }

  updateFrameRate() {
    // There should always be at most one active variant
    const fps = this.player.getVariantTracks().find(track => track.active)?.frameRate ?? null;

    if (fps === null) {
      this.fps = null;
      this.vifa = null;
    } else if (fps !== this.fps) {
      this.fps = fps;
      this.vifa = VideoFrame({
        id: this.video.id,
        frameRate: fps,
      });
    }
  }

  setLocale(locale) {
    this.controls.getLocalization().changeLocale([locale]);
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

  pause() {
    this.video.pause();
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
   * Within configured number of seconds of a chapter, jump to the start of the
   * previous chapter. After that, jump to the start of the current chapter. As
   * a fallback, jump to the start of the video.
   */
  prevChapter() {
    this.seekTo(
      this.timeToChapter(this.currentTime - this.constants.prevChapterTolerance) ?? 0
    );
  }

  nextChapter() {
    let cur = this.getCurrentChapter();
    if (cur) {
      this.seekTo(this.chapters.advance(cur, +1));
    }
  }

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
}
