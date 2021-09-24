import shaka from 'shaka-player/dist/shaka-player.ui';

export default class SkipNextButton extends shaka.ui.Element {
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
      this.controls.elSxndPlayer.vifa.seekForward(1);
    });
  }
};

SkipNextButton.Factory = class {
  create(rootElement, controls) {
    return new SkipNextButton(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  SkipNextButton.KEY,
  new SkipNextButton.Factory()
);
