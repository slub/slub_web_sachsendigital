// @ts-check

import shaka from 'shaka-player/dist/shaka-player.ui';

import { e } from '../../lib/util';
import Chapters from '../Chapters';
import ImageFetcher from '../ImageFetcher';
import ThumbnailPreview from '../ThumbnailPreview';
import VariantGroups from '../VariantGroups';

/**
 * Seek bar that is not based on an input range element. This provides more
 * flexibility, and we don't have to deal with interactions between the input
 * thumb and chapter markers.
 *
 * Very much oriented at Shaka's SeekBar and RangeElement. The update method is
 * mostly taken from Shaka.
 *
 * Listens to the following custom events:
 * - {@link SxndVariantGroupsEvent}
 * - {@link SxndChaptersEvent}
 * - {@link SxndFpsEvent}
 *
 * Emits the following custom events:
 * - {@link SxndSeekBarEvent}
 *
 * @implements {shaka.extern.IUISeekBar}
 */
// @ts-expect-error: IUISeekBar extends IUIRangeElement, which we don't
//                   implement (TODO: check back on Shaka?)
export default class FlatSeekBar extends shaka.ui.Element {
  static register() {
    shaka.ui.Controls.registerSeekBar({
      // @ts-expect-error: see above (IUISeekBar / IUIRangeElement)
      create(rootElement, controls) {
        return new FlatSeekBar(rootElement, controls);
      },
    });
  }

  /**
   * @param {HTMLElement} parent
   * @param {shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    this.$container = e("div", { className: "sxnd-seek-bar" }, [
      this.$range = e("div", { className: "range" }),
    ]);

    parent.prepend(this.$container);

    /** @private */
    this.sxnd = {
      /** @type {Chapters | null} */
      chapters: null,
      /** @type {VariantGroups | null} */
      variantGroups: null,
      /** @type {number} */
      value: 0,
      /** @type {shaka.extern.UIConfiguration} */
      uiConfig: controls.getConfig(),
      /** @type {boolean} */
      wasPlaying: false,
      /** @type {shaka.util.Timer | null} */
      seekTimer: null,
      /** @type {ThumbnailPreview | null} */
      thumbnailPreview: null,
      /** @type {string} */
      lastGradientStr: "",
    };

    this.sxnd.seekTimer = new shaka.util.Timer(() => {
      if (this.video !== null) {
        this.video.currentTime = this.getValue();
      }
    });

    if (this.player !== null) {
      this.sxnd.thumbnailPreview = new ThumbnailPreview({
        seekBar: this.$container,
        player: this.player,
        network: new ImageFetcher(),
        interaction: {
          onChangeStart: () => {
            this.controls?.setSeeking(true);

            if (this.video !== null) {
              this.sxnd.wasPlaying = !this.video.paused;
              this.video.pause();
            }
          },
          onChange: (pos) => {
            this.sxnd.value = pos.seconds;
            this.update();
            this.sxnd.seekTimer?.tickAfter(0.125);
          },
          onChangeEnd: () => {
            this.sxnd.seekTimer?.tickNow();
            this.controls?.setSeeking(false);
            if (this.sxnd.wasPlaying) {
              this.video?.play();
            }
          },
        },
      });
    }

