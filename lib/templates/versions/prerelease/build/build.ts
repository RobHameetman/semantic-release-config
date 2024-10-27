import { vparse } from '@/templates/versions/misc/vparse';

/**
 * Resolve the prerelease build ID from the semantic version number.
 *
 * @example
 * ```TypeScript
 * build(); // If the version is 'X.X.X-rc.12+build.34', this will return '34'
 * ```
 *
 * @returns The prerelease build ID as a string or an empty string if no build
 * ID is defined.
 */
export const build = () => vparse(5);
