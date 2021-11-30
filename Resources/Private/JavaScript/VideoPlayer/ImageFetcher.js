// @ts-check

import { blobToImage } from './util';

/**
 * @template T
 * @typedef {{
 *  abortController: AbortController;
 *  promise: Promise<T>;
 *  loaded: boolean;
 *  response?: T;
 * }} Task
 */

/**
 * Fetch images to a cache.
 *
 * @implements {Network<HTMLImageElement>}
 */
export default class ImageFetcher {
  constructor() {
    /**
     * Map from URL to task.
     *
     * @private
     * @type {Record<string, Task<HTMLImageElement>>}
     */
    this.tasks = {};
  }

  /**
   * Gets an image from {@link url}. If the image is currently being loaded, or
   * has already been loaded, this returns a cached promise. (So this method is
   * idempotent.)
   *
   * @param {string} url
   * @returns {Promise<HTMLImageElement>}
   */
  get(url) {
    let task = this.tasks[url];

    if (task === undefined) {
      this.abortPending();

      const abortController = new AbortController();

      const promise = new Promise((resolve, reject) => {
        this.fetchImage(url, abortController.signal)
          .then((image) => {
            const task = this.tasks[url];
            if (task) {
              task.loaded = true;
              task.response = image;
              resolve(image);
            }
          })
          .catch((e) => {
            delete this.tasks[url];
            reject(e);
          });
      });

      task = this.tasks[url] = {
        abortController,
        promise,
        loaded: false,
      };
    }

    return task.promise;
  }

  /**
   * Aborts pending request that have been initiated by calling {@link get}.
   */
  abortPending() {
    for (const [url, task] of Object.entries(this.tasks)) {
      if (!task.loaded) {
        task.abortController.abort();
        delete this.tasks[url];
      }
    }
  }

  /**
   * Fetches an image from {@link url}.
   *
   * @protected
   * @param {string} url
   * @param {AbortSignal} abortSignal
   * @returns {Promise<HTMLImageElement>}
   */
  async fetchImage(url, abortSignal) {
    const response = await fetch(url, { signal: abortSignal });
    if (response.ok) {
      const blob = await response.blob();
      const image = await blobToImage(blob);
      return image;
    } else {
      throw response;
    }
  }
}
