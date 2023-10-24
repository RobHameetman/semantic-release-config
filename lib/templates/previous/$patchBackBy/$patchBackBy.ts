import { $major } from '@templates/versions/major/$major';
import { $minor } from '@templates/versions/minor/$minor';
import { $patchBack } from '@templates/versions/patch/$patchBack';

export const $patchBackBy = (offset = 1) =>
	`${$major()}.${$minor()}.${$patchBack(offset)}`;
