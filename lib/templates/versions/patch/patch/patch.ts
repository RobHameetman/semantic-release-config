/**
 * Retrieve the patch version number from the release context.
 */
export const patch = () => 'nextRelease.version.split(/\\.|-/)[2]';
