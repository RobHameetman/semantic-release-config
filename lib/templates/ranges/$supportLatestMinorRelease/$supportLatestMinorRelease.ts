import { $ifMinorRelease } from '@/templates/conditional/$ifMinorRelease';
import { major } from '@/templates/versions/major/major';
import { minor } from '@/templates/versions/minor/minor';
import { minorBack } from '@/templates/versions/minor/minorBack';

/**
 * Deprecate all patch releases for the previous minor version if the release
 * is a minor release.
 */
export const $supportLatestMinorRelease = () =>
	$ifMinorRelease(`'>= ' + ${major()} + '.' + ${minorBack()} + '.0 < ' + ${major()} + '.' + ${minor()} + '.0'`);
