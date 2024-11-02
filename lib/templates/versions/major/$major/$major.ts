import { major } from '@/templates/versions/major/major';

/**
 * Retrieve the major version number from the release context in a template.
 *
 * @example
 * ```TypeScript
 * $major(); // If the release version is '12.X.X', this will return '${12}'
 * ```
 *
 * @returns The major version number for the next release version.
 */
export const $major = () => `\${${major()}}`;
