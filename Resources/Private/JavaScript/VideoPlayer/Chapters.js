class Chapters {
  /**
   *
   * @param {{ title: string; timecode: string }[]} chapters
   */
  constructor(chapters) {
    this._chapters = chapters.map(chapter => ({
      title: chapter.title,
      timecode: parseInt(chapter.timecode, 10),
    }));

    this._chapters.sort((a, b) => a.timecode - b.timecode);
  }

  /**
   * Find the current chapter for a given timecode.
   *
   * @param {number} timecode
   */
  timeToChapter(timecode) {
    // This assumes that `this._chapters` is sorted.
    // NOTE: As there shouldn't be too many chapters, we avoid the additional complexity of doing a binary search.
    for (let i = this._chapters.length - 1; i >= 0; i--) {
      const chapter = this._chapters[i];

      if (timecode >= chapter.timecode) {
        return chapter;
      }
    }
  }
}

module.exports = { Chapters };
