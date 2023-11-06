import { prerelease } from '@templates/versions/prerelease/prerelease';
import { back } from '@templates/versions/misc/back';

/**
 * Retrieve a previous prerelease version number from the release context.
 *
 * @example
 * ```TypeScript
 * prereleaseBack(2); // If the version is 'X.X.X-rc.12', this will return '10'
 * ```
 *
 * @param offset - [Optional] The number of prerelease versions to go back. Defaults
 * to 1.
 *
 * @returns The previous prerelease version number as a string or an empty
 * string if no prerelease version is defined.
 */
export const prereleaseBack = (offset = 1) => `${back(prerelease(), offset, 1)}`;
