import { $major } from '@templates/versions/major/$major';
import { $minor } from '@templates/versions/minor/$minor';
import { $patch } from '@templates/versions/patch/$patch';
import { $preid } from '@templates/versions/prerelease/$preid';
import { $prereleaseBack } from '@templates/versions/prerelease/$prereleaseBack';

export const $prereleaseBackBy = (offset = 1, $type = $preid()) =>
	`${$major()}.${$minor()}.${$patch()}-${$type}.${$prereleaseBack(offset)}`;
