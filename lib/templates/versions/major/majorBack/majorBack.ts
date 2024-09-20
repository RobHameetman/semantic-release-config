import { major } from '@/templates/versions/major/major';
import { back } from '@/templates/versions/misc/back/back';

/**
 * Retrieve a previous major version number from the release context.
 *
 * @example
 * ```TypeScript
 * majorBack(2); // If the version is '12.X.X', this will return '10'
 * ```
 *
 * @param offset - [Optional] The number of major versions to go back. Defaults
 * to 1.
 *
 * @returns The previous major version number as a string.
 */
export const majorBack = (offset = 1) => back(major(), offset);
