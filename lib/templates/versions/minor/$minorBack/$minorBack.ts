import { minor } from '@templates/versions/minor/minor';

export const $minorBack = (offset = 1) =>
	`\${Number(${minor()}) - ${Math.abs(offset)} >= 0 ? Number(${minor()}) - ${Math.abs(offset)} : 0}`;
