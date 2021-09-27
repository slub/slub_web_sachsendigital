import SimpleModal from './SimpleModal';

export default class BookmarkModal extends SimpleModal {
  constructor(element) {
    super(element, {
      timecode: null,
    });
  }

  _createDom() {
    const dom = super._createDom("bookmark-modal");

    dom.title.innerText = "Bookmark-URL";

    dom.url = document.createElement("input");
    dom.url.type = "url";
    dom.url.value = "https://sachsen.digital";
    dom.body.append(dom.url);

    return dom;
  }

  setTimecode(timecode) {
    this.setState({ timecode });
    return this;
  }

  render(state) {
    super.render(state);

    const { show, timecode } = state;

    if (timecode !== null && timecode !== this._state.timecode) {
      const url = new URL(window.location);
      url.searchParams.set('timecode', state.timecode);

      this._dom.url.value = url.toString();
    }

    if (show && show !== this._state.show) {
      this._dom.url.select();
    }
  }
}
