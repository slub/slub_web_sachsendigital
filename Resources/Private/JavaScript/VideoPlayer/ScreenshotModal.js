import { drawCanvas, generateMetadataObject } from './Screenshot';
import SimpleModal from './SimpleModal';

export default class ScreenshotModal extends SimpleModal {
  constructor(element) {
    super(element);

    this._canvas = this._element.querySelector('canvas');
  }

  takeScreenshot(videoDomElement) {
    const metadataElement = document.getElementById('metadata');
    const metadataArray = generateMetadataObject(metadataElement);
    drawCanvas(this._canvas, videoDomElement, metadataArray);

    return this;
  }
}
