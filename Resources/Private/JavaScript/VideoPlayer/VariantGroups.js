// @ts-check

/**
 * @typedef {string} GroupKey
 *
 * @typedef {{
 *  key: GroupKey;
 *  variants: shaka.extern.Variant[];
 *  roles: Set<string>;
 * }} Group
 */

export default class VariantGroups {
  /**
   *
   * @param {shaka.Player} player
   */
  constructor(player) {
    /** @type {shaka.Player} */
    this._player = player;
    /** @type {shaka.extern.Manifest | null} */
    this._manifest = player.getManifest();

    if (!this._manifest) {
      console.warn("Manifest not available");
      return;
    }

    /** @type {GroupKey[]} */
    this._groupKeys = [];
    /** @type {Group[]} */
    this._groups = [];
    /** @type {Record<GroupKey, Group>} */
    this._groupMap = {};

    for (const variant of this._manifest.variants) {
      this.addVariant(variant);
    }
  }

  /**
   *
   * @param {string | null} id
   */
  static splitRepresentationId(id) {
    const parts = (id ?? "").split('#');

    return {
      id: parts[0],
      group: parts[1] ?? "Standard",
    };
  }

  /**
   *
   * @param {shaka.extern.Variant} variant
   */
  addVariant(variant) {
    const video = variant.video;

    if (video) {
      const grpKey = VariantGroups.splitRepresentationId(video.originalId).group;
      const group = this.getGroupOrCreate(grpKey);

      group.variants.push(variant);

      for (const role of video.roles) {
        group.roles.add(role);
      }
    }
  }

  get numGroups() {
    return this._groupKeys.length;
  }

  /**
   *
   * @param {GroupKey} grpKey
   */
  getGroupOrCreate(grpKey) {
    let group = this._groupMap[grpKey];

    if (!group) {
      group = this._groupMap[grpKey] = {
        key: grpKey,
        variants: [],
        roles: new Set(),
      };

      this._groupKeys.push(grpKey);
      this._groups.push(group);
    }

    return group;
  }

  findActiveTrack() {
    // There should be at most one active variant at a time
    return this._player.getVariantTracks().find(track => track.active);
  }

  findActiveGroup() {
    const track = this.findActiveTrack();

    if (track) {
      const key = VariantGroups.splitRepresentationId(track.originalVideoId).group;
      return this._groupMap[key];
    }
  }

  /**
   *
   * @param {Group} group
   */
  selectGroup(group) {
    if (!this._manifest) {
      console.warn("Cannot select group: Manifest not available");
      return;
    }

    // NOTE: The object-based comparison is intentional and suffices to prevent
    //       re-selecting the currently active group.
    if (this._manifest.variants !== group.variants) {
      // Get active track before selecting group variants
      const activeTrack = this.findActiveTrack();

      this._manifest.variants = group.variants;

      // Basically, trigger Shaka to select a variant
      // TODO: Also consider role?
      this._player.selectAudioLanguage(activeTrack?.language ?? 'und');
    }
  }

  /**
   *
   * @param {Group | undefined} group
   */
  trySelectGroup(group) {
    if (group) {
      this.selectGroup(group);
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * @param {GroupKey} key
   */
  selectGroupByKey(key) {
    return this.trySelectGroup(this._groupMap[key]);
  }

  /**
   *
   * @param {number} idx
   */
  selectGroupByIndex(idx) {
    return this.trySelectGroup(this._groups[idx]);
  }

  /**
   *
   * @param {string} role
   */
  selectGroupByRole(role) {
    return this.trySelectGroup(this._groups.find(g => g.roles.has(role)));
  }

  *[Symbol.iterator]() {
    for (const grpKey in this._groupMap) {
      yield /** @type {Group} */(this._groupMap[grpKey]);
    }
  }
}
