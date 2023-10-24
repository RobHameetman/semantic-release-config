/**
 * Retrieve the minor version number from the release context.
 */
export const minor = () => 'nextRelease.version.split(/\\.|-/)[1]';
