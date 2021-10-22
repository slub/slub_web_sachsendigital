import shaka from 'shaka-player/dist/shaka-player.ui';

let __cnt = 0;

export default class OverflowMenuButton extends shaka.ui.SettingsMenu {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   * @param {object} config
   * @param {string?} config.material_icon
   * @param {string?} config.name
   * @param {(() => void)?} config.onClick
   */
  constructor(parent, controls, config = {}) {
    super(parent, controls, config.material_icon);

    this._config = config;

    this.updateStrings();

    // In particular, unbind button click handler
    this.eventManager.removeAll();

    this.eventManager.listen(this.button, 'click', this.onButtonClick.bind(this));
  }

  static register(config = {}) {
    const key = `__menu_autokey_${++__cnt}`;

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
