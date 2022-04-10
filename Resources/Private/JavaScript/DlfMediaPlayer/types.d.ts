// This file declares some additional types used in the media player.
// There also are @typedef declarations directly in .js files.

declare module "shaka-player/dist/shaka-player.ui" {
  export = shaka;
}

namespace dlf {
  interface Network<T> {
    get(url: string): Promise<T>;
    getCached(url: string): T | null;
    abortPending(): void;
  }

  namespace media {
    type Chapter = {
      title: string;
      timecode: number;
    };

    type Source = {
      mimeType: string;
      url: string;
    };

    /**
     * Signals chapters available in current video.
     *
     * Should be dispatched on a Shaka control ({@link shaka.ui.Controls}).
     */
    interface ChaptersEvent
      extends CustomEvent<EventDetail["dlf-media-chapters"]> {}

    /**
     * Signals information about FPS of current video.
     *
     * Should be dispatched on a Shaka control ({@link shaka.ui.Controls}).
     */
    interface FpsEvent extends CustomEvent<EventDetail["dlf-media-fps"]> {}

    /**
     * Registers seekbar to parent DlfMediaPlayer.
     *
     * Should be dispatched on a Shaka control ({@link shaka.ui.Controls}).
     */
    interface SeekBarEvent
      extends CustomEvent<EventDetail["dlf-media-seek-bar"]> {}

    /**
     * Signals that the user has manually seeked to a video position.
     *
     * Should be dispatched on a Shaka control ({@link shaka.ui.Controls}).
     */
    interface ManualSeekEvent
      extends CustomEvent<EventDetail["dlf-media-manual-seek"]> {}

    /**
     * Signals variant groups of current video.
     *
     * Should be dispatched on a Shaka control ({@link shaka.ui.Controls}).
     */
    interface VariantGroupsEvent
      extends CustomEvent<EventDetail["dlf-media-variant-groups"]> {}

    type EventDetail = {
      "dlf-media-chapters": {
        chapters: import("./Chapters").default;
      };
      "dlf-media-fps": {
        vifa: import("./vendor/VideoFrame").default | null;
        fps: number | null;
      };
      "dlf-media-seek-bar": {
        seekBar: import("./controls/FlatSeekBar").default;
      };
      "dlf-media-manual-seek": {};
      "dlf-media-variant-groups": {
        variantGroups: import("./VariantGroups").default;
      };
    };

    /**
     * Description on a thumbnail on a tileset.
     *
     * Generally oriented at {@link shaka.extern.Thumbnail}.
     */
    type Thumbnail = {
      uris: string[];
      imageTime: number;
      startTime: number;
      duration: number;
      positionX: number;
      positionY: number;
      width: number;
      height: number;
      bandwidth: number;
    };

    type ThumbnailOnTrack = Thumbnail & {
      track: ThumbnailTrack;
    };

    interface ThumbnailTrack {
      readonly bandwidth: number;
      getThumb(position: number): Promise<ThumbnailOnTrack | null>;
    }
  }
}
