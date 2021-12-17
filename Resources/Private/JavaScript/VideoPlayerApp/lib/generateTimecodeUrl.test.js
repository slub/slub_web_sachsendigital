/**
 * @jest-environment jsdom
 */

// @ts-check

import { describe, expect, test } from '@jest/globals';
import generateTimecodeUrl from './generateTimecodeUrl';

describe('generateTimecodeUrl', () => {
  /**
   * @param {number | null} timecode
   * @param {Browser} env
   */
  const url = (timecode, env) => generateTimecodeUrl(timecode, env).toString();

  test('basic', () => {
    /** @type {Browser} */
    const env = {
      getLocation: () => new URL("http://localhost/video"),
      supportsCanvasExport: () => false,
    };

    expect(url(null, env)).toBe("http://localhost/video");
    expect(url(1, env)).toBe("http://localhost/video?timecode=1");
  });

  test('overrides timecode', () => {
    /** @type {Browser} */
    const env = {
      getLocation: () => new URL("http://localhost/video?timecode=2"),
      supportsCanvasExport: () => false,
    };

    expect(url(null, env)).toBe("http://localhost/video");
    expect(url(1, env)).toBe("http://localhost/video?timecode=1");
  });
});
