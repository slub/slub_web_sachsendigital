import shaka from 'shaka-player/dist/shaka-player.ui';
import Environment from '../Environment';

/**
 * @typedef {{
 *  material_icon: string;
 *  title: string;
 *  onClick: () => void;
 * }} Config
 */

export default class ControlPanelButton extends shaka.ui.Element {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   * @param {Partial<Config>} config
   */
  constructor(parent, controls, config = {}) {
    super(parent, controls, config.material_icon);

    this._config = config;

    this.button = document.createElement('button');
    this.button.className = 'material-icons-round';
    this.button.title = config.title;
    this.button.textContent = config.material_icon;
    this.parent.appendChild(this.button);

    if (this._config.onClick) {
      this.eventManager.listen(this.button, 'click', this._config.onClick);
    }
  }

  /**
   *
   * @param {Environment} env
   * @param {Partial<Config>} config
   */
  static register(env, config = {}) {
    const key = env.mkid();

    shaka.ui.Controls.registerElement(key, {
      create(rootElement, controls) {
        return new ControlPanelButton(rootElement, controls, config);
      }
    });

    return key;
  }
};
