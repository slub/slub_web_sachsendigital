// @ts-check

import Environment from './Environment';
import SimpleModal from './SimpleModal';
import { e } from './util';

/**
 * @typedef {string} KeybindingKind See `Keybinding::kind`.
 * @typedef {string} KeybindingAction See `Keybinding::action`.
 * @typedef {Keybinding<string, KeybindingAction>} ShownKeybinding
 * @typedef {Record<KeybindingKind, Record<KeybindingAction, ShownKeybinding[]>>} KeybindingGroups
 */

/**
 * Groups list of keybindings by overall group (used to split by tables)
 * and action.
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
    let kind = result[kb.kind];
    if (!kind) {
      kind = result[kb.kind] = {};
    }

    let action = kind[kb.action];
    if (!action) {
      action = kind[kb.action] = [];
    }

    action.push(kb);
  }

  return result;
}

/**
 * @extends {SimpleModal<{}>}
 */
export default class HelpModal extends SimpleModal {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Environment} env
   * @param {object} config
   * @param {Record<string, string|number>} config.constants
   * @param {ShownKeybinding[]} config.keybindings
   */
  constructor(parent, env, config) {
    super(parent, {});

    /** @private */
    this.env = env;
    /** @private */
    this.config = config;

    this.createBodyDom();
  }

  createBodyDom() {
    const env = this.env;

    this.$body.classList.add('help-modal');
    this.$title.innerText = env.t('modal.help.title');

    const allKbGrouped = groupKeybindings(this.config.keybindings);

    const els = Object.entries(allKbGrouped)
      .flatMap(([kind, kbGrouped]) => {
        const keybindings = [...Object.entries(kbGrouped)];
        if (keybindings.length === 0) {
          return [];
        }

        return [
          e("h3", {
            className: "subheader",
            innerText: env.t(`action.kind.${kind}`),
          }),

          e("table", { className: "keybindings-table" }, [
            e("tbody", {}, [
              e("tr", {}, [
                e("td", { className: "legend key" }, [env.t('modal.help.key')]),
                e("td", { className: "legend action" }, [env.t('modal.help.action')]),
              ]),

              ...keybindings.map(([action, kbs]) => (
                e("tr", {}, [
                  e("td", { className: "key" }, this.listKeybindingsDisj(kbs)),
                  e("td", { className: "action" }, [this.describeAction(action)]),
                ])
              )),
            ]),
          ]),
        ];
      });

    this.$body.append(...els);
  }

  /**
   * Generates and concatenates texts of multiple keybindings using an "or"
   * as separator.
   *
   * @param {ShownKeybinding[]} kbs
   */
  listKeybindingsDisj(kbs) {
    const env = this.env;

    return kbs.flatMap((kb, i) => {
      const text = this.getKeybindingText(kb);

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
   * @param {ShownKeybinding} kb
   * @returns {string}
   */
  getKeybindingText(kb) {
    const env = this.env;

    let text = kb.mod
      ? env.t(`key.mod.${kb.mod}`) + " + " + env.t(`key.${kb.key}.mod`)
      : env.t(`key.${kb.key}`);

    if (kb.repeat) {
      text = env.t('key.repeat', { key: text });
    }

    return text;
  }

  /**
   * Returns a translated string describing {@link action}.
   *
   * @param {KeybindingAction} action
   * @returns {string}
   */
  describeAction(action) {
    return this.env.t(`action.${action}`, this.config.constants);
  }
}
