// @ts-check

/**
 *
 * @param {MetadataArray} metadataArray
 * @returns {string}
 */
export function metadataArrayToString(metadataArray) {
  return metadataArray.screenshotFields
    // TODO: Find a better way
    .map(field => metadataArray.metadata[field]?.[0] ?? "")
    .join(' / ');
}

/**
 * Clamps {@link value} into the closed interval [{@link min}, {@link max}].
 *
 * @param {number} value
 * @param {[number, number]} range
 * @returns {number}
 */
export function clamp(value, [min, max]) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

/**
 * Formats {@link totalSeconds} to a time string.
 *
 * The base format is `hh:mm:ss:ff`. Hours and frames are included depending on
 * {@link showHour} and {@link fps}. The first part is not zero-padded.
 *
 * Adopted from shaka.ui.Utils.buildTimeString.
 *
 * @param {number} totalSeconds Total number of seconds to be formatted.
 * @param {boolean} showHour Whether or not to show hours.
 * @param {number | null} fps (Optional) Number of FPS used to calculate frame
 * count.
 * @returns {string}
 */
export function buildTimeString(totalSeconds, showHour, fps = null) {
  const segments = showHour
    ? [totalSeconds / 3600, (totalSeconds / 60) % 60, totalSeconds % 60]
    : [totalSeconds / 60, totalSeconds % 60];

  if (fps) {
    segments.push(Math.floor((totalSeconds % 1) * fps));
  }

  return (
    segments
      // Don't pad the first segment
      .map((n, i) => Math.floor(n).toString().padStart(i == 0 ? 0 : 2, '0'))
      .join(':')
  );
}

/**
 * Extracts the mime type from a data URL.
 *
 * @param {string} dataUrl
 * @returns {string | undefined}
 */
export function dataUrlMime(dataUrl) {
  return dataUrl.match(/data:(.*);/)?.[1];
}

/**
 * Creates a `Blob` representing the image contained in the canvas.
 *
 * This is a promisification of `canvas.toBlob(type, quality)`.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {string} mimeType
 * @param {number | undefined} quality JPEG or WebP image quality in range
 * `[0, 1]`.
 * @returns {Promise<Blob>}
 */
export function canvasToBlob(canvas, mimeType, quality = undefined) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject();
      }
    }, mimeType, quality);
  });
}

/**
 *
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
export function blobToBinaryString(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(null);
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsBinaryString(blob);
  });
}

/**
 * Loads a `Blob` that contains an image into an `HTMLImageElement`.
 *
 * @param {Blob} blob
 * @returns {Promise<HTMLImageElement>}
 */
export function blobToImage(blob) {
  return withObjectUrl(blob, loadImage);
}

/**
 * Loads an image from {@link src} into an `HTMLImageElement`.
 *
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    image.src = src;
  });
}

/**
 * Downloads a file from a `Blob` or from a URL.
 *
 * @param {Blob | string} obj
 * @param {string} filename Name of the target file.
 */
export function download(obj, filename) {
  if (typeof obj === 'string') {
    e("a", { href: obj, download: filename }).click();
  } else {
    withObjectUrl(obj, (objectUrl) => {
      download(objectUrl, filename);
    });
  }
}

/**
 * Calls {@link callback} with a temporary object URL to {@link obj}.
 *
 * The object URL is automatically resolved once the callback returns, or, if
 * the callback returns a promise, once that promise resolves.
 *
 * @template T
 * @param {Blob | MediaSource} obj
 * @param {(objectUrl: string) => T} callback
 * @returns {T}
 */
export function withObjectUrl(obj, callback) {
  // Outside of try-catch because no cleanup needed if this throws
  const objectUrl = URL.createObjectURL(obj);

  let result;

  try {
    result = callback(objectUrl);
  } catch (e) {
    URL.revokeObjectURL(objectUrl);
    throw e;
  }

  if (result instanceof Promise) {
    const resultPromise = result;

    // @ts-expect-error: The typing is indeed not exact here because `T` could
    // be a type extending `Promise` (TODO).
    return new Promise((resolve, reject) => {
      resultPromise
        .then((value) => {
          URL.revokeObjectURL(objectUrl);
          resolve(value);
        })
        .catch((e) => {
          URL.revokeObjectURL(objectUrl);
          reject(e);
        });
    });
  } else {
    URL.revokeObjectURL(objectUrl);
    return result;
  }
}

/**
 *
 * @param {string} s
 * @returns {ArrayBuffer}
 */
export function binaryStringToArrayBuffer(s) {
  const buffer = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) {
    buffer[i] = s.charCodeAt(i);
  }
  return buffer;
}

/**
 * Parses {@link html} into an `HTMLElement`.
 *
 * @param {string} html
 * @returns {HTMLElement | null}
 */
export function templateElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  const element = template.content.firstElementChild;
  return element instanceof HTMLElement
    ? element
    : null;
}

/**
 * Creates a nested HTML element.
 *
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tag
 * @param {Record<string, any>} attrs
 * @param {(HTMLElement | string | null | undefined | boolean)[]} children
 * @returns {HTMLElementTagNameMap[K]}
 */
export function e(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (key === '@') {
      value.element = element;
    } else if (key[0] === '$') {
      element.addEventListener(key.substring(1), value);
    } else {
      // @ts-expect-error: `Object.entries()` is too coarse-grained
      element[key] = value;
    }
  }

  for (const child of children) {
    if (typeof child === 'string') {
      element.append(
        document.createTextNode(child)
      );
    } else if (child instanceof HTMLElement) {
      element.append(child);
    }
  }

  return element;
}

/**
 * Returns ref object that may be used to capture HTML element via `@` field
 * in {@link e}.
 *
 * @template T
 * @returns {{ element: T | null }}
 */
e.ref = function () {
  // TODO: Strict typing where this is called
  return { element: null };
}

/**
 * Sanitizes {@link str} for use in a file name.
 *
 * @param {string} str
 * @returns {string}
 */
export function sanitizeBasename(str) {
  const result = str.replace(/[^a-zA-Z0-9()]+/g, "_");
  return result.length > 0 ? result : "_";
}