    if (this.eventManager) {
      this.eventManager.listen(this.player, 'loaded', () => {
        this.renderChapterMarkers();
      });

      this.eventManager.listen(this.player, 'variantchanged', () => {
        this.updatePreviewImageTracks();
      });

      this.eventManager.listen(this.controls, 'sxnd-variant-groups', (e) => {
        const detail = /** @type {SxndVariantGroupsEvent} */(e).detail;
        this.sxnd.variantGroups = detail.variantGroups;
        this.updatePreviewImageTracks();
      });

      this.eventManager.listen(this.controls, 'sxnd-chapters', (e) => {
        const detail = /** @type {SxndChaptersEvent} */(e).detail;
        this.sxnd.chapters = detail.chapters;
        this.sxnd.thumbnailPreview?.setChapters(detail.chapters);
      });

      this.eventManager.listen(this.controls, 'sxnd-fps', (e) => {
        const detail = /** @type {SxndFpsEvent} */(e).detail;
        this.sxnd.thumbnailPreview?.setFps(detail.fps);
      });

      this.controls?.dispatchEvent(/** @type {SxndSeekBarEvent} */(
        new CustomEvent('sxnd-seek-bar', {
          detail: { seekBar: this },
        })
      ));
    }
  }

  /**
   * @override
   */
  release() {
    if (this.sxnd.seekTimer !== null) {
      this.sxnd.seekTimer.stop();
      this.sxnd.seekTimer = null;
    }

    if (this.sxnd.thumbnailPreview !== null) {
      this.sxnd.thumbnailPreview.release();
      this.sxnd.thumbnailPreview = null;
    }

    super.release();
  }

  /**
   *
   * @returns {boolean}
   */
  isThumbnailPreviewOpen() {
    return this.sxnd.thumbnailPreview?.isVisible ?? false;
  }

  hideThumbnailPreview() {
    this.sxnd.thumbnailPreview?.setIsVisible(false);
  }

  /**
   * @private
   * Adds chapter marker elements to the seekbar.
   */
  renderChapterMarkers() {
    if (this.video === null || this.sxnd.chapters === null) {
      console.log("FlatSeekBar: Missing video or chapters");
      return;
    }

    if (!(this.video.duration > 0)) { // !(NaN > 0)
      return;
    }

    for (const chapter of this.sxnd.chapters) {
      const relative = chapter.timecode / this.video.duration;

      // In particular, make sure that we don't put markers outside of the
      // seekbar for wrong timestamps.
      if (!(0 <= relative && relative < 1)) {
        continue;
      }

      const marker = document.createElement('span');
      marker.className = 'sxnd-chapter-marker';
      marker.style.position = 'absolute';
      marker.style.left = `${relative * 100}%`;

      this.$range.append(marker);
    }
  }

  /**
   * @private
   * Determines which image tracks apply to the current variant group and
   * passes those to the thumbnail preview.
   */
  updatePreviewImageTracks() {
    if (this.sxnd.thumbnailPreview === null) {
      console.warn("FlatSeekBar: Missing player or thumbnail preview");
      return;
    }

    if (this.sxnd.variantGroups === null) {
      return;
    }

    const imageTracks = this.sxnd.variantGroups.findImageTracks();
    this.sxnd.thumbnailPreview.setImageTracks(imageTracks);
  }

  /**
   * @returns {number}
   */
  getValue() {
    return this.sxnd.value;
  }

  /**
   * @returns {boolean}
   */
  isShowing() {
    return true;
  }

  /**
   * @param {number} value
   */
  setValue(value) {
    if (this.controls?.isSeeking()) {
      return;
    }

    this.sxnd.value = value;
  }

  /**
   *
   * @param {string} color
   * @param {number} fract
   * @returns {string}
   */
  makeColor(color, fract) {
    return `${color} ${fract * 100}%`;
  }

  /**
   * Called by Controls on a timer to update the state of the seek bar.
   * Also called internally when the user interacts with the input element.
   */
  update() {
    if (this.video === null) {
      console.warn("FlatSeekBar: Missing video");
      return;
    }

    const duration = this.video.duration;
    if (!(duration > 0)) {
      return;
    }

    const colors = this.sxnd.uiConfig.seekBarColors;
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
      this.sxnd.uiConfig.showUnbufferedStart ? colors.base : colors.played;

    const gradient = [
      'to right',
      this.makeColor(unbufferedColor, bufferStartFraction),
      this.makeColor(colors.played, bufferStartFraction),
      this.makeColor(colors.played, playheadFraction),
      this.makeColor(colors.buffered, playheadFraction),
      this.makeColor(colors.buffered, bufferEndFraction),
      this.makeColor(colors.base, bufferEndFraction),
    ];
    const gradientStr = 'linear-gradient(' + gradient.join(',') + ')';
    if (gradientStr !== this.sxnd.lastGradientStr) {
      this.sxnd.lastGradientStr = gradientStr;
      this.$range.style.background = gradientStr;
    }
  }
}
