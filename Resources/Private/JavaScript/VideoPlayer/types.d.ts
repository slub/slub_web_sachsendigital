declare module "shaka-player/dist/shaka-player.ui" {
  export = shaka;
}

type ValueOf<T> = T[keyof T];

type ElementAttributes<Tag extends keyof HTMLElementTagNameMap> = {
  [A in keyof HTMLElementTagNameMap[Tag]]: HTMLElementTagNameMap[Tag][A];
};

// With inspiration from https://stackoverflow.com/a/56416192 (inverting Record)
type EventListenersDesc = {
  [X in keyof GlobalEventHandlersEventMap]: {
    key: X;
    prefixed: `$${X}`;
    handler: (event: GlobalEventHandlersEventMap[X]) => any;
  };
};

type EventListeners = {
  [X in ValueOf<EventListenersDesc>["prefixed"]]: Extract<
    ValueOf<EventListenersDesc>,
    { prefixed: X }
  >["handler"];
};

type Chapter = {
  title: string;
  timecode: number;
};

interface ImageFormat {
  addMetadata(metadata: Partial<ImageMetadata>);
  toBinaryString(): string;
}

type ImageFormatDesc = {
  mimeType: string;
  label: string;
  parseBinaryString: (s: string) => ImageFormat | undefined;
};

type ImageMetadata = {
  title: string;
  comment: string;
};

type Keybinding<ScopeT extends string, ActionT extends string> = {
  /**
   * Modifier to be pressed.
   *
   * See definition of `const Modifier`.
   */
  mod?: "None" | "CtrlMeta" | "Shift" | "Alt";

  /**
   * Name of the key to be bound.
   */
  key: string;

  /**
   * Boolean to indicate that the keypress must / must not be repeated;
   * undefined or null to allow both.
   */
  repeat?: boolean | null;

  /**
   * Active keyboard scope for which the keybinding is relevant; undefined or
   * null to allow any scope.
   */
  scope?: ScopeT | null;

  /**
   * Key of the action to be executed for that keybinding.
   */
  action: ActionT;

  /**
   * Whether or not to propagate the event for further handling.
   */
  propagate?: boolean;

  /**
   * Kind of keybinding as used for grouping in help modal.
   */
  kind: string;

  /**
   * Order value (relative to `kind`) as used in help modal.
   */
  order: number;
};

type PhrasesDict = Record<string, string>;
type LangDef = {
  locale: string;
  twoLetterIsoCode: string;
  phrases: PhrasesDict;
};

type MetadataArray = {
  metadata: Record<string, string[]>;
  screenshotFields: string[];
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
    vifa: import('./vendor/VideoFrame').default | null;
    fps: number | null;
  };
  "sxnd-seek-bar": {
    seekBar: import("./controls/FlatSeekBar").default;
  };
  "sxnd-variant-groups": {
    variantGroups: import("./VariantGroups").default;
  };
};

type VideoInfo = {
  pageNo: number | undefined;
  chapters: {
    title: string;
    timecode: string;
  }[];
  metadata: MetadataArray;
  url: {
    mpd: string;
    hls: string;
    poster: string;
  };
};

interface Window {
  SxndPlayerApp: {
    new (container: HTMLElement, videoInfo: VideoInfo, lang: LangDef);
  };
}
