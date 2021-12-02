// @ts-check

import IntlMessageFormat from 'intl-messageformat';

import { dataUrlMime } from './util';

/**
 * @typedef {{
 *  twoLetterIsoCode: string;
 *  phrasesInput: PhrasesDict;
 *  phrasesCompiled: Record<string, IntlMessageFormat>;
 * }} Lang
 */

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
    /**
     * @private
     * @type {number}
     */
    this.idCnt = 0;

    /**
     * @private
     * @type {HTMLCanvasElement | null}
     */
    this.testCanvas = null;

    /**
     * @private
     * @type {Lang}
     */
    this.lang = {
      twoLetterIsoCode: 'en',
      phrasesInput: {},
      phrasesCompiled: {},
    };
  }

  /**
   * Generates an identifier that is unique with respect to this Environment.
   *
   * It may be used, for example, to link an <input /> element to a <label />,
   * or to group radio boxes.
   *
   * @returns {string}
   */
  mkid() {
    return `__autoid_${++this.idCnt}`;
  }

  /**
   * Checks whether canvas can be dumped to an image of the specified
   * {@link mimeType}.
   *
   * @param {string} mimeType
   * @returns {boolean}
   */
  supportsCanvasExport(mimeType) {
    const dataUrl = this.getTestCanvas().toDataURL(mimeType);
    const actualMime = dataUrlMime(dataUrl);
    return actualMime === mimeType;
  }

  /**
   * Set locale and phrases for subsequent calls to {@link t}.
   *
   * Translation phrases should use the ICU MessageFormat syntax for
   * interpolation and pluralization.
   *
   * @param {LangDef} lang
   */
  setLang(lang) {
    this.lang = {
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
   * @param {Record<string, string | number>} values
   * @returns {string}
   */
  t(key, values = {}) {
    let phrase = this.lang.phrasesCompiled[key];

    if (phrase === undefined) {
      const phraseStr = this.lang.phrasesInput[key];

      if (phraseStr === undefined) {
        console.error(`Warning: Translation key '${key}' not defined.`);
        return key;
      }

      phrase
        = this.lang.phrasesCompiled[key]
        = new IntlMessageFormat(phraseStr, this.lang.twoLetterIsoCode);
    }

    return /** @type {string} */(phrase.format(values));
  }

  /**
   * Returns the current window location URL.
   *
   * @returns {URL}
   */
  getLocation() {
    return new URL(window.location.href);
  }

  /**
   *
   * @private
   * @returns {HTMLCanvasElement}
   */
  getTestCanvas() {
    if (!this.testCanvas) {
      this.testCanvas = document.createElement('canvas');
    }

    return this.testCanvas;
  }
}
