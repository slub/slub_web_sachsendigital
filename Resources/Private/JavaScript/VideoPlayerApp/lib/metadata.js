// @ts-check

import { fillPlaceholders } from '../../lib/util';

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

/**
 *
 * @param {string} template
 * @param {MetadataArray['metadata']} metadata
 * @returns {string}
 */
export function fillMetadata(template, metadata) {
  const firstMetadataValues = Object.fromEntries(
    Object.entries(metadata).map(([key, values]) => [key, values[0] ?? ''])
  );

  return fillPlaceholders(template, firstMetadataValues);
}
