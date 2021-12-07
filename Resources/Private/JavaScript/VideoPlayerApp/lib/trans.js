// @ts-check

import { e } from '../../lib/util';

/**
 * Generates and concatenates texts of multiple keybindings using an "or"
 * as separator.
 *
 * @param {Translator} env
 * @param {Keybinding<any, any>[]} kbs
 */
export function listKeybindingsDisj(env, kbs) {
  return kbs.flatMap((kb, i) => {
    const text = getKeybindingText(env, kb);

    return [
      // Use spaces (instead of padding) to allow word-wrap around the "or"
      i > 0 && e("span", { className: "or-sep" }, [` ${env.t('or')} `]),

      e("span", { className: "kb-text" }, [text]),
    ];
  });
}

/**
 * Returns a translated string describing keybinding {@link kb}.
 *
 * @param {Translator} env
 * @param {Keybinding<any, any>} kb
 * @returns {string}
 */
export function getKeybindingText(env, kb) {
  let text = kb.mod
    ? env.t(`key.mod.${kb.mod}`) + " + " + env.t(`key.${kb.key}.mod`)
    : env.t(`key.${kb.key}`);

  if (kb.repeat) {
    text = env.t('key.repeat', { key: text });
  }

  return text;
}
