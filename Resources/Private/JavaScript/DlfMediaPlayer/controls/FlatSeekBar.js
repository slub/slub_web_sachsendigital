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
 * - {@link dlf.media.VariantGroupsEvent}
 * - {@link dlf.media.ChaptersEvent}
 * - {@link dlf.media.FpsEvent}
 *
 * Emits the following custom events:
 * - {@link dlf.media.SeekBarEvent}
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

    this.$container = e("div", { className: "dlf-media-flat-seek-bar" }, [
      this.$range = e("div", { className: "range" }),
    ]);

    parent.prepend(this.$container);

    /** @private Avoid naming conflicts with parent class */
    this.dlf = {
      /** @type {Chapters | null} */
      chapters: null,
      /** @type {boolean} */
      hasRenderedChapters: false,
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

    this.dlf.seekTimer = new shaka.util.Timer(() => {
      if (this.video !== null) {
        this.video.currentTime = this.getValue();

        this.controls?.dispatchEvent(/** @type {dlf.media.ManualSeekEvent} */(
          new CustomEvent('dlf-media-manual-seek', {})
        ));
      }
    });

    if (this.player !== null) {
      this.dlf.thumbnailPreview = new ThumbnailPreview({
        seekBar: this.$container,
        player: this.player,
        network: new ImageFetcher(),
        interaction: {
          onChangeStart: () => {
            this.controls?.setSeeking(true);

            if (this.video !== null) {
              this.dlf.wasPlaying = !this.video.paused;
              this.video.pause();
            }
          },
          onChange: (pos) => {
            this.dlf.value = pos.seconds;
            this.update();
            this.dlf.seekTimer?.tickAfter(0.125);
          },
          onChangeEnd: () => {
            this.dlf.seekTimer?.tickNow();
            this.controls?.setSeeking(false);
            if (this.dlf.wasPlaying) {
              this.video?.play();
            }
          },
        },
      });
    }

    if (this.eventManager) {
      this.eventManager.listen(this.player, 'loaded', () => {
        this.update();
      });

      this.eventManager.listen(this.player, 'variantchanged', () => {
        this.updatePreviewImageTracks();
      });

      this.eventManager.listen(this.controls, 'dlf-media-variant-groups', (e) => {
        const detail = /** @type {dlf.media.VariantGroupsEvent} */(e).detail;
        this.dlf.variantGroups = detail.variantGroups;
        this.updatePreviewImageTracks();
      });

      this.eventManager.listen(this.controls, 'dlf-media-chapters', (e) => {
        const detail = /** @type {dlf.media.ChaptersEvent} */(e).detail;
        this.dlf.chapters = detail.chapters;
        this.dlf.hasRenderedChapters = false;
        this.dlf.thumbnailPreview?.setChapters(detail.chapters);
        this.update();
      });

      this.eventManager.listen(this.controls, 'dlf-media-fps', (e) => {
        const detail = /** @type {dlf.media.FpsEvent} */(e).detail;
        if (detail.fps) {
          this.dlf.thumbnailPreview?.setFps(detail.fps?.rate);
        }
      });

      this.controls?.dispatchEvent(/** @type {dlf.media.SeekBarEvent} */(
        new CustomEvent('dlf-media-seek-bar', {
          detail: { seekBar: this },
        })
      ));
    }
  }

  /**
   * @override
   */
  release() {
    if (this.dlf.seekTimer !== null) {
      this.dlf.seekTimer.stop();
      this.dlf.seekTimer = null;
    }

    if (this.dlf.thumbnailPreview !== null) {
      this.dlf.thumbnailPreview.release();
      this.dlf.thumbnailPreview = null;
    }

    super.release();
  }

  get thumbnailPreview() {
    return this.dlf.thumbnailPreview;
  }

  /**
   *
   * @returns {boolean}
   */
  isThumbnailPreviewOpen() {
    return this.dlf.thumbnailPreview?.isVisible ?? false;
  }

  /**
   * Stop any active seeking/scrubbing and close thumbnail preview.
   */
  endSeek() {
    this.dlf.thumbnailPreview?.endChange();
    this.dlf.thumbnailPreview?.setIsVisible(false);
  }

  /**
   *
   * @param {boolean} value
   */
  setThumbnailSnap(value) {
    this.dlf.thumbnailPreview?.setThumbnailSnap(value);
  }

  /**
   * Adds chapter marker elements to the seekbar.
   *
   * @private
   * @param {Chapters} chapters
   * @param {number} duration Duration of the video to be assumed.
   */
  renderChapterMarkers(chapters, duration) {
    // Clear chapter markers, which would allow a full refresh
    this.$range.querySelectorAll('.dlf-media-chapter-marker').forEach((marker) => {
      marker.remove();
    });

    for (const chapter of chapters) {
      const relative = chapter.timecode / duration;

      // In particular, make sure that we don't put markers outside of the
      // seekbar for wrong timestamps.
      if (!(0 <= relative && relative < 1)) {
        continue;
      }

      const marker = document.createElement('span');
      marker.className = 'dlf-media-chapter-marker';
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
    if (this.dlf.thumbnailPreview === null) {
      console.warn("FlatSeekBar: Missing thumbnail preview");
      return;
    }

    if (this.dlf.variantGroups === null) {
      return;
    }

    const thumbTracks = this.dlf.variantGroups.findThumbnailTracks();
    this.dlf.thumbnailPreview.setThumbnailTracks(thumbTracks);
  }

  /**
   * @returns {number}
   */
  getValue() {
    return this.dlf.value;
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

    this.dlf.value = value;
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

    if (this.dlf.chapters !== null && !this.dlf.hasRenderedChapters) {
      this.renderChapterMarkers(this.dlf.chapters, duration);
      this.dlf.hasRenderedChapters = true;
    }

    const colors = this.dlf.uiConfig.seekBarColors;
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
      this.dlf.uiConfig.showUnbufferedStart ? colors.base : colors.played;

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
    if (gradientStr !== this.dlf.lastGradientStr) {
      this.dlf.lastGradientStr = gradientStr;
      this.$range.style.background = gradientStr;
    }
  }
}
