import { major } from '@/templates/versions/major/major';
import { preid } from '@/templates/versions/prerelease/preid';
/**
 * Conditionally apply a template during a prerelease.
 */
export const $ifPrerelease = ($do: string, $else = "''") =>
	`\${Boolean(${preid()}) || ${major()} === 0 ? ${$do} : ${$else}}`;
