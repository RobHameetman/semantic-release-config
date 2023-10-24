import type { EnvValue } from '@utils/types/EnvValue';

export const $prereleaseBack = (offset = 1) =>
	`\${Number(nextRelease.version.split(/\\.|-/)[4]) - ${Math.abs(offset)} >= 1 ? Number(nextRelease.version.split(/\\.|-/)[4]) - ${Math.abs(offset)} : !isNaN(Number(nextRelease.version.split(/\\.|-/)[4])) ? 1 : ""}`;
