import { preidWithPrerelease } from '@/templates/versions/prerelease/preidWithPrerelease';

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
export const preid = () => `((${preidWithPrerelease()} || '').split('.').length > 1 ? (${preidWithPrerelease()} || '').split('.').slice(0, -1).join('.') : (${preidWithPrerelease()} || '').split('.')[0]) || undefined`;
