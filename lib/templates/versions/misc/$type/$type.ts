/**
 * Returns the release type from the release context.
 *
 * @example
 * ```TypeScript
 * $type(); // If the release type is 'major', this will return 'major'
 * ```
 *
 * @returns The release type for the next release version.
 */
export const $type = () => '${nextRelease.type}';
