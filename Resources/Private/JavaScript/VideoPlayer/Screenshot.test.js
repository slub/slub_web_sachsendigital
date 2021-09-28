/**
 * @jest-environment jsdom
 */

import { drawCanvas } from './Screenshot';

beforeEach(() => {
  // TODO: Reset JSDOM in a more robust way
  document.body.innerHTML = '';
});

// TODO: Rewrite this using ScreenshotModal
// test('can open screenshot overlay', () => {
//   const overlay = () => document.getElementById('screenshot-overlay');

//   document.body.append(
//     createMetadataDom()
//   );

//   // not opened yet
//   expect(overlay()).toBeNull();

//   // opened; exact tags are in snapshot
//   renderScreenshot(document.createElement("video"));
//   expect(overlay()).toMatchSnapshot();

//   // close
//   document.querySelector('.close-screenshot-modal').dispatchEvent(new Event('click'));
//   expect(overlay()).toBeNull();
// });

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
