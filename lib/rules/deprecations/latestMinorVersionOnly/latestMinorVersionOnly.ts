import { $supportLatestMinorRelease } from '@templates/ranges/$supportLatestMinorRelease';

export const latestMinorVersionOnly = () => ({
	version: $supportLatestMinorRelease(),
	message: 'This minor version is deprecated. Please use ^${nextRelease.version}',
});
