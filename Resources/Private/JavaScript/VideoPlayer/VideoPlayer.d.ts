declare module "shaka-player/dist/shaka-player.ui" {
  export = shaka;
}

type Chapter = {
  title: string;
  timecode: number;
};

interface Network<T> {
  get(url: string): Promise<T>;
  abortPending(): void;
}

/**
 * Signals chapters available in current video.
 *
 * Should be dispatched on a Shaka control ({@link shaka.ui.Controls}).
 */
interface SxndChaptersEvent
  extends CustomEvent<SxndEventDetail["sxnd-chapters"]> {}

/**
 * Signals information about FPS of current video.
 *
 * Should be dispatched on a Shaka control ({@link shaka.ui.Controls}).
 */
interface SxndFpsEvent extends CustomEvent<SxndEventDetail["sxnd-fps"]> {}

/**
 * Registers seekbar to parent SachsenShakaPlayer.
 *
 * Should be dispatched on a Shaka control ({@link shaka.ui.Controls}).
 */
interface SxndSeekBarEvent
  extends CustomEvent<SxndEventDetail["sxnd-seek-bar"]> {}

/**
 * Signals variant groups of current video.
 *
 * Should be dispatched on a Shaka control ({@link shaka.ui.Controls}).
 */
interface SxndVariantGroupsEvent
  extends CustomEvent<SxndEventDetail["sxnd-variant-groups"]> {}

type SxndEventDetail = {
  "sxnd-chapters": {
    chapters: import("./Chapters").default;
  };
  "sxnd-fps": {
    vifa: import("./vendor/VideoFrame").default | null;
    fps: number | null;
  };
  "sxnd-seek-bar": {
    seekBar: import("./controls/FlatSeekBar").default;
  };
  "sxnd-variant-groups": {
    variantGroups: import("./VariantGroups").default;
  };
};
