import { $deprecatePrereleasesOnRelease } from '@templates/ranges/$deprecatePrereleasesOnRelease';
import { $preid } from '@templates/versions/prerelease/$preid';

console.log(`"${$deprecatePrereleasesOnRelease()}"`);

/**
 *
 * @param $preids - One or more preids to deprecate.
 * @returns
 */
export const latestPrereleaseOnly = ($preids: string | ReadonlyArray<string> = $preid()) => ({
	version: $deprecatePrereleasesOnRelease($preids),
	message: 'This pre-release version is deprecated. Please use ^${nextRelease.version}',
});
