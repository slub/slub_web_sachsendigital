import shaka from 'shaka-player/dist/shaka-player.ui';

let __cnt = 0;

export default class ControlPanelButton extends shaka.ui.Element {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   * @param {object} config
   * @param {string?} config.material_icon
   * @param {string?} config.title
   * @param {(() => void)?} config.onClick
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

  static register(config = {}) {
    const key = `__control_autokey_${++__cnt}`;

    shaka.ui.Controls.registerElement(key, {
      create(rootElement, controls) {
        return new ControlPanelButton(rootElement, controls, config);
      }
    });

    return key;
  }
};
