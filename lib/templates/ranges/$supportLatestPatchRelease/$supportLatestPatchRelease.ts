import { $ifPatchRelease } from '@/templates/conditional/$ifPatchRelease';
import { major } from '@/templates/versions/major/major';
import { minor } from '@/templates/versions/minor/minor';
import { patch } from '@/templates/versions/patch/patch';
import { patchBack } from '@/templates/versions/patch/patchBack';

/**
 * Deprecate the previous patch versions for the current minor version if the
 * release is a patch release.
 *
 * @privateRemarks
 * We can use template string literals here to make things a bit more readable
 * but the finalized template string itself which is passed to `_.template()`
 * has to use concatenation instead of being a nested template string literal
 * because this leads to an error about a missing closing bracket.
 *
 * @returns A deprecation rule for the previous patch versions of the current
 * minor release version (e.g. 1.2.0).
 */
export const $supportLatestPatchRelease = () =>
	$ifPatchRelease(
		`">= " + ${major()} + "." + ${minor()} + "." + (${patchBack()}) + " < " + ${major()} + "." + ${minor()} + "." + ${patch()}`,
		'">= " + nextRelease.version + " < " + nextRelease.version',
	);
