// @ts-check

/**
 *
 * @param {MetadataArray} metadataArray
 * @returns {string}
 */
export function metadataArrayToString(metadataArray) {
  return metadataArray.screenshotFields
    .map(field => metadataArray.metadata[field])
    .filter(value => typeof value === 'string')
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
 * @param {number} totalSeconds (in seconds)
 * @param {boolean} showHour Whether or not to show hours.
 * @param {number | null} fps (Optional) Number of FPS used to calculate frame count.
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
 * @param {string} type
 * @param {number} quality
 * @returns {Promise<Blob>}
 */
export function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject();
      }
    }, type, quality);
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
 * Calls {@link callback} with a temporary object URL to {@link obj} (the object
 * URL is revoked automatically).
 *
 * @template T
 * @param {Blob | MediaSource} obj
 * @param {(objectUrl: string) => T} callback
 * @returns {T}
 */
export function withObjectUrl(obj, callback) {
  // Outside of try-catch because no cleanup needed if this throws
  const objectUrl = URL.createObjectURL(obj);

  try {
    return callback(objectUrl);
  } catch (e) {
    throw e;
  } finally {
    URL.revokeObjectURL(objectUrl);
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
 * Sanitizes {@link str} for use in a file name.
 *
 * @param {string} str
 * @returns {string}
 */
export function sanitizeBasename(str) {
  const result = str.replace(/[^a-zA-Z0-9()]+/g, "_");
  return result.length > 0 ? result : "_";
}

export const HttpStatusGroup = {
  Informational: 1,
  Success: 2,
  Redirection: 3,
  ClientError: 4,
  ServerError: 5,
};

/**
 * Groups HTTP status code into its {@link HttpStatusGroup}.
 *
 * @param {number} code
 */
export function getHttpStatusGroup(code) {
  return Math.floor(code / 100);
}
