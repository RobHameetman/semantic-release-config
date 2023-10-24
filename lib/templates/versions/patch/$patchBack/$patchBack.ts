import { patch } from '@templates/versions/patch/patch';

export const $patchBack = (offset = 1) =>
	`\${Number(${patch()}) - ${Math.abs(offset)} >= 0 ? Number(${patch()}) - ${Math.abs(offset)} : 0}`;
