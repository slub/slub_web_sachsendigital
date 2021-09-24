import shaka from 'shaka-player/dist/shaka-player.ui';

export default class Replay10Button extends shaka.ui.Element {
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
