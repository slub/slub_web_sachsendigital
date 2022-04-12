interface Window {
  SxndPlayerApp: {
    new (container: HTMLElement, videoInfo: VideoInfo, config: AppConfig);
  };
}

/**
 * Signals that the theater mode should be changed.
 *
 * Should be dispatched on the window object.
 */
interface DlfTheaterMode
  extends CustomEvent<{
    action: "toggle";
    persist: boolean;
  }> {}

type VideoInfo = {
  pageNo: number | undefined;
  chapters: {
    title: string;
    timecode: string;
  }[];
  metadata: MetadataArray;
  /**
   * Sources of available manifest or raw video files, ordered by preference.
   */
  sources: VideoSource[];
  url: {
    poster?: string;
  };
};

type MetadataArray = Record<string, string[]>;

type PhrasesDict = Record<string, string>;
type LangDef = {
  locale: string;
  twoLetterIsoCode: string;
  phrases: PhrasesDict;
};

type AppConstants = {
  /**
   * Template for filename when downloading screenshot (without extension).
   */
  screenshotFilenameTemplate: string;

  /**
   * Template for comment added to metadata of screenshot image file.
   */
  screenshotCommentTemplate: string;

  /**
   * Number of seconds in which to still rewind to previous chapter.
   */
  prevChapterTolerance: number;

  /**
   * Volume increase/decrease in relevant keybinding.
   */
  volumeStep: number;

  /**
   * Number of seconds to seek or rewind in relevant keybinding.
   */
  seekStep: number;

  /**
   * Trick play factor for continuous rewind/seek.
   * TODO: Check if this should be input as setting or retrieved from current manifest
   */
  trickPlayFactor: number,

  /**
   * Whether or not to switch to landscape in fullscreen mode.
   */
  forceLandscapeOnFullscreen: boolean;
};

type AppConstantsConfig = import('../lib/typoConstants').TypoConstants<AppConstants>;

type AppConfig = {
  shareButtons: import("./modals/BookmarkModal").ShareButtonInfo[];
  lang: LangDef;
  screenshotCaptions?: import("./Screenshot").ScreenshotCaption[];
  constants?: Partial<AppConstantsConfig> | null;
};

type Keybinding<ScopeT extends string, ActionT extends string> = {
  /**
   * Modifier to be pressed.
   *
   * See definition of `const Modifier`.
   */
  mod?: "None" | "CtrlMeta" | "Shift" | "Alt";

  /**
   * Names of the key or keys to be bound.
   *
   * Using multiple keys signifies that all of those inherently trigger the
   * same action. The event handler may use the list of keys to parameterize
   * its action.
   *
   * For creating an alias, consider adding a full keybinding entry instead.
   */
  keys: KeyboardEvent['key'][];

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
   * Whether or not to use this keybinding for `keydown` events.
   */
  keydown?: boolean = true;

  /**
   * Whether or not to use this keybinding for `keyup` events.
   */
  keyup?: boolean = false;

  /**
   * Kind of keybinding as used for grouping in help modal.
   */
  kind: string;

  /**
   * Order value (relative to `kind`) as used in help modal.
   */
  order: number;
};

type KeyEventMode = 'down' | 'up';

type ModalEventHandlers = {
  updated: () => void;
};

interface Modal extends TypedEvents<ModalEventHandlers> {
  readonly isOpen: boolean;
  open(): void;
  close(): void;
  update(): Promise<void>;
  resize(): void;
}
