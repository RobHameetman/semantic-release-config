/**
 * Retrieve the prerelease version number from the release context.
 */
export const prerelease = () => 'nextRelease.version.split(/\\.|-/)[4]';
