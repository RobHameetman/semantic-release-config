import { isArray } from '@rob.hameetman/type-guards';
import { $ifRelease } from '@/templates/conditional/$ifRelease';
import { major } from '@/templates/versions/major/major';
import { minor } from '@/templates/versions/minor/minor';
import { patch } from '@/templates/versions/patch/patch';
import { preid } from '@/templates/versions';

/**
 * This range is used to deprecate any prerelease versions for the current
 * release version.
 *
 * @privateRemarks
 * We can use template string literals here to make things a bit more readable
 * but the finalized template string itself which is passed to `_.template()`
 * has to use concatenation instead of being a nested template string literal
 * because this leads to an error about a missing closing bracket.
 */
export const $prereleasesForVersion = ($preids: string | ReadonlyArray<string> = preid()) =>
	$ifRelease(
		isArray($preids)
			? `(${$preids.map(($preid) => `'>= ' + ${major()} + '.' + ${minor()} + '.' + ${patch()} + '-' + '${$preid}' + '.0 < ' + ${major()} + '.' + ${minor()} + '.' + ${patch()}`).join(' + \' || \' + ')})`
			: `('>= ' + ${major()} + '.' + ${minor()} + '.' + ${patch()} + '-' + '${$preids}' + '.0 < ' + ${major()} + '.' + ${minor()} + '.' + ${patch()})`,
		'">= " + nextRelease.version + " < " + nextRelease.version',
	);
