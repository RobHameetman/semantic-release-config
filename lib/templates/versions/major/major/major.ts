/**
 * Retrieve the major version number from the release context.
 */
export const major = () => 'nextRelease.version.split(/\\.|-/)[0]';
