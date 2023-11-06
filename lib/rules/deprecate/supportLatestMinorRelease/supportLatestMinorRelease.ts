import { $supportLatestMinorRelease } from '@templates/ranges/$supportLatestMinorRelease';

/**
 * Support only the latest minor and patch versions for a given major version.
 * For example, if the next release version is 1.3.0, and the release is a minor
 * release, then this will deprecate any patch versions for 1.2.X with the range
 * '>= 1.2.0 < 1.3.0'.
 *
 * @returns
 */
export const supportLatestMinorRelease = () => ({
	version: $supportLatestMinorRelease(),
	message: 'This minor version is deprecated. Please use ^${nextRelease.version}',
});
