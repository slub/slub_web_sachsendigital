let _chapterCnt = 0;

export default class Chapters {
  /**
   *
   * @param {{ title: string; timecode: string }[]} chapters
   */
  constructor(chapters) {
    this._chapters = chapters.map(chapter => ({
      id: _chapterCnt++,
      title: chapter.title,
      timecode: parseInt(chapter.timecode, 10),
    }));

    this._chapters.sort((a, b) => a.timecode - b.timecode);

    this._idToIndex = new Map();
    for (let i = 0; i < this._chapters.length; i++) {
      const chapter = this._chapters[i];
      this._idToIndex.set(chapter.id, i);
    }
  }

  at(idx) {
    return this._chapters[idx];
  }

  indexOf(chapter) {
    return this._idToIndex.get(chapter.id);
  }

  advance(chapter, offset = 1) {
    let idx = this.indexOf(chapter);
    if (idx !== undefined) {
      return this._chapters[idx + offset];
    }
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

  [Symbol.iterator]() {
    return this._chapters.values();
  }
}
