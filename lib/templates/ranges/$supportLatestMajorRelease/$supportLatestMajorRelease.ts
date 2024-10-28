import { $ifMajorRelease } from '@/templates/conditional/$ifMajorRelease';
import { major } from '@/templates/versions/major/major';
import { majorBack } from '@/templates/versions/major/majorBack';

/**
 * Deprecate all minor and patch releases for the previous major version if the
 * release is a major release.
 *
 * @privateRemarks
 * We can use template string literals here to make things a bit more readable
 * but the finalized template string itself which is passed to `_.template()`
 * has to use concatenation instead of being a nested template string literal
 * because this leads to an error about a missing closing bracket.
 *
 * @returns A deprecation rule for all previous minor and patch versions of the
 * previous major release version (e.g. 1.X.X).
 */
export const $supportLatestMajorRelease = () =>
	$ifMajorRelease(
		`'>= ' + ${majorBack()} + '.0.0 < ' + ${major()} + '.0.0'`,
		'">= " + nextRelease.version + " < " + nextRelease.version',
	);
