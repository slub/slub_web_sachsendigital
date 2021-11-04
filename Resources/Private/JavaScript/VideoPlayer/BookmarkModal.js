import Environment from './Environment';
import SimpleModal from './SimpleModal';
import { buildTimeString, templateElement } from './util';

export default class BookmarkModal extends SimpleModal {
  /**
   *
   * @param {HTMLElement} element
   * @param {Environment} env
   */
  constructor(element, env) {
    super(element, {
      env,
      timecode: null,
      startAtTimecode: true,
    });
  }

  _createDom() {
    const dom = super._createDom("bookmark-modal");

    dom.title.innerText = "Bookmark (Link teilen)";

    const startAtCheckId = this._state.env.mkid();
    dom.container = templateElement(`
      <div>
        <div class="url-line">
          <input type="url" readonly value="https://sachsen.digital">
          <a href="javascript:void(0)" class="copy-to-clipboard" title="Link kopieren">
            <i class="material-icons-round">content_copy</i>
          </a>
        </div>
        <div class="start-at">
          <input type="checkbox" id="${startAtCheckId}"><!--
          --><label for="${startAtCheckId}">
            Bei aktueller Zeit (<span class="start-at-timecode-label"></span>) starten.
          </label>
        </div>
      </div>
    `);
    dom.url = dom.container.querySelector('input');
    dom.copyToClipboard = dom.container.querySelector('.copy-to-clipboard');
    dom.copyToClipboard.addEventListener('click', this.handleCopyToClipboard.bind(this));
    dom.startAt = dom.container.querySelector('.start-at');
    dom.startAtTimecodeCheck = dom.container.querySelector('input[type=checkbox]');
    dom.startAtTimecodeCheck.addEventListener('change', this.handleChangeStartAtTimecode.bind(this));
    dom.startAtTimecodeLabel = dom.container.querySelector('.start-at-timecode-label');
    dom.body.append(dom.container);

    return dom;
  }

  async handleCopyToClipboard() {
    const url = this.generateUrl(this._state).toString();

    // Besides being necessary for `execCommand`, the focus is also meant to
    // provide visual feedback to the user.
    // TODO: Improve user feedback, also when an exception occurs
    this._dom.url.focus();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    } else {
      document.execCommand('copy');
    }
  }

  handleChangeStartAtTimecode(e) {
    this.setState({
      startAtTimecode: e.target.checked,
    });
  }

  generateUrl(state) {
    const url = new URL(window.location);
    if (state.startAtTimecode && state.timecode != null && state.timecode !== 0) {
      url.searchParams.set('timecode', state.timecode);
    } else {
      url.searchParams.delete('timecode');
    }
    return url;
  }

  setTimecode(timecode) {
    this.setState({ timecode });
    return this;
  }

  render(state) {
    super.render(state);

    const { show, timecode, startAtTimecode } = state;

    this._dom.url.value = this.generateUrl(state).toString();

    if (timecode === null || timecode === 0) {
      this._dom.startAt.classList.remove('shown');
    } else {
      this._dom.startAtTimecodeCheck.checked = startAtTimecode;
      this._dom.startAtTimecodeLabel.innerText = buildTimeString(timecode);

      this._dom.startAt.classList.add('shown');
    }

    if (show && show !== this._state.show) {
      this._dom.url.select();
    }
  }
}
