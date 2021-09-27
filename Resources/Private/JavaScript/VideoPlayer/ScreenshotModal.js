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
      </div>
    `;
    dom.config = configTmpl.content.firstElementChild;
    dom.showMetadata = dom.config.querySelector('.show-metadata');
    dom.showMetadata.checked = this._state.showMetadata;
    dom.showMetadata.addEventListener('change', this.handleChangeShowMetadata.bind(this));
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

  render(state) {
    super.render(state);

    const { show, showMetadata } = state;

    if (show) {
      const metadataArray = showMetadata
        ? generateMetadataObject(document.getElementById('metadata'))
        : { metadata: {}, screenshotFields: [] };

      drawCanvas(this._dom.canvas, this._videoDomElement, metadataArray);
    }
  }
}
