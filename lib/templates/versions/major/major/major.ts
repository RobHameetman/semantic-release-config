import { vparse } from '@templates/versions/misc/vparse';

/**
 * Retrieve the major version number from the release context.
 */
export const major = () => vparse(1);
