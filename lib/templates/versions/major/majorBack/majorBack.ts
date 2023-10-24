import { major } from '@templates/versions/major/major';

export const majorBack = (offset = 1) =>
	`Number(${major()}) - ${Math.abs(offset)} >= 1 ? Number(${major()}) - ${Math.abs(offset)} : 1`;
