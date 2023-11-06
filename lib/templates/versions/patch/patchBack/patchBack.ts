import { patch } from '@templates/versions/patch/patch';
import { back } from '@templates/versions/misc/back/back';

/**
 * Retrieve a previous patch version number from the release context.
 *
 * @example
 * ```TypeScript
 * patchBack(2); // If the version is 'X.X.12', this will return '10'
 * ```
 *
 * @param offset - [Optional] The number of patch versions to go back. Defaults
 * to 1.
 *
 * @returns The previous patch version number as a string.
 */
export const patchBack = (offset = 1) => back(patch(), offset);
