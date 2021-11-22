import SimpleModal from './SimpleModal';
import { templateElement } from './util';

/**
 * @typedef {string} KeybindingKind See `Keybinding::kind`.
 * @typedef {string} KeybindingAction See `Keybinding::action`.
 * @typedef {import('./Keyboard').Keybinding<string, KeybindingAction>} ShownKeybinding
 * @typedef {Record<KeybindingKind, Record<KeybindingAction, ShownKeybinding[]>>} KeybindingGroups
 */

/**
 *
 * @param {ShownKeybinding[]} keybindings
 * @returns {KeybindingGroups}
 */
function groupKeybindings(keybindings) {
  // Prepopulate to determine an order
  /** @type {KeybindingGroups} */
  const result = {
    'navigate': {},
    'other': {},
  };

  const keybindingsSorted = keybindings.slice();
  keybindingsSorted.sort((a, b) => a.order - b.order);

  for (const kb of keybindingsSorted) {
    if (!result[kb.kind]) {
      result[kb.kind] = {};
    }

    if (!result[kb.kind][kb.action]) {
      result[kb.kind][kb.action] = [];
    }

    result[kb.kind][kb.action].push(kb);
  }

  return result;
}

export default class HelpModal extends SimpleModal {
  constructor(parent, env, config) {
    super(parent, {
      env,
      config,
    });
  }

  _createDom() {
    const { env, config: { constants, keybindings } } = this._state;

    const dom = super._createDom("help-modal");

    dom.title.innerText = env.t('modal.help.title');

    const allKbGrouped = groupKeybindings(keybindings);

    for (const [kind, kbGrouped] of Object.entries(allKbGrouped)) {
      const keybindings = [...Object.entries(kbGrouped)];
      if (keybindings.length === 0) {
        continue;
      }

      const h3 = templateElement(`<h3 class="subheader"></h3>`);
      h3.innerText = env.t(`action.kind.${kind}`);
      dom.body.append(h3);

      const table = templateElement(`
        <table class="keybindings-table">
          <tbody>
            <tr>
              <td class="legend key"></td>
              <td class="legend action"></td>
            </tr>
          </tbody>
        </table>
      `);

      const legendKey = table.querySelector('.legend.key');
      legendKey.innerText = env.t('modal.help.key');

      const legendAction = table.querySelector('.legend.action');
      legendAction.innerText = env.t('modal.help.action');

      const trTemplate = templateElement(`
        <tr>
          <td class="key"></td>
          <td class="action"></td>
        </tr>
      `);

      const tbody = table.querySelector('tbody');

      for (const [action, kbs] of keybindings) {
        const tr = trTemplate.cloneNode(true);

        // There may be multiple keybindings to the same action. Concatenate
        // these using an "or" as separator.
        const tdKey = tr.querySelector('.key');
        for (let i = 0; i < kbs.length; i++) {
          const kb = kbs[i];

          if (i > 0) {
            const sep = templateElement(`<span class="or-sep"></span>`)
            sep.innerText = env.t('or');

            tdKey.append(sep);
          }

          let text = kb.mod
            ? env.t(`key.mod.${kb.mod}`) + " + " + env.t(`key.${kb.key}.mod`)
            : env.t(`key.${kb.key}`);

          if (kb.repeat) {
            text = env.t('key.repeat', { key: text });
          }

          tdKey.append(
            document.createTextNode(text)
          );
        }

        const tdAction = tr.querySelector('.action');
        tdAction.innerText = env.t(`action.${action}`, constants);

        tbody.append(tr);
      }

      table.append(tbody);
      dom.body.append(table);
    }

    return dom;
  }
}
