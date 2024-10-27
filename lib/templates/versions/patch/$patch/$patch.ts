import { patch } from '@/templates/versions/patch/patch';

/**
 * Retrieve the patch version number from the release context in a template.
 *
 * @example
 * ```TypeScript
 * $patch(); // If the version is 'X.X.12', this will return '${12}'
 * ```
 *
 * @returns The patch version number for the next release version.
 */
export const $patch = () => `\${${patch()}}`;
