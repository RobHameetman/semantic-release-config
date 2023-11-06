import { preid } from '@templates/versions/prerelease/preid';

/**
 * Retrieve the prerelease version number from the release context.
 */
export const prerelease = () => `(${preid()} || '').split('.').slice(-1)[0] || undefined`;
