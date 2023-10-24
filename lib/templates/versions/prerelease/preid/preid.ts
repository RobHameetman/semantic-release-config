/**
 * Retrieve the prerelease preid from the release context.
 */
export const preid = () => 'nextRelease.version.split(/\\.|-/)[3]';
