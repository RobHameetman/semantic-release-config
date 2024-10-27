import { vparse } from '@/templates/versions/misc/vparse';

/**
 * Retrieve the minor version number from the release context.
 *
 * @example
 * ```TypeScript
 * $minor(); // If the version is 'X.12.X', this will return '12'
 * ```
 *
 * @returns The minor version number for the next release version.
 */
export const minor = () => vparse(2);
