import shaka from 'shaka-player/dist/shaka-player.ui';

import ImageFetcher from '../ImageFetcher';
import ThumbnailPreview from '../ThumbnailPreview';
import { templateElement } from '../util';

/**
 * Seek bar that is not based on an input range element. This provides more
 * flexibility, and we don't have to deal with interactions between the input
 * thumb and chapter markers.
 *
 * Very much oriented at Shaka's SeekBar and RangeElement. The update method is
 * mostly taken from Shaka.
 *
 * @implements {shaka.extern.IUISeekBar}
 */
export default class FlatSeekBar extends shaka.ui.Element {
  static register() {
    shaka.ui.Controls.registerSeekBar({
      create(rootElement, controls) {
        return new FlatSeekBar(rootElement, controls);
      }
    });
  }

  constructor(parent, controls) {
    super(parent, controls);

    this._value = 0;
    this._config = controls.getConfig();

    const container = templateElement(`
      <div class="sxnd-seek-bar">
        <div class="range"></div>
      </div>
    `);
    parent.prepend(container);

    this._dom = {
      container,
      range: container.querySelector('.range'),
    };

    this._seekTimer = new shaka.util.Timer(() => {
      this.video.currentTime = this.getValue();
    });

    this._wasPlaying = false;

    this._thumbnailPreview = new ThumbnailPreview({
      seekBar: this._dom.container,
      player: this.player,
      getFps: () => this.controls.elSxndPlayer.fps,
      getChapter: (timecode) => this.controls.elSxndPlayer.chapters.timeToChapter(timecode),
      network: new ImageFetcher(),
      interaction: {
        onChangeStart: () => {
          this._wasPlaying = !this.video.paused;
          this.controls.setSeeking(true);
          this.video.pause();
        },
        onChange: (pos) => {
          this._value = pos.seconds;
          this.update();
          this._seekTimer.tickAfter(0.125);
        },
        onChangeEnd: () => {
          this._seekTimer.tickNow();
          this.controls.setSeeking(false);
          if (this._wasPlaying) {
            this.video.play();
          }
        },
      },
    });

    this.eventManager.listen(this.player, 'loaded', () => {
      this.renderChapterMarkers();
    });

    this.eventManager.listen(this.controls, 'sxnd-thumbs-close', () => {
      this._thumbnailPreview.setIsVisible(false);
    });
  }

  /**
   * @override
   */
  release() {
    this._seekTimer.stop();
    this._seekTimer = null;

    this._thumbnailPreview.release();
    this._thumbnailPreview = null;

    super.release();
  }

  /**
   * @override
   */
  getValue() {
    return this._value;
  }

  /**
   * @override
   */
  setValue(value) {
    if (this.controls.isSeeking()) {
      return;
    }

    this._value = value;
  }

  makeColor_(color, fract) {
    return color + ' ' + (fract * 100) + '%';
  }

  /**
   * Called by Controls on a timer to update the state of the seek bar.
   * Also called internally when the user interacts with the input element.
   *
   * @override
   */
  update() {
    const duration = this.video.duration;
    if (!duration) {
      return;
    }

    const colors = this._config.seekBarColors;
    const currentTime = this.getValue();
    const bufferedLength = this.video.buffered.length;
    const bufferedStart = bufferedLength ? this.video.buffered.start(0) : 0;
    const bufferedEnd =
      bufferedLength ? this.video.buffered.end(bufferedLength - 1) : 0;

    // TODO: Use duration or seekRange?
    // const seekRange = this.player.seekRange();
    const seekRange = {
      start: 0,
      end: duration,
    };
    const seekRangeSize = seekRange.end - seekRange.start;

    if (bufferedLength == 0) {
      this._dom.range.style.background = colors.base;
    } else {
      const clampedBufferStart = Math.max(bufferedStart, seekRange.start);
      const clampedBufferEnd = Math.min(bufferedEnd, seekRange.end);
      const clampedCurrentTime = Math.min(
        Math.max(currentTime, seekRange.start),
        seekRange.end);

      const bufferStartDistance = clampedBufferStart - seekRange.start;
      const bufferEndDistance = clampedBufferEnd - seekRange.start;
      const playheadDistance = clampedCurrentTime - seekRange.start;

      // NOTE: the fallback to zero eliminates NaN.
      const bufferStartFraction = (bufferStartDistance / seekRangeSize) || 0;
      const bufferEndFraction = (bufferEndDistance / seekRangeSize) || 0;
      const playheadFraction = (playheadDistance / seekRangeSize) || 0;

      const unbufferedColor =
        this._config.showUnbufferedStart ? colors.base : colors.played;

      const gradient = [
        'to right',
        this.makeColor_(unbufferedColor, bufferStartFraction),
        this.makeColor_(colors.played, bufferStartFraction),
        this.makeColor_(colors.played, playheadFraction),
        this.makeColor_(colors.buffered, playheadFraction),
        this.makeColor_(colors.buffered, bufferEndFraction),
        this.makeColor_(colors.base, bufferEndFraction),
      ];
      this._dom.range.style.background =
        'linear-gradient(' + gradient.join(',') + ')';
    }
  }

  /**
   * @override
   */
  isShowing() {
    return true;
  }

  renderChapterMarkers() {
    const { video, chapters } = this.controls.elSxndPlayer;

    if (!(video.duration > 0)) {
      return;
    }

    for (const chapter of chapters) {
      const relative = chapter.timecode / video.duration;

      // In particular, make sure that we don't put markers outside of the
      // seekbar for wrong timestamps.
      if (!(0 <= relative && relative < 1)) {
        continue;
      }

      const marker = document.createElement('span');
      marker.className = 'sxnd-chapter-marker';
      marker.style.position = 'absolute';
      marker.style.left = `${relative * 100}%`;

      this._dom.range.append(marker);
    }
  }
}
