import { prerelease } from '@/templates/versions/prerelease/prerelease';

/**
 * Retrieve the prerelease version number from the release context in a template.
 *
 * @example
 * ```TypeScript
 * $prerelease(); // If the version is 'X.X.X-rc.12', this will return '${12}'
 * ```
 *
 * @returns The prerelease version number as a string or an empty string if no
 * prerelease version is defined.
 */
export const $prerelease = () => `\${${prerelease()}}`;
