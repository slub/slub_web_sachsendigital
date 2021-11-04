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
     * @type {Record<string, Task<HTMLImageElement>>}
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
   * @returns {Promise<HTMLImageElement>}
   */
  get(url) {
    if (!this.tasks[url]) {
      this.abortPending();

      let request;

      const promise = new Promise((resolve, reject) => {
        request = new XMLHttpRequest();
        request.responseType = 'blob';
        request.onload = (e) => {
          this.tasks[url].loaded = true;

          if (getHttpStatusGroup(request.status) === HttpStatusGroup.Success) {
            const objectUrl = URL.createObjectURL(request.response);
            const image = document.createElement('img');
            image.onload = () => {
              URL.revokeObjectURL(objectUrl);
              this.tasks[url].response = image;
              resolve(image);
            };
            image.src = objectUrl;
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
