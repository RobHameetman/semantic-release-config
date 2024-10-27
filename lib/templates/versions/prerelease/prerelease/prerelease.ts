import { preid } from '@/templates/versions/prerelease/preid';

/**
 * Retrieve the prerelease version number from the release context.
 *
 * @example
 * ```TypeScript
 * prerelease(); // If the version is 'X.X.X-rc.12', this will return '12'
 * ```
 *
 * @returns The prerelease version number as a string or an empty string if no
 * prerelease version is defined.
 */
export const prerelease = () => `(${preid()} || '').split('.').slice(-1)[0] || undefined`;
