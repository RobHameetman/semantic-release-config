import { $ifMajorRelease } from '@/templates/conditional/$ifMajorRelease';
import { major } from '@/templates/versions/major/major';
import { majorBack } from '@/templates/versions/major/majorBack';

/**
 * Deprecate all minor and patch releases for the previous major version if the
 * release is a major release.
 */
export const $supportLatestMajorRelease = () =>
	$ifMajorRelease(`'>= ' + ${majorBack()} + '.0.0 < ' + ${major()} + '.0.0'`);
