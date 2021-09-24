import $ from 'jquery';

export default class SimpleModal {
  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element, state = {}) {
    this._element = element;
    this._$element = $(element);

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

    this._closeButton = this._element.querySelector('.modal-close');
    if (this._closeButton) {
      this._closeButton.addEventListener('click', this.close.bind(this));
    }
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

  setState(state = {}) {
    const newState = Object.assign({}, this._state, state);
    this.render(newState);
    this._state = newState;
  }

  render(state) {
    const { show } = state;

    if (show != this._state.show) {
      this._isAnimating = true;
      const fn = show ? 'show' : 'hide';
      this._$element[fn]({
        duration: 'fast',
        complete: () => {
          this._isAnimating = false;
        },
      });
    }
  }
}
