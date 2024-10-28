import { vparse } from '@/templates/versions/misc/vparse';

/**
 * Retrieve the prerelease preid with prerelease version from the release context.
 *
 * @example
 * ```TypeScript
 * preid(); // If the prerelease preid is 'rc.6', this will return 'rc.6'
 * ```
 *
 * @returns The prerelease preid with prerelease version for the next release
 * version.
 */
export const preidWithPrerelease = () => vparse(4);
