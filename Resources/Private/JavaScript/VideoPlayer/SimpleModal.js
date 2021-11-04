import $ from 'jquery';

import Component from './Component';

export default class SimpleModal extends Component {
  /**
   *
   * @param {HTMLElement} parent
   */
  constructor(parent, state = {}) {
    super({
      show: false,
      ...state,
    });

    this._parent = parent;

    /**
     * Whether a show or hide animation is currently running. This is to avoid
     * a "backlog" of animations when the user keeps pressing a key that toggles
     * modal visibility.
     */
    this._isAnimating = false;

    this._dom = this._createDom();
    this._dom.close.addEventListener('click', this.close.bind(this));

    this._parent.append(this._dom.main);

    this._$main = $(this._dom.main);
  }

  /**
   * @protected
   */
  _createDom(className = "") {
    const dom = {
      main: document.createElement("div"),
      headline: document.createElement("div"),
      title: document.createElement("h3"),
      close: document.createElement("span"),
      body: document.createElement("div"),
    };

    dom.main.className = `sxnd-modal ${className}`;
    dom.headline.className = "headline-container";
    dom.close.className = "modal-close icon-close";
    dom.body.className = "body-container";

    dom.main.append(dom.headline, dom.body);
    dom.headline.append(dom.title, dom.close);

    return dom;
  }

  get isOpen() {
    return this._state.show;
  }

  open(value = true) {
    if (this._isAnimating) {
      return;
    }

    this.setState({
      show: value,
    });
  }

  close() {
    this.open(false);
  }

  toggle() {
    this.open(!this._state.show);
  }

  render(state) {
    const { show } = state;

    if (show != this._state.show) {
      this._isAnimating = true;
      const fn = show ? 'show' : 'hide';
      this._$main[fn]({
        duration: 'fast',
        complete: () => {
          this._isAnimating = false;
        },
      });
    }
  }
}
