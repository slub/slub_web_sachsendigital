export default class Component {
  constructor(state = {}) {
    this._state = state;

    this._pendingStateUpdates = [];
    this._renderTimeout = null;
    this._renderPromise = Promise.resolve();
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

  /**
   * @abstract
   */
  render(state) {
    //
  }
}
