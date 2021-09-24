import { renderScreenshot } from '../Screenshot';

export default class CaptureButton extends shaka.ui.Element {
  static KEY = 'capture';

  constructor(parent, controls) {
    super(parent, controls);

    // The actual button that will be displayed
    this.button_ = document.createElement('button');
    this.button_.className = 'material-icons-round';
    this.button_.title = 'Screenshot';
    this.button_.textContent = 'photo_camera';
    this.parent.appendChild(this.button_);

    // Listen for clicks on the button
    this.eventManager.listen(this.button_, 'click', () => {
      renderScreenshot(this.controls.elSxndPlayer.video);
    });
  }
};

CaptureButton.Factory = class {
  create(rootElement, controls) {
    return new CaptureButton(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  CaptureButton.KEY,
  new CaptureButton.Factory()
);
