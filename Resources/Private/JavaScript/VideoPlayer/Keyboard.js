/**
 * Keyboard modifier flags for use in a bitset.
 */
export const Modifier = {
  None: 0,
  CtrlMeta: 1,
  Shift: 2,
  Alt: 4,
};

/**
 * Extract bitset of active modifier keys from a keyboard event.
 *
 * @param {KeyboardEvent} e
 */
export function modifiersFromEvent(e) {
  let mod = Modifier.None;

  if (e.ctrlKey || e.metaKey) {
    mod |= Modifier.CtrlMeta;
  }

  if (e.shiftKey) {
    mod |= Modifier.Shift;
  }

  if (e.altKey) {
    mod |= Modifier.Alt;
  }

  return mod;
}
