import { getHttpStatusGroup, HttpStatusGroup } from './util';

/**
 * @typedef {{
 *  request: XMLHttpRequest;
 *  promise: Promise<T>;
 *  loaded: boolean;
 *  response?: T;
 * }} Task
 * @template T
 */

export default class ImageFetcher {
  constructor() {
    /**
     * Map from URL to task.
     * @private
     * @type {Record<string, Task<string>>}
     */
    this.tasks = {};
  }

  abortPending() {
    for (const url of Object.keys(this.tasks)) {
      if (!this.tasks[url].loaded) {
        this.tasks[url].request.abort();
        delete this.tasks[url];
      }
    }
  }

  /**
   *
   * @param {string} url
   * @returns {Promise<string>}
   */
  get(url) {
    if (!this.tasks[url]) {
      this.abortPending();

      let request;

      const promise = new Promise((resolve, reject) => {
        request = new XMLHttpRequest();
        request.responseType = 'blob';
        request.onload = (e) => {
          if (getHttpStatusGroup(request.status) === HttpStatusGroup.Success) {
            // TODO: Cleanup (`revokeObjectURL`)
            const imageUrl = URL.createObjectURL(request.response);
            this.tasks[url].loaded = true;
            this.tasks[url].response = imageUrl;
            resolve(imageUrl); //
          } else {
            request.onerror(e);
          }
        };
        request.onerror = (e) => {
          delete this.tasks[url];
          reject(e);
        };
        request.open('GET', url);
        request.send();
      });

      this.tasks[url] = {
        request,
        promise,
        loaded: false,
      };
    }

    return this.tasks[url].promise;
  }
}
