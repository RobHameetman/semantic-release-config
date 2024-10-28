import { $supportLatestPrerelease } from '@/templates/ranges/$supportLatestPrerelease';

/**
 * Support only the latest prerelease version for a given version. For example,
 * if the next release version is 1.2.7-alpha.4, and the release is an alpha
 * prerelease, then this will deprecate 1.2.7-alpha.3 with the range
 * '>= 1.2.7-alpha.3 < 1.2.7-alpha.4'.
 *
 * @param $preids - One or more preids to deprecate.
 *
 * @returns A deprecation rule for the previous prerelease version of the
 * current release version (e.g. 1.2.7).
 */
export const supportLatestPrerelease = ($preid: string) => ({
	version: $supportLatestPrerelease($preid),
	message: 'A new prerelease version ${nextRelease.version} has been published.',
});
