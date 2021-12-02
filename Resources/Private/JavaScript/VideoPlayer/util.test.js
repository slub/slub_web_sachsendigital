// @ts-check

import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import { Blob } from 'buffer';
import {
  buildTimeString,
  dataUrlMime,
  clamp,
  sanitizeBasename,
  withObjectUrl,
} from './util';

describe('clamp', () => {
  test('basic', () => {
    expect(clamp(1, [2, 3])).toBe(2);
    expect(clamp(2.5, [2, 3])).toBe(2.5);
    expect(clamp(4, [2, 3])).toBe(3);
  });
});

describe('buildTimeString', () => {
  test('basic', () => {
    expect(buildTimeString(45, false)).toBe("0:45");
    expect(buildTimeString(45, true)).toBe("0:00:45");
    expect(buildTimeString(60, false)).toBe("1:00");
    expect(buildTimeString(60, true)).toBe("0:01:00");
    expect(buildTimeString(3599, false)).toBe("59:59");
    expect(buildTimeString(3599, true)).toBe("0:59:59");
    expect(buildTimeString(3600, false)).toBe("60:00");
    expect(buildTimeString(3600, true)).toBe("1:00:00");
    expect(buildTimeString(3600 * 123, true)).toBe("123:00:00");
  });

  test('with fps', () => {
    expect(buildTimeString(0.00, false, 5)).toBe("0:00:00");
    expect(buildTimeString(0.25, false, 5)).toBe("0:00:01");
    expect(buildTimeString(0.50, false, 5)).toBe("0:00:02");
    expect(buildTimeString(0.75, false, 5)).toBe("0:00:03");
    expect(buildTimeString(1.00, false, 5)).toBe("0:01:00");
    expect(buildTimeString(1.25, false, 5)).toBe("0:01:01");
  });
});

describe('dataUrlMime', () => {
  test('basic', () => {
    expect(dataUrlMime('data:image/png;abc')).toBe("image/png");
    expect(dataUrlMime('data:;')).toBe("");
    expect(dataUrlMime('data;')).toBe(undefined);
    expect(dataUrlMime('something')).toBe(undefined);
  });
});

describe('withObjectUrl', () => {
  const spyRevoke = jest.spyOn(URL, 'revokeObjectURL');

  beforeEach(() => {
    spyRevoke.mockReset();
  });

  test('returns result of callback', () => {
    // @ts-expect-error: DOM Blob vs Node Blob (TODO)
    expect(withObjectUrl(new Blob(), () => 1)).toBe(1);
    expect(spyRevoke).toHaveBeenCalledTimes(1);
  });

  test('returns async result', async () => {
    // @ts-expect-error: DOM Blob vs Node Blob (TODO)
    expect(await withObjectUrl(new Blob(), async () => 1)).toBe(1);
    expect(spyRevoke).toHaveBeenCalledTimes(1);
  });

  test('revokes despite throw', () => {
    let blobObjectUrl;

    expect(() => {
      // @ts-expect-error: DOM Blob vs Node Blob (TODO)
      withObjectUrl(new Blob(), (objectUrl) => {
        blobObjectUrl = objectUrl;
        throw new Error();
      });
    }).toThrow();

    expect(spyRevoke).toHaveBeenCalledTimes(1);
    expect(spyRevoke).toHaveBeenCalledWith(blobObjectUrl);
  });

  test('revokes despite async throw', async () => {
    let blobObjectUrl;

    await expect(async () => {
      // @ts-expect-error: DOM Blob vs Node Blob (TODO)
      await withObjectUrl(new Blob(), async (objectUrl) => {
        blobObjectUrl = objectUrl;
        throw new Error();
      });
    }).rejects.toThrow();

    expect(spyRevoke).toHaveBeenCalledTimes(1);
    expect(spyRevoke).toHaveBeenCalledWith(blobObjectUrl);
  });
});

describe('sanitizeBasename', () => {
  test('basic', () => {
    expect(sanitizeBasename("")).not.toBe("");
    expect(sanitizeBasename("Just for Fun")).toBe("Just_for_Fun");
    expect(sanitizeBasename("..")).toBe("_");
    expect(sanitizeBasename("1:2:3")).toBe("1_2_3");
  });
});
