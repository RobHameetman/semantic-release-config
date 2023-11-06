import { $supportLatestMajorRelease } from '@templates/ranges/$supportLatestMajorRelease';

/**
 * Support only the latest minor and patch versions for the current major
 * version. For example, if the next release version is 2.0.0, and the release
 * is a major release, then this will deprecate any minor or patch versions for
 * 1.X.X with the range '>= 1.0.0 < 2.0.0'. This is only used in standardized
 * configs where only the current major version is supported.
 *
 * @returns
 */
export const supportLatestMajorRelease = () => ({
	version: $supportLatestMajorRelease(),
	message: 'This pre-release version is deprecated. Please use ^${nextRelease.version}',
});
