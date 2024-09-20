import { vparse } from '@/templates/versions/misc/vparse';

/**
 * Retrieve the prerelease preid from the release context.
 */
export const preid = () => vparse(4);
