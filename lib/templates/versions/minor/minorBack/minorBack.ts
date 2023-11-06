import { minor } from '@templates/versions/minor/minor';
import { back } from '@templates/versions/misc/back/back';

/**
 * Retrieve a previous minor version number from the release context.
 *
 * @example
 * ```TypeScript
 * minorBack(2); // If the version is 'X.12.X', this will return '10'
 * ```
 *
 * @param offset - [Optional] The number of minor versions to go back. Defaults
 * to 1.
 *
 * @returns The previous minor version number as a string.
 */
export const minorBack = (offset = 1) => back(minor(), offset);
