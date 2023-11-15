import { isArray } from '@rob.hameetman/type-guards';
import { $ifRelease } from '@templates/conditional/$ifRelease';
import { major } from '@templates/versions/major/major';
import { minor } from '@templates/versions/minor/minor';
import { patch } from '@templates/versions/patch/patch';

/**
 * This range is used to deprecate any prerelease versions for the current
 * release version.
 */
export const $prereleasesForVersion = ($preids: string | ReadonlyArray<string>) =>
	$ifRelease(
		isArray($preids)
			? `(${$preids.map(($preid) => `'>= ' + ${major()} + '.' + ${minor()} + '.' + ${patch()} + '-' + '${$preid}' + '.0 < ' + ${major()} + '.' + ${minor()} + '.' + ${patch()}`).join(' + \' || \' + ')})`
			: `('>= ' + ${major()} + '.' + ${minor()} + '.' + ${patch()} + '-' + '${$preids}' + '.0 < ' + ${major()} + '.' + ${minor()} + '.' + ${patch()})`,
	);
