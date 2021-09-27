import { drawCanvas, generateMetadataObject } from './Screenshot';
import SimpleModal from './SimpleModal';

export default class ScreenshotModal extends SimpleModal {
  constructor(element) {
    super(element);
  }

  _createDom() {
    const dom = super._createDom("screenshot-modal");

    dom.title.innerText = "Screenshot";

    dom.canvas = document.createElement("canvas");
    dom.body.append(dom.canvas);

    return dom;
  }

  takeScreenshot(videoDomElement) {
    const metadataElement = document.getElementById('metadata');
    const metadataArray = generateMetadataObject(metadataElement);
    drawCanvas(this._dom.canvas, videoDomElement, metadataArray);

    return this;
  }
}
