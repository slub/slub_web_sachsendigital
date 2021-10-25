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
 *
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (e) => {
      reject(e.target.error);
    };
    reader.readAsDataURL(blob);
  });
}
