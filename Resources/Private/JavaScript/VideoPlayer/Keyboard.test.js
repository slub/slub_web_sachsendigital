// @ts-check

import { expect, test } from '@jest/globals';
import { modifiersFromEvent, Modifier } from './Keyboard';

test('can get modifiers from event', () => {
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
