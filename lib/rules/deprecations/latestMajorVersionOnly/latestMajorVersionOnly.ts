import { $supportLatestMajorRelease } from '@templates/ranges/$supportLatestMajorRelease';

export const latestMajorVersionOnly = () => ({
	version: $supportLatestMajorRelease(),
	message: 'This pre-release version is deprecated. Please use ^${nextRelease.version}',
});
