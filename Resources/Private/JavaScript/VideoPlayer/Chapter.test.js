import Chapters from './Chapters';

function getTestChapters() {
  return new Chapters([
    { title: "Second", timecode: "2" },
    { title: "First", timecode: 1 },
  ]);
}

test('can find chapter for time', () => {
  const chapters = getTestChapters();

  expect(chapters.timeToChapter(0)).toBeUndefined();
  expect(chapters.timeToChapter(1).title).toBe("First");
  expect(chapters.timeToChapter(2).title).toBe("Second");
  expect(chapters.timeToChapter(3).title).toBe("Second");
});

test('can deteremine next/prev chapter', () => {
  const chapters = getTestChapters();

  expect(chapters.advance(chapters.at(0), +1).title).toBe("Second");
  expect(chapters.advance(chapters.at(1), +1)).toBeUndefined();

  expect(chapters.advance(chapters.at(0), -1)).toBeUndefined();
  expect(chapters.advance(chapters.at(1), -1).title).toBe("First");
});
