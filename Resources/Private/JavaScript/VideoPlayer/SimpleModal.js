import $ from 'jquery';

export default class SimpleModal {
  /**
   *
   * @param {HTMLElement} parent
   */
  constructor(parent, state = {}) {
    this._parent = parent;

    /**
     * Whether a show or hide animation is currently running. This is to avoid
     * a "backlog" of animations when the user keeps pressing a key that toggles
     * modal visibility.
     */
    this._isAnimating = false;

    this._state = {
      show: false,
      ...state,
    };

    this._pendingStateUpdates = [];
    this._renderTimeout = null;
    this._renderPromise = Promise.resolve();

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

  update() {
    return this._renderPromise;
  }

  setState(state = {}) {
    this._pendingStateUpdates.push(state);

    // Postpone updates so that multiple synchronous calls to `setState` don't
    // lead to multiple renderings.
    if (!this._renderTimeout) {
      this._renderPromise = new Promise(resolve => {
        this._renderTimeout = setTimeout(() => {
          const state = this._pendingStateUpdates.reduce(Object.assign, {});
          const newState = Object.assign({}, this._state, state);
          this.render(newState);
          this._state = newState;
          this._pendingStateUpdates = [];
          this._renderTimeout = null;
          this._renderPromise = Promise.resolve();
          resolve();
        });
      })
    }
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
