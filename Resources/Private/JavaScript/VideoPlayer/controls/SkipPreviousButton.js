export default class SkipPreviousButton extends shaka.ui.Element {
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
      this.controls.elSxndPlayer.vifa.seekBackward(1);
    });
  }
};

SkipPreviousButton.Factory = class {
  create(rootElement, controls) {
    return new SkipPreviousButton(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  SkipPreviousButton.KEY,
  new SkipPreviousButton.Factory()
);
