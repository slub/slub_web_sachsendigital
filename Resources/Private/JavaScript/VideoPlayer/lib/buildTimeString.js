// @ts-check

import { zeroPad } from '../../lib/util';

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
export default function buildTimeString(totalSeconds, showHour, fps = null) {
  const segments = showHour
    ? [totalSeconds / 3600, (totalSeconds / 60) % 60, totalSeconds % 60]
    : [totalSeconds / 60, totalSeconds % 60];

  let result = (
    segments
      // Don't pad the first segment
      .map((n, i) => zeroPad(Math.floor(n), i === 0 ? 0 : 2))
      .join(':')
  );

  if (fps) {
    result += `:${zeroPad(Math.floor((totalSeconds % 1) * fps), 2)}`;

    if (!showHour) {
      result += "f";
    }
  }

  return result;
}
