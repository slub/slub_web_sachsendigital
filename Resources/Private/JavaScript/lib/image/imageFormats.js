// @ts-check

import JPEG from './jpeg';
import PNG from './png';

/**
 * @type {ImageFormatDesc[]}
 */
const imageFormats = [
  {
    mimeType: 'image/png',
    label: "PNG",
    parseBinaryString: (s) => {
      return PNG.fromBinaryString(s);
    },
  },
  {
    mimeType: 'image/jpeg',
    label: "JPEG",
    parseBinaryString: (s) => {
      return JPEG.fromBinaryString(s);
    },
  },
  {
    mimeType: 'image/tiff',
    label: "TIFF",
    parseBinaryString: () => undefined,
  },
];

export default imageFormats;
