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
      fps: 0,
      startAtTimecode: true,
    });
  }

  createDom() {
    const env = this.state.env;

    const dom = super.createDom("bookmark-modal");

    dom.title.innerText = env.t('modal.bookmark.title');

    const startAtCheckId = env.mkid();
    dom.container = templateElement(`
      <div>
        <div class="url-line">
          <input type="url" readonly value="https://sachsen.digital">
          <a href="javascript:void(0)" class="copy-to-clipboard">
            <i class="material-icons-round">content_copy</i>
          </a>
        </div>
        <div class="start-at">
          <input type="checkbox" id="${startAtCheckId}"><!--
          --><label for="${startAtCheckId}"></label>
        </div>
      </div>
    `);
    dom.url = dom.container.querySelector('input');
    dom.copyToClipboard = dom.container.querySelector('.copy-to-clipboard');
    dom.copyToClipboard.title = env.t('modal.bookmark.copy-link');
    dom.copyToClipboard.addEventListener('click', this.handleCopyToClipboard.bind(this));
    dom.startAt = dom.container.querySelector('.start-at');
    dom.startAtTimecodeCheck = dom.startAt.querySelector('input[type=checkbox]');
    dom.startAtTimecodeCheck.addEventListener('change', this.handleChangeStartAtTimecode.bind(this));
    dom.startAtTimecodeLabel = dom.startAt.querySelector('label');
    dom.body.append(dom.container);

    return dom;
  }

  async handleCopyToClipboard() {
    const url = this.generateUrl(this.state).toString();

    // Besides being necessary for `execCommand`, the focus is also meant to
    // provide visual feedback to the user.
    // TODO: Improve user feedback, also when an exception occurs
    this.dom.url.focus();
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

  setFps(fps) {
    this.setState({ fps });
    return this;
  }

  render(state) {
    super.render(state);

    const { env, show, timecode, fps, startAtTimecode } = state;

    this.dom.url.value = this.generateUrl(state).toString();

    if (timecode === null || timecode === 0) {
      this.dom.startAt.classList.remove('shown');
    } else {
      this.dom.startAtTimecodeCheck.checked = startAtTimecode;
      this.dom.startAtTimecodeLabel.innerText = env.t('modal.bookmark.start-at-current-time', { timecode: buildTimeString(timecode, true, fps) });

      this.dom.startAt.classList.add('shown');
    }

    if (show && show !== this.state.show) {
      this.dom.url.select();
    }
  }
}
