/**
 * @jest-environment jsdom
 */

const { drawCanvas, generateMetadataObject } = require('./Screenshot');

beforeEach(() => {
  // TODO: Reset JSDOM in a more robust way
  document.body.innerHTML = '';
});

class VideoMock extends HTMLVideoElement {
  constructor(width, height) {
    super();

    this._mockWidth = width;
    this._mockHeight = height;
  }

  get videoWidth() {
    return this._mockWidth;
  }

  get videoHeight() {
    return this._mockHeight;
  }
}

customElements.define('video-mock', VideoMock, { extends: 'video' });

test('can draw to canvas', () => {
  const metadata = {
    metadata: {
      title: "Test Video",
      year: "1912",
      not_a_string: 123,
    },
    screenshotFields: [
      "title",
      "year",
      "not_a_string",
    ],
  };

  const snapshotWithSize = (videoWidth, videoHeight) => {
    const video = new VideoMock(videoWidth, videoHeight);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext('2d');

    drawCanvas(context, video, metadata);

    const events = context.__getEvents();
    expect(events).toMatchSnapshot();
  };

  snapshotWithSize(1920, 1080);
  snapshotWithSize(960, 540);
});

test('can generate metadata object', () => {
  document.body.innerHTML = `
    <data id="metadata" data-screenshotfields="title,year" style="display: none;">
      <data id="title" value="Some Video">Some Video</data>
      <data id="year" value="1922">1922</data>
      <data id="creator" value="Someone">Someone</data>
    </data>
  `;

  const metadataObject = generateMetadataObject();

  expect(metadataObject).toEqual({
    metadata: {
      title: "Some Video",
      year: "1922",
      creator: "Someone",
    },
    screenshotFields: [
      "title",
      "year",
    ],
  });
});
