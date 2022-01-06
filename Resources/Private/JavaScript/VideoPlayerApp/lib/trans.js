// @ts-check

import { Keybinding$splitKeyRanges } from '../../lib/Keyboard';
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
 * Returns a translated string describing key {@link key}.
 *
 * @param {Translator} env
 * @param {KeyboardEvent['key']} key
 * @param {boolean} mod
 * @returns {string}
 */
export function getKeyText(env, key, mod) {
  const app = mod ? '.mod' : '';
  return env.t(`key.${key}${app}`, {},
    () => env.t(`key.generic${app}`, { key: key.toUpperCase() }));
}

/**
 * Returns a translated string describing keybinding {@link kb}.
 *
 * @param {Translator} env
 * @param {Keybinding<any, any>} kb
 * @returns {string}
 */
export function getKeybindingText(env, kb) {
  const keyRanges = Keybinding$splitKeyRanges(kb.keys);
  const rangeTexts = [];
  const mod = kb.mod !== undefined || keyRanges.length > 1;
  const untoText = env.t(`key.unto${mod ? '.mod' : ''}`);

  for (const range of keyRanges) {
    const beginText = getKeyText(env, range.begin, mod);

    if (range.begin === range.end) {
      rangeTexts.push(beginText);
    } else {
      const endText = getKeyText(env, range.end, mod);

      rangeTexts.push(`${beginText}${untoText}${endText}`);
    }
  }

  let text = kb.mod
    ? (env.t(`key.mod.${kb.mod}`) + " + " + rangeTexts.join("/"))
    : rangeTexts.join(" / ");

  if (kb.repeat) {
    text = env.t('key.repeat', { key: text });
  }

  return text;
}
