import shaka from 'shaka-player/dist/shaka-player.ui';

import Environment from '../Environment';
import { buildTimeString } from '../util';

const TimeMode = {
  CurrentTime: 0,
  RemainingTime: 1,
  CurrentFrame: 2,
  COUNT: 3,
};

export default class PresentationTimeTracker extends shaka.ui.Element {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   * @param {Environment} env
   */
  constructor(parent, controls, env) {
    super(parent, controls);

    this.env = env;

    /** @type {!HTMLButtonElement} */
    this.currentTime_ = document.createElement('button');
    this.currentTime_.classList.add('shaka-current-time');
    this.parent.appendChild(this.currentTime_);

    this.state = {
      activeMode: TimeMode.CurrentTime,
    };

    this.eventManager.listen(this.currentTime_, 'click', () => {
      this.render({
        activeMode: (this.state.activeMode + 1) % TimeMode.COUNT,
      });
    });

    this.eventManager.listen(this.controls, 'timeandseekrangeupdated', () => {
      this.render({
        duration: this.controls.elSxndPlayer.video.duration,
        totalSeconds: this.controls.getDisplayTime(),
      });
    });
  }

  /**
   *
   * @param {Environment} env
   */
  static register(env) {
    const key = env.mkid();

    shaka.ui.Controls.registerElement(key, {
      create(rootElement, controls) {
        return new PresentationTimeTracker(rootElement, controls, env);
      }
    });

    return key;
  }

  render(state) {
    const newState = Object.assign({}, this.state, state);

    const { totalSeconds, duration, activeMode } = newState;
    if (totalSeconds !== this.state.totalSeconds || duration !== this.state.duration || activeMode !== this.state.activeMode) {
      let text = "";
      let title = "";

      // Don't show incomplete info when duration is not yet available
      if (Number.isFinite(duration)) {
        const elSxndPlayer = this.controls.elSxndPlayer;
        const showHour = duration >= 3600;

        switch (activeMode) {
          case TimeMode.CurrentTime:
          default:
            text = buildTimeString(totalSeconds, showHour);
            if (elSxndPlayer.vifa) {
              text += ':' + ("0" + (elSxndPlayer.vifa.get() % elSxndPlayer.fps)).slice(-2);
            }
            text += ' / ' + buildTimeString(duration, showHour);
            title = this.env.t('control.time.current-time.tooltip');
            break;

          case TimeMode.RemainingTime:
            text = this.env.t('control.time.remaining-time.text', { timecode: buildTimeString(elSxndPlayer.video.duration - totalSeconds, showHour) });
            title = this.env.t('control.time.remaining-time.tooltip');
            break;

          case TimeMode.CurrentFrame:
            text = `${elSxndPlayer.vifa?.get() ?? this.env.t('control.time.current-frame.unknown')}`;
            title = this.env.t('control.time.current-frame.tooltip');
            break;
        }

        let currentChapter = elSxndPlayer.chapters.timeToChapter(totalSeconds);
        if (currentChapter) {
          text += ` – ${currentChapter.title}`;
        }
      }

      this.currentTime_.textContent = text;
      this.currentTime_.title = title;
    }

    this.state = newState;
  }
};
