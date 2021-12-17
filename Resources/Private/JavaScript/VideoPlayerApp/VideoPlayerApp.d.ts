interface Window {
  SxndPlayerApp: {
    new (container: HTMLElement, videoInfo: VideoInfo, lang: LangDef);
  };
}

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

type MetadataArray = {
  metadata: Record<string, string[]>;
  screenshotFields: string[];
};

type PhrasesDict = Record<string, string>;
type LangDef = {
  locale: string;
  twoLetterIsoCode: string;
  phrases: PhrasesDict;
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
