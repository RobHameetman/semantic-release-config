import { minor } from '@/templates/versions/minor/minor';

/**
 * Retrieve the minor version number from the release context in a template.
 */
export const $minor = () => `\${${minor()}}`;
