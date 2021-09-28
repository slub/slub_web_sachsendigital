import { drawCanvas, generateMetadataObject } from './Screenshot';
import SimpleModal from './SimpleModal';

export default class ScreenshotModal extends SimpleModal {
  constructor(parent, videoDomElement) {
    super(parent, {
      showMetadata: true,
    });

    this._videoDomElement = videoDomElement;
  }

  _createDom() {
    const dom = super._createDom("screenshot-modal");

    dom.title.innerText = "Screenshot";

    const configTmpl = document.createElement("template");
    configTmpl.innerHTML = `
      <div class="screenshot-config">
        <input type="checkbox" id="cb-show-metadata" class="show-metadata"><!--
        --><label for="cb-show-metadata"> Metadaten einblenden</label>

        ·

        <a href="#" class="download-image">Bild herunterladen</a>
      </div>
    `;
    dom.config = configTmpl.content.firstElementChild;
    dom.showMetadata = dom.config.querySelector('.show-metadata');
    dom.showMetadata.checked = this._state.showMetadata;
    dom.showMetadata.addEventListener('change', this.handleChangeShowMetadata.bind(this));
    dom.downloadImage = dom.config.querySelector('.download-image');
    dom.downloadImage.addEventListener('click', this.handleDownloadImage.bind(this));
    dom.body.append(dom.config);

    dom.canvas = document.createElement("canvas");
    dom.body.append(dom.canvas);

    return dom;
  }

  handleChangeShowMetadata(e) {
    this.setState({
      showMetadata: e.target.checked,
    });
  }

  handleDownloadImage(e) {
    e.preventDefault();

    // We could've set `downloadImage.href` in `render()`,
    // but avoid this for performance reasons

    const a = document.createElement("a");
    a.href = this._dom.canvas.toDataURL();
    a.download = "screenshot.png";
    a.click();
  }

  render(state) {
    super.render(state);

    const { show, showMetadata } = state;

    if (show) {
      const metadataArray = showMetadata
        ? window.VIDEO.metadata
        : { metadata: {}, screenshotFields: [] };

      drawCanvas(this._dom.canvas, this._videoDomElement, metadataArray);
    }
  }
}
