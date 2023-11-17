import { $prereleasesForVersion } from '@templates/ranges/$prereleasesForVersion';

/**
 * Deprecates any prerelease versions for a given release version. For example,
 * if the next release version is 1.2.7, and the version has alpha prereleases
 * up to 1.2.7-alpha.4, then this will deprecate alpha prerelease versions for
 * 1.2.7 up to 1.2.7-alpha.4  with the range '>= 1.2.7-alpha.0 < 1.2.7'.
 *
 * @param $preids - One or more preids to deprecate.
 *
 * @returns A deprecation rule for all prerelease versions of the current major
 * release.
 */
export const supportPrereleasesBeforeRelease = ($preids: string | ReadonlyArray<string>) => ({
	version: $prereleasesForVersion($preids),
	message: 'Version ${nextRelease.version} has been released.',
});
