import { isArray } from '@rob.hameetman/type-guards';
import { $major } from '@templates/versions/major/$major';
import { $minor } from '@templates/versions/minor/$minor';
import { $patch } from '@templates/versions/patch/$patch';
import { $preid } from '@templates/versions/prerelease/$preid';
import { $prerelease } from '@templates/versions/prerelease/$prerelease';
import { $prereleaseBack } from '@templates/versions/prerelease/$prereleaseBack';

export const $supportLatestPrerelease = ($preids: string | ReadonlyArray<string> = $preid()) =>
	isArray($preids)
		? $preids.map(($preid) => `>= ${$major()}.${$minor()}.${$patch()}-${$preid}.${$prereleaseBack()} < \${nextRelease.version}`).join(' || ')
		: `>= ${$major()}.${$minor()}.${$patch()}-${$preids}.${$prereleaseBack()} < \${nextRelease.version}`;
