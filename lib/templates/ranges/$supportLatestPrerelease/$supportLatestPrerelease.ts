import { $currentPatch } from '@templates/current/$currentPatch';
import { $preid } from '@templates/versions/prerelease/$preid';

export const $supportLatestPrerelease = ($types: string | ReadonlyArray<string> = $preid()) =>
	`>= ${$currentPatch()}-${$types}.0 < \${nextRelease.version}`;
