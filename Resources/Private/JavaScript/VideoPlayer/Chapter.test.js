const { Chapters } = require('./Chapters');

test('can find chapter for time', () => {
  const chapters = new Chapters([
    { title: "Second", timecode: "2" },
    { title: "First", timecode: 1 },
  ]);

  expect(chapters.timeToChapter(0)).toBeUndefined();
  expect(chapters.timeToChapter(1).title).toBe("First");
  expect(chapters.timeToChapter(2).title).toBe("Second");
  expect(chapters.timeToChapter(3).title).toBe("Second");
});
