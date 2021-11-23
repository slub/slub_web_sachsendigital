import { Blob } from 'buffer';
import { buildTimeString, dataUrlMime, numberIntoRange, sanitizeBasename, withObjectUrl } from './util';

describe('numberIntoRange', () => {
  test('basic', () => {
    expect(numberIntoRange(1, [2, 3])).toBe(2);
    expect(numberIntoRange(2.5, [2, 3])).toBe(2.5);
    expect(numberIntoRange(4, [2, 3])).toBe(3);
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
  });
});

describe('withObjectUrl', () => {
  test('returns result of callback', () => {
    expect(withObjectUrl(new Blob(), () => 1)).toBe(1);
  })

  test('revokes despite throw', () => {
    const spyRevoke = jest.spyOn(URL, 'revokeObjectURL');

    let blobObjectUrl;

    expect(() => {
      withObjectUrl(new Blob(), (objectUrl) => {
        blobObjectUrl = objectUrl;
        throw new Error();
      });
    }).toThrow();

    expect(spyRevoke).toHaveBeenCalledWith(blobObjectUrl);
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
