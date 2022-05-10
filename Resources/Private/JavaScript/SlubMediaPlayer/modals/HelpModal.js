// @ts-check

import { domJoin, e } from '../../lib/util';
import SimpleModal from '../lib/SimpleModal';
import { getKeybindingText } from '../lib/trans';

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
    'player': {},
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
   * @param {Translator} env
   * @param {object} config
   * @param {Record<string, string | number>} config.constants
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

    this.$main.classList.add('help-modal');
    this.$title.innerText = env.t('modal.help.title');

    const allKbGrouped = groupKeybindings(this.config.keybindings);

    const els = e("table", { className: "keybindings-table" }, (
      Object.entries(allKbGrouped)
        .flatMap(([kind, kbGrouped]) => {
          const keybindings = [...Object.entries(kbGrouped)];
          if (keybindings.length === 0) {
            return;
          }

          return [
            e("thead", {}, [
              e("th", { className: "kb-group", colSpan: 2 }, [
                env.t(`action.kind.${kind}`)
              ]),
            ]),
            e("tbody", {}, (
              keybindings.map(([action, kbs]) => (
                e("tr", {}, [
                  e("td", { className: "key" }, this.listKeybindings(kbs)),
                  e("td", { className: "action" }, [this.describeAction(action)]),
                ])
              ))
            ))
          ];
        })
    ));

    this.$body.append(els);
  }

  /**
   * Generates and concatenates texts of multiple keybindings.
   *
   * @param {ShownKeybinding[]} kbs
   */
  listKeybindings(kbs) {
    return domJoin(kbs.map(kb => getKeybindingText(this.env, kb)), e("br"));
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
