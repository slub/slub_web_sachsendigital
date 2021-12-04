// @ts-check

/**
 *
 * @param {MetadataArray} metadataArray
 * @returns {string}
 */
export function metadataArrayToString(metadataArray) {
  return metadataArray.screenshotFields
    // TODO: Find a better way
    .map(field => metadataArray.metadata[field]?.[0] ?? "")
    .join(' / ');
}
