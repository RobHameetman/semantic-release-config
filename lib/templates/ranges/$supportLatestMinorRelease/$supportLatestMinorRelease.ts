import { $ifMinorRelease } from '@templates/conditional/$ifMinorRelease';
import { $currentMajor } from '@templates/current/$currentMajor';
import { $currentMinor } from '@templates/current/$currentMinor';

/**
 * Deprecate all patch releases for the previous minor version if the release
 * is a minor release.
 */
export const $supportLatestMinorRelease = () =>
	$ifMinorRelease(`'>= ${$currentMajor()} < ${$currentMinor()}'`);
