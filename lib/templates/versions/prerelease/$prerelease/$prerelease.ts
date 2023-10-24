import { prerelease } from '@templates/versions/prerelease/prerelease';

/**
 * Retrieve the prerelease version number from the release context in a template.
 */
export const $prerelease = () => `\${${prerelease()}}`;
