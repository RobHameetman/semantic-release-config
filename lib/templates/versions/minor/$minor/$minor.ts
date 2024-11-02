import { minor } from '@/templates/versions/minor/minor';

/**
 * Retrieve the minor version number from the release context in a template.
 *
 * @example
 * ```TypeScript
 * $minor(); // If the version is 'X.12.X', this will return '${12}'
 * ```
 *
 * @returns The minor version number for the next release version.
 */
export const $minor = () => `\${${minor()}}`;
