import { $supportLatestPatchRelease } from '@templates/ranges/$supportLatestPatchRelease';

export const latestPatchVersionOnly = () => ({
	version: $supportLatestPatchRelease(),
	message: 'This pre-release version is deprecated. Please use ^${nextRelease.version}',
});
