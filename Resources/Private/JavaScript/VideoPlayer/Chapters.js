// @ts-check

import Environment from './Environment';

/**
 * @typedef {string} ChapterId
 * @typedef {Chapter & { readonly id: ChapterId }} ChapterWithId
 */

export default class Chapters {
  /**
   *
   * @param {readonly Chapter[]} chapters
   * @param {Environment} env
   */
  constructor(chapters, env) {
    /**
     * List of chapters sorted by timecode.
     *
     * @private
     * @type {ChapterWithId[]}
     */
    this.chapters = chapters.map(chapter => ({
      id: env.mkid(),
      ...chapter,
    }));

    this.chapters.sort((a, b) => a.timecode - b.timecode);

    /**
     * @private
     * @type {Map<ChapterId, number>}
     */
    this.idToIndex = new Map();

    for (const [i, chapter] of this.chapters.entries()) {
      this.idToIndex.set(chapter.id, i);
    }
  }

  /**
   * Returns the chapter at the specified {@link index} relative to timecode
   * order, or `undefined` if the index is out of bounds.
   *
   * @param {number} index
   * @returns {ChapterWithId | undefined}
   */
  at(index) {
    return this.chapters[index];
  }

  /**
   * Returns the index of the specified {@link chapter} relative to timecode
   * order, or `undefined` if the chapter is not found.
   *
   * @param {ChapterWithId} chapter
   * @returns {number | undefined}
   */
  indexOf(chapter) {
    return this.idToIndex.get(chapter.id);
  }

  /**
   * Returns the chapter that is found when advancing {@link offset} steps from
   * {@link chapter}. The {@link offset} may be negative.
   *
   * @param {ChapterWithId} chapter
   * @param {number} offset
   * @returns {ChapterWithId | undefined}
   */
  advance(chapter, offset = 1) {
    const idx = this.indexOf(chapter);
    if (idx !== undefined) {
      return this.chapters[idx + offset];
    }
  }

  /**
   * Returns the chapter that spans across the specified {@link timecode}.
   *
   * @param {number} timecode
   */
  timeToChapter(timecode) {
    // NOTE: As there shouldn't be too many chapters, we avoid the additional
    //       complexity of doing a binary search.
    for (const chapter of this.reversed()) {
      if (timecode >= chapter.timecode) {
        return chapter;
      }
    }
  }

  /**
   * Iterates through the chapters (ordered by timecode).
   *
   * @returns {IterableIterator<ChapterWithId>}
   */
  [Symbol.iterator]() {
    return this.chapters.values();
  }

  /**
   * Iterates through the chapters (reversely ordered by timecode).
   *
   * @returns {IterableIterator<ChapterWithId>}
   */
  *reversed() {
    for (let i = this.chapters.length - 1; i >= 0; i--) {
      yield /** @type {ChapterWithId} */(this.chapters[i]);
    }
  }
}
