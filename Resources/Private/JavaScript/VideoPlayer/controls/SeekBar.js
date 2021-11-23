import shaka from 'shaka-player/dist/shaka-player.ui';

import ImageFetcher from '../ImageFetcher';
import ThumbnailPreview from '../ThumbnailPreview';

export default class SeekBar extends shaka.ui.SeekBar {
  constructor(parent, controls) {
    super(parent, controls);

    const mainContainer = this.controls.elSxndPlayer.container;

    this.thumbnailPreview = new ThumbnailPreview({
      mainContainer: mainContainer,
      seekBar: this.container,
      seekThumbSize: 12,
      player: this.player,
      network: new ImageFetcher(),
    });

    this.eventManager.listen(this.player, 'loaded', () => {
      this.renderChapterMarkers();
    });

    this.eventManager.listen(this.controls, 'sxnd-thumbs-close', () => {
      this.thumbnailPreview.hidePreview();
    });
  }

  static register() {
    shaka.ui.Controls.registerSeekBar({
      create(rootElement, controls) {
        return new SeekBar(rootElement, controls);
      }
    });
  }

  renderChapterMarkers() {
    const { video, chapters } = this.controls.elSxndPlayer;

    for (const chapter of chapters) {
      const relative = chapter.timecode / video.duration;

      // In particular, make sure that we don't put markers outside of the
      // seekbar for wrong timestamps.
      if (!(0 <= relative && relative < 1)) {
        continue;
      }

      // The outer <span /> is to give some leeway, making the chapter marker
      // easier to hit.

      const marker = document.createElement('span');
      marker.className = 'sxnd-chapter-marker';
      marker.style.position = 'absolute';
      marker.style.left = `${chapter.timecode / video.duration * 100}%`;
      marker.title = chapter.title;
      marker.addEventListener('click', () => {
        this.controls.elSxndPlayer.play();
        this.controls.elSxndPlayer.seekTo(chapter);
      });

      const markerInner = document.createElement('span');
      marker.append(markerInner);

      this.container.append(marker);
    }
  }
}
