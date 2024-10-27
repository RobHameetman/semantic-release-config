import { isArray } from '@rob.hameetman/type-guards';
import { major } from '@/templates/versions/major/major';
import { minor } from '@/templates/versions/minor/minor';
import { patch } from '@/templates/versions/patch/patch';
import { preid } from '@/templates/versions/prerelease/preid';
import { $ifPrerelease } from '@/templates/conditional';
import { prereleaseBack } from '@/templates/versions/prerelease/prereleaseBack';

/**
 * Support only the latest prerelease version for a given release version. For
 * example, if the next release version is 1.2.7-alpha.4, and the release is an
 * alpha prerelease, then this will deprecate 1.2.7-alpha.3 with the range
 * '>= 1.2.7-alpha.3 < 1.2.7-alpha.4'.
 *
 * @param $preids One or more preids to deprecate.
 *
 * @returns A deprecation rule for the previous prerelease version of the
 * current release version (e.g. 1.2.7).
 */
export const $supportLatestPrerelease = ($preids: string | ReadonlyArray<string> = preid()) => {
	const result = $ifPrerelease(
		isArray($preids)
			? $preids.map(($preid) => `'>= ' + ${major()} + '.' + ${minor()} + '.' + ${patch()} + '-' + ${String($preid).startsWith('nextRelease') ? $preid : `'${$preid}'`} + '.' + ${prereleaseBack()} + ' < ' + nextRelease.version`).join(' || ')
			: `'>= ' + ${major()} + '.' + ${minor()} + '.' + ${patch()} + '-' + ${String($preids).startsWith('nextRelease') ? $preids : `'${$preids}'`} + '.' + ${prereleaseBack()} + ' < ' + nextRelease.version`,
	);

	console.info('Deprecated version:', result);

	return result;
};
