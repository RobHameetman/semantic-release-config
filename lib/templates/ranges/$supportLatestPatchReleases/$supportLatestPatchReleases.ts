import { $currentMinor } from '@templates/current/$currentMinor';
import { $patchBackBy } from '@templates/previous/$patchBackBy';

export const $supportLatestPatchReleases = (offset = 1) =>
	`>= ${$currentMinor()} < ${$patchBackBy(offset)}`;
