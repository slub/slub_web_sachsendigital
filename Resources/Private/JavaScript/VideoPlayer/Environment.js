import { dataUrlMime } from './util';

/**
 * Encapsulates various global state and access to browser capabilities.
 * Construct an instance of this at the root of the app and inject / pass it
 * down to the places where it is needed.
 *
 * This allows us, for example, to use fresh `mkid` counters in test cases
 * and to mock browser capabilities if necessary.
 */
export default class Environment {
  constructor() {
    this._idCnt = 0;
    this._testCanvas = null;
  }

  /**
   * Generates an identifier that is unique with respect to this Environment.
   *
   * It may be used, for example, to link an <input /> element to a <label />,
   * or to group radio boxes.
   */
  mkid() {
    return `__autoid_${++this._idCnt}`;
  }

  /**
   * Checks whether canvas can be dumped to an image of the specified mimetype.
   *
   * @param {string} mimeType
   */
  supportsCanvasExport(mimeType) {
    const dataUrl = this._getTestCanvas().toDataURL(mimeType);
    const actualMime = dataUrlMime(dataUrl);
    return actualMime === mimeType;
  }

  _getTestCanvas() {
    if (!this._testCanvas) {
      this._testCanvas = document.createElement('canvas');
    }

    return this._testCanvas;
  }
}
