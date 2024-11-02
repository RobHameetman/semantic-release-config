import { $supportLatestMinorRelease } from '@/templates/ranges/$supportLatestMinorRelease';

/**
 * Support only the latest minor and patch versions for a given major version.
 * For example, if the next release version is 1.3.0, and the release is a minor
 * release, then this will deprecate any patch versions for 1.2.X with the range
 * '>= 1.2.0 < 1.3.0'.
 *
 * @returns A deprecation rule for any patch versions in any previous minor
 * versions for the current major release.
 */
export const supportLatestMinorRelease = () => ({
	version: $supportLatestMinorRelease(),
	message: 'This version is deprecated. Please use ^${nextRelease.version}',
});
