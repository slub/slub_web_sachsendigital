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
