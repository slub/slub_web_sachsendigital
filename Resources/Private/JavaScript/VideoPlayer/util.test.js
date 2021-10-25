import { buildTimeString, dataUrlMime, sanitizeBasename } from './util';

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
});

describe('dataUrlMime', () => {
  test('basic', () => {
    expect(dataUrlMime('data:image/png;abc')).toBe("image/png");
  });
});

describe('sanitizeBasename', () => {
  test('basic', () => {
    expect(sanitizeBasename("")).not.toBe("");
    expect(sanitizeBasename("Just for Fun")).toBe("Just_for_Fun");
    expect(sanitizeBasename("..")).toBe("_");
    expect(sanitizeBasename("1:2:3")).toBe("1_2_3");
  })
});
