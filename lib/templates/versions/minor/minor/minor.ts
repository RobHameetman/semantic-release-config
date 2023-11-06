import { vparse } from '@templates/versions/misc/vparse';

/**
 * Retrieve the minor version number from the release context.
 */
export const minor = () => vparse(2);
