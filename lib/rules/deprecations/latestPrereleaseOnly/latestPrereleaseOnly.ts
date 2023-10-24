import { $supportLatestPrerelease } from '@templates/ranges/$supportLatestPrerelease';
import { $preid } from '@templates/versions/prerelease/$preid';

export const latestPrereleaseOnly = ($type = $preid()) => ({
	version: $supportLatestPrerelease($type),
	message: 'This pre-release version is deprecated. Please use ^${nextRelease.version}',
});
