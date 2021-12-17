// @ts-check

import shaka from 'shaka-player/dist/shaka-player.ui';
import VideoFrame from '../vendor/VideoFrame';

import { clamp, e } from '../../lib/util';
import buildTimeString from '../lib/buildTimeString';
import Chapters from '../Chapters';

/**
 * @typedef {'current-time' | 'remaining-time' | 'current-frame'} TimeModeKey
 */

/**
 * @readonly
 * @enum {number}
 */
const TimeMode = {
  CurrentTime: 0,
  RemainingTime: 1,
  CurrentFrame: 2,
  COUNT: 3,
};

/**
 * @typedef {{
 *  isReady: boolean;
 *  activeMode: number;
 *  duration: number;
 *  totalSeconds: number;
 *  vifa: VideoFrame | null;
 *  fps: number | null;
 *  chapters: Chapters | null;
 * }} State
 */

/**
 * Control panel element to show current playback time.
 *
 * Originally based upon Shaka's PresentationTimeTracker.
 *
 * Listens to the following custom events:
 * - {@link SxndChaptersEvent}
 * - {@link SxndFpsEvent}
 */
export default class PresentationTimeTracker extends shaka.ui.Element {
  /**
   * Registers a factory with specified configuration. The returned key may
   * be added to `controlPanelElements` in shaka-player config.
   *
   * @param {Translator & Identifier} env
   */
  static register(env) {
    const key = env.mkid();

    shaka.ui.Controls.registerElement(key, {
      create(rootElement, controls) {
        return new PresentationTimeTracker(rootElement, controls, env);
      },
    });

    return key;
  }

  /**
   * @param {HTMLElement} parent
   * @param {shaka.ui.Controls} controls
   * @param {Translator} env
   */
  constructor(parent, controls, env) {
    super(parent, controls);

    const currentTime = e('button', { className: 'shaka-current-time' });
    parent.appendChild(currentTime);

    /** @private */
    this.sxnd = {
      env,
      currentTime,

    };

    /**
     * @private
     * @type {State}
     */
    this.state = {
      isReady: false,
      activeMode: TimeMode.CurrentTime,
      totalSeconds: 0,
      duration: 0,
      vifa: null,
      fps: null,
      chapters: null,
    };

    if (this.eventManager) {
      this.eventManager.listen(currentTime, 'click', () => {
        this.render({
          activeMode: (this.state.activeMode + 1) % TimeMode.COUNT,
        });
      });

      const updateTime = this.updateTime.bind(this);
      this.eventManager.listen(this.controls, 'timeandseekrangeupdated', updateTime);

      this.eventManager.listen(this.controls, 'sxnd-chapters', (e) => {
        const detail = /** @type {SxndChaptersEvent} */(e).detail;
        this.render({
          chapters: detail.chapters,
        });
      });

      this.eventManager.listen(this.controls, 'sxnd-fps', (e) => {
        const detail = /** @type {SxndFpsEvent} */(e).detail;
        this.render({
          vifa: detail.vifa,
          fps: detail.fps,
        });
      });
    }
  }

  updateTime() {
    if (this.controls === null || this.video === null || this.video.readyState < 1) {
      this.render({
        isReady: false,
      });
    } else {
      let duration = this.video.duration;
      if (!(duration >= 0)) { // NaN -> 0
        duration = 0;
      }

      this.render({
        isReady: true,
        duration,
        totalSeconds: clamp(this.controls.getDisplayTime(), [0, duration]),
      });
    }
  }

  /**
   *
   * @param {Partial<State>} state
   */
  render(state) {
    const { env, currentTime } = this.sxnd;
    const newState = Object.assign({}, this.state, state);

    const newKeys = /** @type {(keyof State)[]} */(Object.keys(state));
    const shouldUpdate = newKeys.some(key => state[key] !== this.state[key]);

    if (shouldUpdate) {
      const tKey = /** @type {TimeModeKey} */({
        [TimeMode.CurrentTime]: 'current-time',
        [TimeMode.RemainingTime]: 'remaining-time',
        [TimeMode.CurrentFrame]: 'current-frame',
      }[newState.activeMode] ?? 'current-time');

      currentTime.textContent = this.getTimecodeText(tKey, newState);
      currentTime.title = env.t(`control.time.${tKey}.tooltip`);
    }

    this.state = newState;
  }

  /**
   *
   * @param {TimeModeKey} tKey
   * @param {Pick<State, 'isReady' | 'totalSeconds' | 'duration' | 'vifa' | 'fps'
   * | 'chapters'>} state
   * @returns {string}
   */
  getTimecodeText(tKey, { isReady, totalSeconds, duration, vifa, fps, chapters }) {
    // Don't show incomplete info when duration is not yet available
    if (!isReady || duration === 0) {
      return this.sxnd.env.t('player.loading');
    } else {
      const showHour = duration >= 3600;

      const textValues = {
        get chapterTitle() {
          return chapters?.timeToChapter(totalSeconds)?.title ?? "_";
        },
        get currentTime() {
          return buildTimeString(totalSeconds, showHour, fps);
        },
        get totalTime() {
          return buildTimeString(duration, showHour, fps);
        },
        get remainingTime() {
          return buildTimeString(duration - totalSeconds, showHour, fps);
        },
        get currentFrame() {
          return vifa?.get() ?? -1;
        },
      };

      return this.sxnd.env.t(`control.time.${tKey}.text`, textValues);
    }
  }
}
