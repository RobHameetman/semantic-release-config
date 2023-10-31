import { preid } from '@/templates/versions/prerelease/preid';

/**
 * Retrieve the prerelease preid from the release context in a template.
 *
 * @example
 * ```TypeScript
 * $preid(); // If the prerelease preid is 'rc', this will return '${rc}'
 * ```
 *
 * @returns The prerelease preid for the next release version.
 */
export const $preid = () => `\${${preid()}}`;
