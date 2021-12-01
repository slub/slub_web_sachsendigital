import piexifjs from 'piexifjs';

export default class JPEG {
  constructor(jpegData) {
    this._jpeg = jpegData;
    this._exif = {
      '0th': {},
      'Exif': {},
    };
  }

  static fromBinaryString(s) {
    return new JPEG(s);
  }

  toBinaryString() {
    const dump = piexifjs.dump(this._exif);
    return piexifjs.insert(dump, this._jpeg);
  }

  /**
   *
   * @param {Partial<ImageMetadata>} metadata
   */
  addMetadata(metadata) {
    if (metadata.title) {
      // https://www.exiv2.org/tags.html: "A character string giving the title of the image."
      // TODO: Filter out non-ASCII?
      this._exif['0th'][piexifjs.ImageIFD.ImageDescription] = metadata.title;
    }

    if (metadata.comment) {
      this._exif['Exif'][piexifjs.ExifIFD.UserComment] = metadata.comment;
    }
  }
}
