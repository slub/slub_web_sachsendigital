import shaka from 'shaka-player/dist/shaka-player.ui';

import { buildTimeString } from '../util';

const TimeMode = {
  CurrentTime: 0,
  RemainingTime: 1,
  CurrentFrame: 2,
  COUNT: 3,
};

export default class PresentationTimeTracker extends shaka.ui.Element {
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
