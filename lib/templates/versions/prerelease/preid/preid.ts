import { vparse } from '@/templates/versions/misc/vparse';

/**
 * Retrieve the prerelease preid from the release context.
 *
 * @example
 * ```TypeScript
 * preid(); // If the prerelease preid is 'rc', this will return 'rc'
 * ```
 *
 * @returns The prerelease preid for the next release version.
 */
export const preid = () => vparse(4);
