import { isArray } from '@rob.hameetman/type-guards';
import { $currentPatch } from '@templates/current/$currentPatch';
import { $preid } from '@templates/versions/prerelease/$preid';

/**
 * This range is used to deprecate any prerelease versions for the current
 * release version.
 */
export const $deprecatePrereleasesOnRelease = ($preids: string | ReadonlyArray<string> = $preid()) =>
	isArray($preids) && $preids.length > 1
		? $preids.map(($preid) => `>= ${$currentPatch()}-${$preid}.0 < ${$currentPatch()}`).join(' || ')
		: `>= ${$currentPatch()}-${$preids.length ? $preids : $preid()}.0 < ${currentPatch()}`;
