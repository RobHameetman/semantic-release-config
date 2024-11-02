import { patch } from '@/templates/versions/patch/patch';

/**
 * Retrieve a previous patch version number from the release context in a
 * template.
 *
 * @example
 * ```TypeScript
 * $patchBack(2); // If the version is 'X.X.12', this will return '10'
 * ```
 *
 * @param offset - [Optional] The number of patch versions to go back. Defaults
 * to 1.
 *
 * @returns The previous patch version number.
 */
export const $patchBack = (offset = 1) =>
	`\${Number(${patch()}) - ${Math.abs(offset)} >= 0 ? Number(${patch()}) - ${Math.abs(offset)} : 0}`;
