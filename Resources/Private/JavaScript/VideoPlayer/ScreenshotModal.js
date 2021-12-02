// @ts-check

import Environment from './Environment';
import generateTimecodeUrl from './generateTimecodeUrl';
import imageFormats from './image/imageFormats';
import { drawScreenshot } from './Screenshot';
import SimpleModal from './SimpleModal';
import {
  binaryStringToArrayBuffer,
  blobToBinaryString,
  buildTimeString,
  canvasToBlob,
  download,
  e,
  metadataArrayToString,
  sanitizeBasename,
} from './util';

/**
 * @typedef {{
 *  metadata: MetadataArray | null;
 *  showMetadata: boolean;
 *  timecode: number | null;
 *  supportedImageFormats: ImageFormatDesc[];
 *  selectedImageFormat: ImageFormatDesc | null;
 * }} State
 */

/**
 * @extends {SimpleModal<State>}
 */
export default class ScreenshotModal extends SimpleModal {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Environment} env
   */
  constructor(parent, env) {
    const supportedImageFormats = imageFormats.filter(
      format => env.supportsCanvasExport(format.mimeType)
    );

    super(parent, {
      metadata: null,
      showMetadata: true,
      timecode: null,
      supportedImageFormats,
      selectedImageFormat: supportedImageFormats[0] ?? null,
    });

    /** @private */
    this.env = env;
    /** @private @type {HTMLVideoElement | null} */
    this.videoDomElement = null;

    this.$main.classList.add('screenshot-modal');
    this.$title.innerText = env.t('modal.screenshot.title');

    const idShowMetadata = env.mkid();
    const radioGroup = env.mkid();

    this.$body.append(
      e("div", { className: "screenshot-config" }, [
        e("span", { className: "show-metadata" }, [
          e("input", {
            type: "checkbox",
            id: idShowMetadata,
            checked: this.state.showMetadata,
            $change: this.handleChangeShowMetadata.bind(this),
          }),
          e("label", { htmlFor: idShowMetadata }, [
            env.t('modal.screenshot.show-metadata'),
          ]),
        ]),
        " · ",
        e("span", {}, [
          e("label", {}, [env.t('modal.screenshot.file-format')]),
          ":",
          e("span", {}, (
            this.state.supportedImageFormats.flatMap(format => {
              const radioId = env.mkid();

              return [
                e("input", {
                  id: radioId,
                  name: radioGroup,
                  type: 'radio',
                  checked: format.mimeType === this.state.selectedImageFormat?.mimeType,
                  $change: () => {
                    this.setState({
                      selectedImageFormat: format,
                    });
                  },
                }),
                e("label", { htmlFor: radioId }, [` ${format.label}`]),
              ];
            })
          )),
        ]),
        " · ",
        e("a", {
          href: "#",
          $click: this.handleDownloadImage.bind(this),
        }, [env.t('modal.screenshot.download-image')]),
      ]),

      this.$canvas = e("canvas")
    );
  }

  /**
   * Sets video DOM element for upcoming screenshots.
   *
   * @param {HTMLVideoElement} video
   * @returns {this}
   */
  setVideo(video) {
    this.videoDomElement = video;
    return this;
  }

  /**
   * Triggers UI update using new {@link metadata}.
   *
   * @param {MetadataArray} metadata
   * @returns {this}
   */
  setMetadata(metadata) {
    this.setState({ metadata });
    return this;
  }

  /**
   * Triggers UI update using new {@link timecode}.
   *
   * @param {number} timecode
   * @returns {this}
   */
  setTimecode(timecode) {
    this.setState({ timecode });
    return this;
  }

  /**
   * @private
   * @param {Event} e
   */
  handleChangeShowMetadata(e) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    this.setState({
      showMetadata: e.target.checked,
    });
  }

  /**
   * @private
   * @param {MouseEvent} e
   */
  async handleDownloadImage(e) {
    e.preventDefault();

    // We could've set `.download-image[href]` in `render()` or in the radio
    // box change listener, but avoid this for performance reasons.

    const { metadata, timecode, selectedImageFormat } = this.state;
    if (metadata === null || timecode === null || selectedImageFormat === null) {
      console.error("one of [metadata, timecode, selectedImageFormat] is null");
      return;
    }

    const image = await this.makeImageBlob(
      this.$canvas, selectedImageFormat, metadata, timecode);
    const filename = this.getFilename(metadata, timecode);

    download(image, filename);
  }

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {ImageFormatDesc} imageFormat
   * @param {MetadataArray} metadata
   * @param {number} timecode
   */
  async makeImageBlob(canvas, imageFormat, metadata, timecode) {
    const imageBlob = await canvasToBlob(canvas, imageFormat.mimeType);
    const imageDataStr = await blobToBinaryString(imageBlob);
    const image = imageFormat.parseBinaryString(imageDataStr);

    if (image) {
      const url = generateTimecodeUrl(timecode, this.env);

      image.addMetadata({
        title: metadata.metadata.title?.[0] ?? "",
        // NOTE: Don't localize (not only relevant to current user)
        comment: `Screenshot taken on Sachsen.Digital.\n\n${url.toString()}`,
      });
      const buffer = binaryStringToArrayBuffer(image.toBinaryString());
      return new Blob([buffer], { type: imageBlob.type });
    } else {
      return imageBlob;
    }
  }

  /**
   *
   * @param {MetadataArray} metadata
   * @param {number} timecode
   */
  getFilename(metadata, timecode) {
    // NOTE: Don't localize (English file name prefix should be alright)
    return sanitizeBasename(
      `Screenshot-${metadata.metadata.title?.[0] ?? "Unnamed"}-T${buildTimeString(timecode, true)}`
    );
  }

  /**
   *
   * @param {MetadataArray | null} metadata
   * @returns {import('./Screenshot').ScreenshotCaption[]}
   */
  getCaptions(metadata) {
    return [
      { v: 'bottom', h: 'left', text: "https://sachsen.digital" },
      { v: 'bottom', h: 'right', text: metadata ? metadataArrayToString(metadata) : "" },
    ];
  }

  /**
   *
   * @param {import('./SimpleModal').BaseState & State} state
   */
  render(state) {
    super.render(state);

    const { show, metadata, showMetadata } = state;

    if (this.videoDomElement === null) {
      // TODO: Error handling
      return;
    }

    if (show && (!this.state.show || showMetadata !== this.state.showMetadata)) {
      const config = {
        captions: showMetadata ? this.getCaptions(metadata) : [],
      };

      drawScreenshot(this.$canvas, this.videoDomElement, config);
    }
  }
}
