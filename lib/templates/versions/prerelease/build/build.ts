import { vparse } from '@/templates/versions/misc/vparse';

/**
 * Resolve the prerelease build ID from the semantic version number.
 */
export const build = () => vparse(5);
