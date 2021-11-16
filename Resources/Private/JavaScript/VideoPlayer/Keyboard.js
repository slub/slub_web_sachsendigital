/**
 * @template {string} ScopeT
 * @template {string} ActionT
 * @typedef {object} Keybinding
 * @property {(keyof typeof Modifier)?} mod Bitset of modifier combination (exact combination). Defaults to `Modifier.None`.
 * @property {string} key Name of the key to be bound.
 * @property {boolean | null | undefined} repeat Boolean to indicate that the keypress must / must not be repeated; undefined or null to allow both.
 * @property {ScopeT | null | undefined} scope Active keyboard scope for which the keybinding is relevant; undefined or null to allow any scope.
 * @property {ActionT} action Key of the action to be executed for that keybinding.
 * @property {boolean?} propagate
 * @property {string} kind Kind of keybinding as used for grouping in help modal.
 * @property {number} order Order value (relative to `kind`) as used in help modal.
 */

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
