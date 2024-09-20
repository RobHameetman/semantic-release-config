import { major } from '@/templates/versions/major/major';
import { preid } from '@/templates/versions/prerelease/preid';
/**
 * Conditionally apply a template during a release.
 */
export const $ifRelease = ($do: string, $else = "''") =>
	`\${Boolean(${preid()}) === false && ${major()} > 0 ? ${$do} : ${$else}}`;
