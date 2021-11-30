import shaka from 'shaka-player/dist/shaka-player.ui';
import Environment from '../Environment';
import { templateElement } from '../util';
import VariantGroups from '../VariantGroups';

export default class VideoTrackSelection extends shaka.ui.SettingsMenu {
  /**
   *
   * @param {Environment} env
   */
  static register(env) {
    const key = env.mkid();

    shaka.ui.OverflowMenu.registerElement(key, {
      create(rootElement, controls) {
        return new VideoTrackSelection(rootElement, controls, env);
      }
    });

    return key;
  }

  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   * @param {Environment} env
   */
  constructor(parent, controls, env) {
    super(parent, controls, 'switch_video');

    this._env = env;
      /** @type {VariantGroups | null} */
    this._variantGroups = null;

    this._updateLocalizedStrings();
    this._checkIfShown();

    this.activeCheck = templateElement(`
      <i class="material-icons-round shaka-chosen-item">
        done
      </i>
    `);
    /** @type {Record<string, HTMLElement>} */
    this.menuButtons = {};

    this.eventManager.listen(this.controls, 'sxnd-variant-groups', (e) => {
      this._variantGroups = e.detail.variantGroups;

      this._clearMenu();
      this._checkIfShown();

      try {
        for (const group of this._variantGroups) {
          const button = document.createElement('button');
          button.addEventListener('click', () => {
            this._variantGroups?.selectGroupByKey(group.key);
          });

          const span = document.createElement('span');
          span.textContent = group.key;

          button.appendChild(span);

          this.menu.appendChild(button);

          this.menuButtons[group.key] = button;
        }

        this._markActiveGroup();
      } catch (err) {
        // TODO: Shaka seems to handle exceptions occurring in listeners in some way
        console.error(err);
      }
    });

    this.eventManager.listen(this.player, 'variantchanged', () => {
      this._markActiveGroup();
    });
  }

  _clearMenu() {
    for (const button of Object.values(this.menuButtons)) {
      button.remove();
    }
    this.menuButtons = {};
  }

  _markActiveGroup() {
    const activeGroup = this._variantGroups?.findActiveGroup(this.player);
    if (activeGroup) {
      this.menuButtons[activeGroup.key].appendChild(this.activeCheck);
      this.currentSelection.textContent = activeGroup.key;
    }
  }

  _checkIfShown() {
    if (this._variantGroups?.numGroups > 0) {
      this.button.classList.remove('shaka-hidden');
    } else {
      this.button.classList.add('shaka-hidden');
    }
  }

  /**
   * @private
   */
  _updateLocalizedStrings() {
    const back = this._env.t('control.back');
    const label = this._env.t('control.video-track.title');

    this.backButton.ariaLabel = back;
    this.button.ariaLabel = label;
    this.nameSpan.textContent = label;
    this.backSpan.textContent = label;
  }
};
