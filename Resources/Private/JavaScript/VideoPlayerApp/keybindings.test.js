// @ts-check

import { describe, expect, test } from '@jest/globals';
import Environment from './Environment';
import { getKeybindingText } from './lib/trans';

import keybindings from './keybindings.json';

describe('format translated key description', () => {
  const env = new Environment();
  env.setLang({
    locale: 'en_US',
    twoLetterIsoCode: 'en',
    phrases: {
      'key.generic': "Key {key}",
      'key.generic.mod': "{key}",
      'key.mod.Shift': "Shift",
      'key.unto': " to ",
      'key.unto.mod': "-",
    },
  });

  test('key S for opening screenshot modal', () => {
    const kb = keybindings.find(kb => kb.action === 'modal.screenshot.open');
    const text = getKeybindingText(env, /** @type {any} */(kb));
    expect(text).toBe("Key S");
  });

  test('shift S for taking screenshot', () => {
    const kb = keybindings.find(kb => kb.action === 'modal.screenshot.snap');
    const text = getKeybindingText(env, /** @type {any} */(kb));
    expect(text).toBe("Shift + S");
  });
});
