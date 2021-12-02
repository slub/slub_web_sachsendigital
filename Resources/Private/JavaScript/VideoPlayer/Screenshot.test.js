/**
 * @jest-environment jsdom
 */

// @ts-check

import { beforeEach, expect, test } from '@jest/globals';
import Environment from './Environment';
import { drawScreenshot } from './Screenshot';
import ScreenshotModal from './ScreenshotModal';
import { metadataArrayToString } from './util';

beforeEach(() => {
  // TODO: Reset JSDOM in a more robust way
  document.body.innerHTML = '';
});

function getEnvironment() {
  const env = new Environment();
  env.setLang({
    locale: 'en_US',
    twoLetterIsoCode: 'en',
    phrases: {
      'modal.screenshot.title': "Screenshot",
      'modal.screenshot.download-image': "Download Image",
      'modal.screenshot.show-metadata': "Show Metadata",
      'modal.screenshot.file-format': "File Format",
    },
  });
  return env;
}

function getTestMetadataArray() {
  return {
    metadata: {
      title: ["Test Video"],
      year: ["1912"],
    },
    screenshotFields: [
      "title",
      "year",
    ],
  };
}

test('can open screenshot overlay', async () => {
  const overlay = () => document.querySelector('.screenshot-modal');

  // not opened yet
  expect(overlay()).toBeNull();

  // opened; exact tags are in snapshot
  const modal = new ScreenshotModal(document.body, getEnvironment());
  modal.setVideo(new VideoMock(1920, 1080));
  modal.setMetadata(getTestMetadataArray());
  modal.open();
  await modal.update();
  expect(overlay()).toMatchSnapshot();
});

class VideoMock extends HTMLVideoElement {
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    super();

    this._mockWidth = width;
    this._mockHeight = height;
  }

  get width() {
    return this._mockWidth;
  }

  get videoWidth() {
    return this._mockWidth;
  }

  get height() {
    return this._mockHeight;
  }

  get videoHeight() {
    return this._mockHeight;
  }
}

customElements.define('video-mock', VideoMock, { extends: 'video' });

test('can draw to canvas', () => {
  const metadata = getTestMetadataArray();

  /**
   * @param {number} videoWidth
   * @param {number} videoHeight
   */
  const snapshotWithSize = (videoWidth, videoHeight) => {
    const video = new VideoMock(videoWidth, videoHeight);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext('2d');

    if (context === null) {
      throw new Error();
    }

    drawScreenshot(context, video, {
      captions: [
        { v: 'top', h: 'left', text: "top left" },
        { v: 'top', h: 'right', text: "top right" },
        { v: 'bottom', h: 'left', text: "bottom left" },
        { v: 'bottom', h: 'right', text: metadataArrayToString(metadata) },
      ],
    });

    // @ts-ignore TODO: Why wouldn't it recognize "__getEvents"?
    const events = context.__getEvents();
    expect(events).toMatchSnapshot();
  };

  snapshotWithSize(1920, 1080);
  snapshotWithSize(960, 540);
});
