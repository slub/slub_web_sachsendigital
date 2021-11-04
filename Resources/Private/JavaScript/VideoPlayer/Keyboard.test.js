const { modifiersFromEvent, Modifier } = require("./Keyboard");

test('can get modifiers from event', () => {
  expect(modifiersFromEvent({ ctrlKey: true })).toBe(Modifier.CtrlMeta);
  expect(modifiersFromEvent({ metaKey: true })).toBe(Modifier.CtrlMeta);
  expect(modifiersFromEvent({ ctrlKey: true, metaKey: true })).toBe(Modifier.CtrlMeta);
  expect(modifiersFromEvent({ shiftKey: true })).toBe(Modifier.Shift);
  expect(modifiersFromEvent({ altKey: true })).toBe(Modifier.Alt);
  expect(modifiersFromEvent({ shiftKey: true, altKey: true })).toBe(Modifier.Shift | Modifier.Alt);
});
