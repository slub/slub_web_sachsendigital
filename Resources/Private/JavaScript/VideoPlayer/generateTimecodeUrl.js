// @ts-check

import Environment from './Environment';

/**
 *
 * @param {number | null} timecode
 * @param {Environment} env
 * @returns
 */
export default function generateTimecodeUrl(timecode, env) {
  const url = env.getLocation();
  if (timecode != null && timecode !== 0) {
    url.searchParams.set('timecode', timecode.toString());
  } else {
    url.searchParams.delete('timecode');
  }
  return url;
}
