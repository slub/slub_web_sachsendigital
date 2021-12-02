// @ts-check

/**
 * @typedef {string} GroupKey
 *
 * @typedef {{
 *  key: GroupKey;
 *  variants: shaka.extern.Variant[];
 *  roles: Set<string>;
 * }} Group
 *
 * @typedef {{
 *  id: string | null;
 *  group: string;
 * }} GroupId
 */

/**
 * Switch among video tracks in Shaka Player by grouping the manifest variants.
 * This allows to adapt bitrate and switch audio language within a group.
 *
 * The variants are grouped via their representation id (MPD) or name (HLS).
 */
export default class VariantGroups {
  /**
   *
   * @param {shaka.Player} player Player to which the variant groups are bound.
   * Variants are read from this player's manifest.
   */
  constructor(player) {
    /**
     * @private
     * @type {shaka.Player}
     */
    this.player = player;

    /**
     * @private
     * @type {shaka.extern.Manifest | null}
     */
    this.manifest = player.getManifest();

    /**
     * @private
     * @type {GroupKey[]}
     */
    this.groupKeys = [];

    /**
     * @private
     * @type {Group[]}
     */
    this.groups = [];

    /**
     * @private
     * @type {Record<GroupKey, Group>}
     */
    this.keyToGroup = {};

    if (this.manifest === null) {
      console.warn("Manifest not available");
      return;
    }

    for (const variant of this.manifest.variants) {
      this.addVariant(variant);
    }

    for (const imageStream of this.manifest.imageStreams) {
      // The HLS parser apparently does not report dimensions of thumbnails,
      // so `getThumbnails()` will not return correct size and position of a
      // thumbnail within the tileset. By setting width = 1 and height = 1,
      // we will at least receive the relative size and position, which in
      // `ThumbnailPreview::renderImageAndShow()` we scale to the absolute
      // values.
      // TODO: Dispense of this
      imageStream.width = 1;
      imageStream.height = 1;
    }
  }

  /**
   * Parses the representation ID / name {@link id}.
   *
   * @param {string | null} id
   * @returns {GroupId}
   */
  static splitRepresentationId(id) {
    const parts = (id ?? "").split('#');

    return {
      id: parts[0] ?? null,
      group: parts[1] ?? "Standard",
    };
  }

  /**
   * Sorts {@link variant} into its group if it references a video.
   *
   * @param {shaka.extern.Variant} variant
   */
  addVariant(variant) {
    const video = variant.video;

    if (video) {
      const key = VariantGroups.splitRepresentationId(video.originalId).group;
      const group = this.getGroupOrCreate(key);

      group.variants.push(variant);

      for (const role of video.roles) {
        group.roles.add(role);
      }
    }
  }

  /**
   * The number of variant groups.
   *
   * @returns {number}
   */
  get numGroups() {
    return this.groupKeys.length;
  }

  /**
   * Returns a group with the specified key. If the group does not yet exist,
   * an empty group with this key is created.
   *
   * @param {GroupKey} key
   * @returns {Group}
   */
  getGroupOrCreate(key) {
    let group = this.keyToGroup[key];

    if (!group) {
      group = this.keyToGroup[key] = {
        key: key,
        variants: [],
        roles: new Set(),
      };

      this.groupKeys.push(key);
      this.groups.push(group);
    }

    return group;
  }

  /**
   * Returns the track that is currently active (in the bound player), or
   * `undefined` if no track is active.
   *
   * @returns {shaka.extern.Track | undefined}
   */
  findActiveTrack() {
    // There should be at most one active variant at a time
    return this.player.getVariantTracks().find(track => track.active);
  }

  /**
   * Returns the image tracks that match the currently active group.
   */
  findImageTracks() {
    const activeGroupKey = this.findActiveGroup()?.key;

    return this.player.getImageTracks().filter(
      track => VariantGroups.splitRepresentationId(track.originalImageId).group === activeGroupKey
    );
  }

  /**
   * Returns the group of the currently active track, or `undefined` if there is
   * no such group.
   *
   * @returns {Group | undefined}
   */
  findActiveGroup() {
    const track = this.findActiveTrack();

    if (track) {
      const key =
        VariantGroups.splitRepresentationId(track.originalVideoId).group;

      return this.keyToGroup[key];
    }
  }

  /**
   * Selects a track within {@link group}. Tracks that have the same audio
   * language as the currently active track are preferred.
   *
   * @param {Group} group
   */
  selectGroup(group) {
    if (!this.manifest) {
      console.warn("Cannot select group: Manifest not available");
      return;
    }

    // NOTE: The object-based comparison is intentional and suffices to prevent
    //       re-selecting the currently active group.
    if (this.manifest.variants !== group.variants) {
      // Get active track before selecting group variants
      const activeTrack = this.findActiveTrack();

      this.manifest.variants = group.variants;

      // Basically, trigger Shaka to select a variant
      // TODO: Also consider role?
      this.player.selectAudioLanguage(activeTrack?.language ?? 'und');
    }
  }

  /**
   *
   * @protected
   * @param {Group | undefined} group
   * @returns {boolean}
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
   * Selects the group specified by {@link key} (cf. {@link selectGroup}).
   *
   * @param {GroupKey} key
   * @returns {boolean} Whether or not a relevant group has been found.
   */
  selectGroupByKey(key) {
    return this.trySelectGroup(this.keyToGroup[key]);
  }

  /**
   * Selects the group of index {@link index} (cf. {@link selectGroup}).
   *
   * @param {number} idx
   * @returns {boolean} Whether or not a relevant group has been found.
   */
  selectGroupByIndex(idx) {
    return this.trySelectGroup(this.groups[idx]);
  }

  /**
   * Selects a group of the specified {@link role} (cf. {@link selectGroup}).
   *
   * @param {string} role
   * @returns {boolean} Whether or not a relevant group has been found.
   */
  selectGroupByRole(role) {
    return this.trySelectGroup(this.groups.find(g => g.roles.has(role)));
  }

  /**
   * Iterates through the groups.
   *
   * @returns {IterableIterator<Group>}
   */
  *[Symbol.iterator]() {
    for (const key in this.keyToGroup) {
      yield /** @type {Group} */(this.keyToGroup[key]);
    }
  }
}
