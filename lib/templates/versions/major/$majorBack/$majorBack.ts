import { majorBack } from '@/templates/versions/major/majorBack';

/**
 * Retrieve a previous major version number from the release context in a
 * template.
 *
 * @example
 * ```TypeScript
 * $majorBack(2); // If the version is '12.X.X', this will return '10'
 * ```
 *
 * @param offset - [Optional] The number of major versions to go back. Defaults
 * to 1.
 *
 * @returns The previous major version number.
 */
export const $majorBack = (offset = 1) => `\${${majorBack(offset)}}`;
