import IntlMessageFormat from 'intl-messageformat';

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
    this._lang = {
      locale: 'en',
      phrasesInput: {},
      phrasesCompiled: {},
    };
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

  /**
   * Set locale and phrases for subsequent calls to {@link t}.
   *
   * Translation phrases should use the ICU MessageFormat syntax for
   * interpolation and pluralization.
   *
   * @param {object} lang
   * @param {string} lang.twoLetterIsoCode
   * @param {Record<string, string>} lang.phrases
   */
  setLang(lang) {
    this._lang = {
      twoLetterIsoCode: lang.twoLetterIsoCode,
      phrasesInput: lang.phrases,
      phrasesCompiled: {},
    };
  }

  /**
   * Get translated phrase of given {@link key}, using locale and phrases that
   * have been provided by the latest call to {@link setLang}.
   *
   * @param {string} key
   * @param {Record<string, string | number>?} values
   * @returns {string}
   */
  t(key, values = {}) {
    if (!(key in this._lang.phrasesCompiled)) {
      if (!(key in this._lang.phrasesInput)) {
        console.error(`Warning: Translation key '${key}' not defined.`);
        return key;
      }

      this._lang.phrasesCompiled[key] = new IntlMessageFormat(this._lang.phrasesInput[key], this._lang.twoLetterIsoCode);
    }

    return this._lang.phrasesCompiled[key].format(values);
  }

  _getTestCanvas() {
    if (!this._testCanvas) {
      this._testCanvas = document.createElement('canvas');
    }

    return this._testCanvas;
  }
}
