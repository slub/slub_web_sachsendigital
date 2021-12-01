import Environment from './Environment';
import JPEG from './image/jpeg';
import PNG from './image/png';
import { drawCanvas } from './Screenshot';
import SimpleModal from './SimpleModal';
import { binaryStringToArrayBuffer, blobToBinaryString, buildTimeString, canvasToBlob, metadataArrayToString, sanitizeBasename, templateElement, withObjectUrl } from './util';

const imageFormats = [
  {
    mimeType: 'image/png',
    label: "PNG",
    parseBinaryString: (s) => {
      return PNG.fromBinaryString(s);
    },
  },
  {
    mimeType: 'image/jpeg',
    label: "JPEG",
    parseBinaryString: (s) => {
      return JPEG.fromBinaryString(s);
    },
  },
  {
    mimeType: 'image/tiff',
    label: "TIFF",
    parseBinaryString: () => { },
  },
];

export default class ScreenshotModal extends SimpleModal {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Environment} env
   * @param {object} config
   * @param {HTMLVideoElement} video
   */
  constructor(parent, env, config) {
    const supportedImageFormats = imageFormats.filter(format => env.supportsCanvasExport(format.mimeType));

    super(parent, {
      env,
      metadata: null,
      showMetadata: true,
      timecode: null,
      supportedImageFormats,
      selectedImageFormat: supportedImageFormats[0],
    });

    this._videoDomElement = config.video;
  }

  createDom() {
    const env = this.state.env;
    const dom = super.createDom("screenshot-modal");

    dom.title.innerText = env.t('modal.screenshot.title');

    const idShowMetadata = env.mkid();

    dom.config = templateElement(`
      <div class="screenshot-config">
        <span class="show-metadata">
          <input type="checkbox" id="${idShowMetadata}"><!--
          --><label for="${idShowMetadata}"></label>
        </span>

        ·

        <span class="image-format">
          <label></label>:
          <span class="format-list"></span>
        </span>

        ·

        <a href="#" class="download-image"></a>
      </div>
    `);
    dom.showMetadata = dom.config.querySelector('.show-metadata input[type=checkbox]');
    dom.showMetadata.checked = this.state.showMetadata;
    dom.showMetadata.addEventListener('change', this.handleChangeShowMetadata.bind(this));
    dom.showMetadataLabel = dom.config.querySelector('.show-metadata label');
    dom.showMetadataLabel.innerText = env.t('modal.screenshot.show-metadata');
    dom.formatListLabel = dom.config.querySelector('.image-format label');
    dom.formatListLabel.innerText = env.t('modal.screenshot.file-format');
    dom.formatListSpan = dom.config.querySelector('.image-format .format-list');
    const radioGroup = env.mkid();
    for (const format of this.state.supportedImageFormats) {
      const radioId = env.mkid();

      const radio = document.createElement('input');
      radio.id = radioId;
      radio.name = radioGroup;
      radio.type = 'radio';
      radio.checked = format.mimeType === this.state.selectedImageFormat.mimeType;
      radio.addEventListener('change', () => {
        this.setState({
          selectedImageFormat: format,
        });
      });

      const label = document.createElement('label');
      label.htmlFor = radioId;
      label.innerText = ` ${format.label}`;

      dom.formatListSpan.append(radio, label);
    }
    dom.downloadImage = dom.config.querySelector('.download-image');
    dom.downloadImage.innerText = env.t('modal.screenshot.download-image');
    dom.downloadImage.addEventListener('click', this.handleDownloadImage.bind(this));
    dom.body.append(dom.config);

    dom.canvas = document.createElement("canvas");
    dom.body.append(dom.canvas);

    return dom;
  }

  setMetadata(metadata) {
    this.setState({ metadata });
    return this;
  }

  setTimecode(timecode) {
    this.setState({ timecode });
    return this;
  }

  handleChangeShowMetadata(e) {
    this.setState({
      showMetadata: e.target.checked,
    });
  }

  async handleDownloadImage(e) {
    e.preventDefault();

    // We could've set `downloadImage.href` in `render()` or in the radio box
    // change listener, but avoid this for performance reasons

    const imageFormat = this.state.selectedImageFormat;
    const imageTitle = this.state.metadata.metadata.title;

    const imageBlob = await canvasToBlob(this.dom.canvas, imageFormat.mimeType);
    const imageDataStr = await blobToBinaryString(imageBlob);
    const image = imageFormat.parseBinaryString(imageDataStr);

    let outputBlob = imageBlob;

    if (image) {
      // TODO: Extract this to avoid redundancy with BookmarkModal?
      const url = new URL(window.location);
      url.searchParams.set('timecode', this.state.timecode);

      image.addMetadata({
        title: imageTitle,
        // NOTE: Don't localize (not only relevant to current user)
        comment: `Screenshot taken on Sachsen.Digital.\n\n${url.toString()}`,
      });
      const buffer = binaryStringToArrayBuffer(image.toBinaryString());
      outputBlob = new Blob([buffer], { type: imageBlob.type });
    }

    withObjectUrl(outputBlob, (objectUrl) => {
      const a = document.createElement("a");
      a.href = objectUrl;
      // NOTE: Don't localize (English file name prefix should be alright)
      a.download = sanitizeBasename(`Screenshot-${imageTitle}-T${buildTimeString(this.state.timecode, true)}`);
      a.click();
    });
  }

  render(state) {
    super.render(state);

    const { show, metadata, showMetadata } = state;

    if (show && (!this.state.show || showMetadata !== this.state.showMetadata)) {
      drawCanvas(this.dom.canvas, this._videoDomElement, {
        captions: showMetadata
          ? [
            { v: 'bottom', h: 'left', text: "https://sachsen.digital" },
            { v: 'bottom', h: 'right', text: metadataArrayToString(metadata) },
          ]
          : []
      });
    }
  }
}
