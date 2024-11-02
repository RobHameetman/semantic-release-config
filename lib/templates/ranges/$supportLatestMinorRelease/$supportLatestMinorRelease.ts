import { $ifMinorRelease } from '@/templates/conditional/$ifMinorRelease';
import { major } from '@/templates/versions/major/major';
import { minor } from '@/templates/versions/minor/minor';
import { minorBack } from '@/templates/versions/minor/minorBack';

/**
 * Deprecate all patch releases for the previous minor version if the release
 * is a minor release.
 *
 * @privateRemarks
 * We can use template string literals here to make things a bit more readable
 * but the finalized template string itself which is passed to `_.template()`
 * has to use concatenation instead of being a nested template string literal
 * because this leads to an error about a missing closing bracket.
 *
 * @returns A deprecation rule for the all patch versions of the previous
 * minor release version (e.g. 1.2.X).
 */
export const $supportLatestMinorRelease = () =>
	$ifMinorRelease(
		`">= " + ${major()} + "." + ${minorBack()} + ".0 < " + ${major()} + "." + ${minor()} + ".0"`,
		'">= " + nextRelease.version + " < " + nextRelease.version',
	);
