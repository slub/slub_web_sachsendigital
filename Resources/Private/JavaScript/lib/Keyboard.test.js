// @ts-check

import { describe, expect, test } from '@jest/globals';
import { modifiersFromEvent, Modifier, Keybinding$splitKeyRanges } from './Keyboard';

describe('modifiersFromEvent', () => {
  test('basic', () => {
    // This is mostly for typing
    const mfe = (/** @type {any} */ e) => modifiersFromEvent(e);

    expect(mfe({ ctrlKey: true })).toBe(Modifier.CtrlMeta);
    expect(mfe({ metaKey: true })).toBe(Modifier.CtrlMeta);
    expect(mfe({ ctrlKey: true, metaKey: true })).toBe(Modifier.CtrlMeta);
    expect(mfe({ shiftKey: true })).toBe(Modifier.Shift);
    expect(mfe({ altKey: true })).toBe(Modifier.Alt);
    expect(mfe({ shiftKey: true, altKey: true }))
      .toBe(Modifier.Shift | Modifier.Alt);
  });
});

describe('Keybinding$splitKeyRanges', () => {
  test('no keys', () => {
    const ranges = Keybinding$splitKeyRanges([]);
    expect(ranges).toEqual([]);
  });

  test('basic', () => {
    const ranges = Keybinding$splitKeyRanges(['0', '1', '2', '4', '7', '8']);

    expect(ranges).toEqual([
      { begin: '0', end: '2' },
      { begin: '4', end: '4' },
      { begin: '7', end: '8' },
    ]);
  });
});
