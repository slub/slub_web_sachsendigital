/**
 * @jest-environment jsdom
 */

// @ts-check

import { describe, expect, test } from '@jest/globals';
import Environment from './Environment';
import generateTimecodeUrl from './generateTimecodeUrl';

describe('generateTimecodeUrl', () => {
  const env = new Environment();

  /**
   * @param {number | null} timecode
   */
  const url = (timecode) => generateTimecodeUrl(timecode, env).toString();

  test('basic', () => {
    env.getLocation = () => {
      return new URL("http://localhost/video");
    };

    expect(url(null)).toBe("http://localhost/video");
    expect(url(1)).toBe("http://localhost/video?timecode=1");
  });

  test('overrides timecode', () => {
    env.getLocation = () => {
      return new URL("http://localhost/video?timecode=2");
    };

    expect(url(null)).toBe("http://localhost/video");
    expect(url(1)).toBe("http://localhost/video?timecode=1");
  });
});
