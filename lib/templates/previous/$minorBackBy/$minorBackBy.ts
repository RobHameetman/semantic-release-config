import { $major } from '@templates/versions/major/$major';
import { $minorBack } from '@templates/versions/minor/$minorBack';

export const $minorBackBy = (offset = 1) =>
	`${$major()}.${$minorBack(offset)}.X`;
