import { vparse } from '@templates/versions/misc/vparse';

/**
 * Retrieve the patch version number from the release context.
 */
export const patch = () => vparse(3);
