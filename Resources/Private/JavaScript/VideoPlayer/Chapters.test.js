// @ts-check

import { expect, test } from '@jest/globals';
import Chapters from './Chapters';

function getTestChapters() {
  return new Chapters([
    { title: "Second", timecode: 2 },
    { title: "First", timecode: 1 },
  ]);
}

test('can get index of chapter', () => {
  const chapters = getTestChapters();

  const ch0 = /** @type {Chapter} */(chapters.at(0));
  expect(chapters.indexOf(ch0)).toBe(0);

  const ch1 = /** @type {Chapter} */(chapters.at(1));
  expect(chapters.indexOf(ch1)).toBe(1);

  expect(chapters.indexOf({ title: "Something", timecode: 1 }))
    .toBe(undefined);
});

test('can find chapter for time', () => {
  const chapters = getTestChapters();

  expect(chapters.timeToChapter(0)).toBeUndefined();
  expect(chapters.timeToChapter(1)?.title).toBe("First");
  expect(chapters.timeToChapter(2)?.title).toBe("Second");
  expect(chapters.timeToChapter(3)?.title).toBe("Second");
});

test('can determine next/prev chapter', () => {
  const chapters = getTestChapters();

  const ch0 = /** @type {Chapter} */(chapters.at(0));
  const ch1 = /** @type {Chapter} */(chapters.at(1));

  expect(chapters.advance(ch0, +1)?.title).toBe("Second");
  expect(chapters.advance(ch1, +1)).toBeUndefined();

  expect(chapters.advance(ch0, -1)).toBeUndefined();
  expect(chapters.advance(ch1, -1)?.title).toBe("First");
});

test('can reverse chapters', () => {
  const chapters = getTestChapters();
  expect([...chapters.reversed()].map(ch => ch.timecode)).toEqual([2, 1]);
});
