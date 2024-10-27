import { minorBack } from '@/templates/versions/minor/minorBack';

/**
 * Retrieve a previous minor version number from the release context in a
 * template.
 *
 * @example
 * ```TypeScript
 * $minorBack(2); // If the version is 'X.12.X', this will return '10'
 * ```
 *
 * @param offset - [Optional] The number of minor versions to go back. Defaults
 * to 1.
 *
 * @returns The previous minor version number.
 */
export const $minorBack = (offset = 1) => `\${${minorBack(offset)}}`;
