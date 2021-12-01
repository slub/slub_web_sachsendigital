// @ts-check

import $ from 'jquery';

import Component from './Component';

/**
 * @typedef {{
 *  show: boolean;
 * }} BaseState
 */

/**
 * @template {object} ModalState
 * @extends {Component<BaseState & ModalState>}
 */
export default class SimpleModal extends Component {
  /**
   *
   * @param {HTMLElement} parent
   * @param {ModalState & Partial<BaseState>} state
   */
  constructor(parent, state) {
    super({
      show: false,
      ...state,
    });

    /**
     * @private
     */
    this.parent = parent;

    /**
     * Whether a show/hide animation is currently running. This is to avoid
     * "backlogs" of animations when the user keeps pressing a key that toggles
     * modal visibility.
     *
     * @private
     */
    this.isAnimating = false;

    /**
     * @protected
     */
    this.dom = this.createDom();
    this.dom.close.addEventListener('click', this.close.bind(this));

    this.parent.append(this.dom.main);

    /**
     * @private
     */
    this.$main = $(this.dom.main);

    this.resize();
  }

  /**
   * @protected
   */
  createDom(className = "") {
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

  resize() {
    // TODO: Find a CSS-only approach. It should
    //  - resize dynamically relative to the parent's height (not to viewport)
    //  - allow to scroll on body when overflowing
    //  - allow transparent background of modal
    //  - allow to center the modal vertically
    this.dom.body.style.maxHeight =
      `calc(${this.parent.clientHeight}px - 11rem)`;
  }

  /**
   * Whether or not the modal is currently open.
   *
   * @returns {boolean}
   */
  get isOpen() {
    return this.state.show;
  }

  /**
   * Opens or closes the modal depending on {@link value}.
   *
   * @param {boolean} value
   */
  open(value = true) {
    if (this.isAnimating) {
      return;
    }

    // @ts-expect-error TODO: Why wouldn't this work?
    this.setState({
      show: value,
    });
  }

  /**
   * Closes the modal.
   */
  close() {
    this.open(false);
  }

  /**
   * Toggles whether the modal is opened.
   */
  toggle() {
    this.open(!this.state.show);
  }

  /**
   * @param {BaseState & ModalState} state
   */
  render(state) {
    const { show } = state;

    if (show != this.state.show) {
      this.isAnimating = true;
      const fn = show ? 'show' : 'hide';
      this.$main[fn]({
        duration: 'fast',
        complete: () => {
          this.isAnimating = false;
        },
      });
    }
  }
}
