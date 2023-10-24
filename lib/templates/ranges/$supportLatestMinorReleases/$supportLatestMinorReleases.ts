import { $currentMajor } from '@templates/current/$currentMajor';
import { $minorBackBy } from '@templates/previous/$minorBackBy';

export const $supportLatestMinorReleases = (offset = 1) =>
	`>= ${$currentMajor()} < ${$minorBackBy(offset)}`;
