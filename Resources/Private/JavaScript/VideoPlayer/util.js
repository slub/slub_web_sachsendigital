/**
 *
 * @param {number} value
 * @param {[number; number]} range
 * @returns {number}
 */
export function numberIntoRange(value, range) {
  if (value < range[0]) {
    return range[0];
  }

  if (value > range[1]) {
    return range[1];
  }

  return value;
}

/**
 *
 * @param {number} value
 * @param {[number; number]} range
 * @param {number?} tolerance
 */
export function isValueInRange(value, range, tolerance = 0) {
  const min = range[0] - tolerance;
  const max = range[1] + tolerance;
  return min <= value && value <= max;
}

/**
 *
 * @param {DOMRect} rect
 * @param {{ x: number; y: number; toleranceX?: number; toleranceY?: number }} pos
 */
export function isPosInRect(rect, pos) {
  // TODO: inclusive/exclusive?
  return (
    isValueInRange(pos.x, [rect.left, rect.right], pos.toleranceX)
    && isValueInRange(pos.y, [rect.top, rect.bottom], pos.toleranceY)
  );
}

/**
  * Builds a time string, e.g., 01:04:23, from |totalSeconds|.
  *
  * @param {number} totalSeconds (in seconds)
  * @param {boolean} showHour
  * @return {string}
  */
export function buildTimeString(totalSeconds, showHour) {
  const segments = showHour
    ? [totalSeconds / 3600, (totalSeconds / 60) % 60, totalSeconds % 60]
    : [totalSeconds / 60, totalSeconds % 60];

  return (
    segments
      // Don't pad the first segment (TODO: This contradicts the documented behavior)
      .map((n, i) => Math.floor(n).toString().padStart(i == 0 ? 0 : 2, '0'))
      .join(':')
  );
}

/**
 * Extracts the mime type from a data URL.
 *
 * @param {string} dataUrl
 */
export function dataUrlMime(dataUrl) {
  return dataUrl.match(/data:(.*);/)[1];
}

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {string?} type
 * @param {quality} quality
 * @returns {Promise<Blob>}
 */
export function canvasToBlob(canvas, type, quality) {
  return new Promise(resolve => {
    canvas.toBlob(resolve, type, quality)
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
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (e) => {
      reject(e.target.error);
    };
    reader.readAsBinaryString(blob);
  });
}

/**
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
 *
 * @param {string} str
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

export function getHttpStatusGroup(code) {
  return Math.floor(code / 100);
}
