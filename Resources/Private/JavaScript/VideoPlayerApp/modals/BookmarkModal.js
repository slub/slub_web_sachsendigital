// @ts-check

import { e } from '../../lib/util';
import { buildTimeString } from '../../VideoPlayer';
import generateTimecodeUrl from '../lib/generateTimecodeUrl';
import SimpleModal from '../lib/SimpleModal';

/**
 * @typedef {{
 *  timecode: number | null;
 *  fps: number;
 *  startAtTimecode: boolean;
 * }} State
 */

/**
 * @extends {SimpleModal<State>}
 */
export default class BookmarkModal extends SimpleModal {
  /**
   *
   * @param {HTMLElement} element
   * @param {Translator & Identifier & Browser} env
   */
  constructor(element, env) {
    super(element, {
      timecode: null,
      fps: 0,
      startAtTimecode: true,
    });

    /** @private */
    this.env = env;

    this.$main.classList.add('bookmark-modal');
    this.$title.innerText = this.env.t('modal.bookmark.title');

    const startAtCheckId = this.env.mkid();

    this.$body.append(
      e("div", {}, [
        e("div", { className: "url-line" }, [
          this.$urlInput = e("input", {
            type: "url",
            readOnly: true,
            value: "https://sachsen.digital",
          }),
          e("a", {
            href: "javascript:void(0)",
            className: "copy-to-clipboard",
            title: this.env.t('modal.bookmark.copy-link'),
            $click: this.handleCopyToClipboard.bind(this),
          }, [
            e("i", { className: "material-icons-round" }, ["content_copy"]),
          ]),
        ]),
        this.$startAt = e("div", { className: "start-at" }, [
          this.$startAtCheck = e("input", {
            type: "checkbox",
            id: startAtCheckId,
            $change: this.handleChangeStartAtTimecode.bind(this),
          }),
          this.$startAtLabel = e("label", { htmlFor: startAtCheckId }),
        ]),
      ])
    );
  }

  async handleCopyToClipboard() {
    const url = this.generateUrl(this.state);

    // Besides being necessary for `execCommand`, the focus is also meant to
    // provide visual feedback to the user.
    // TODO: Improve user feedback, also when an exception occurs
    this.$urlInput.focus();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    } else {
      document.execCommand('copy');
    }
  }

  /**
   *
   * @param {Event} e
   */
  handleChangeStartAtTimecode(e) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    this.setState({
      startAtTimecode: e.target.checked,
    });
  }

  /**
   *
   * @param {number} timecode
   * @returns {this}
   */
  setTimecode(timecode) {
    this.setState({ timecode });
    return this;
  }

  /**
   *
   * @param {number} fps
   * @returns {this}
   */
  setFps(fps) {
    this.setState({ fps });
    return this;
  }

  /**
   * @private
   * @param {State} state
   */
  generateUrl(state) {
    const timecode = state.startAtTimecode ? state.timecode : null;
    return generateTimecodeUrl(timecode, this.env).toString();
  }

  /**
   * @override
   * @param {import('../lib/SimpleModal').BaseState & State} state
   */
  render(state) {
    super.render(state);

    const { show, timecode, fps, startAtTimecode } = state;

    this.$urlInput.value = this.generateUrl(state);

    // TODO: Just disable when timecode is 0?
    if (timecode === null || timecode === 0) {
      this.$startAt.classList.remove('shown');
    } else {
      this.$startAtCheck.checked = startAtTimecode;
      this.$startAtLabel.innerText =
        this.env.t('modal.bookmark.start-at-current-time', {
          timecode: buildTimeString(timecode, true, fps),
        });

      this.$startAt.classList.add('shown');
    }

    if (show && show !== this.state.show) {
      this.$urlInput.select();
    }
  }
}
