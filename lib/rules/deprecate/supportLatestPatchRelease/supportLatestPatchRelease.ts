import { $supportLatestPatchRelease } from '@templates/ranges/$supportLatestPatchRelease';

/**
 * Support only the latest patch version for a given minor version. For example,
 * if the next release version is 1.2.8, and the release is a patch release,
 * then this will deprecate version 1.2.7 with the range
 * '>= 1.2.7 < 1.2.8'.
 * @returns
 */
export const supportLatestPatchRelease = () => ({
	version: $supportLatestPatchRelease(),
	message: 'This patch version is deprecated. Please use ^${nextRelease.version}',
});
