import { isArray } from '@rob.hameetman/type-guards';
import { $ifPrerelease } from '@/templates/conditional';
import { major } from '@/templates/versions/major/major';
import { minor } from '@/templates/versions/minor/minor';
import { patch } from '@/templates/versions/patch/patch';
import { preid } from '@/templates/versions/prerelease/preid';
import { prerelease } from '@/templates/versions/prerelease/prerelease';
import { prereleaseBack } from '@/templates/versions/prerelease/prereleaseBack';

/**
 * Support only the latest prerelease version for a given release version. For
 * example, if the next release version is 1.2.7-alpha.7, and the release is an
 * alpha prerelease, then this will deprecate 1.2.7-alpha.2 with the range
 * '>= 1.2.7-alpha.2 < 1.2.7-alpha.7'.
 *
 * @param $preids One or more preids to deprecate.
 *
 * @returns A deprecation rule for the previous prerelease version of the
 * current release version (e.g. 1.2.7).
 */
export const $supportLatestPrerelease = ($preid: string = preid()) =>
	$ifPrerelease(
		`">= " + ${major()} + "." + ${minor()} + "." + ${patch()} + "-" + ${String($preid).startsWith('nextRelease') || String($preid) === preid() ? $preid : `"${$preid}"`} + "." + (${prereleaseBack()} === "1" ? "1" : "2") + " < " + ${major()} + "." + ${minor()} + "." + ${patch()} + "-" + ${String($preid).startsWith('nextRelease') || String($preid) === preid() ? $preid : `"${$preid}"`} + "." + ${prerelease()}`,
		'">= " + nextRelease.version + " < " + nextRelease.version',
	);
