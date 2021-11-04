import shaka from 'shaka-player/dist/shaka-player.ui';
import Environment from '../Environment';

/**
 * @typedef {{
 *  material_icon: string;
 *  name: string;
 *  onClick: () => void;
 * }} Config
 */

export default class OverflowMenuButton extends shaka.ui.SettingsMenu {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   * @param {Partial<Config>} config
   */
  constructor(parent, controls, config = {}) {
    super(parent, controls, config.material_icon);

    this._config = config;

    this.updateStrings();

    // In particular, unbind button click handler
    this.eventManager.removeAll();

    this.eventManager.listen(this.button, 'click', this.onButtonClick.bind(this));
  }

  /**
   *
   * @param {Environment} env
   * @param {Partial<Config>} config
   */
  static register(env, config = {}) {
    const key = env.mkid();

    shaka.ui.OverflowMenu.registerElement(key, {
      create(rootElement, controls) {
        return new OverflowMenuButton(rootElement, controls, config);
      }
    });

    return key;
  }

  updateStrings() {
    this.nameSpan.textContent = this._config.name ?? "";
  }

  onButtonClick() {
    this.controls.hideSettingsMenus();

    if (this._config.onClick) {
      this._config.onClick();
    }
  }
};
