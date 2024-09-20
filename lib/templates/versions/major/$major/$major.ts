import { major } from '@/templates/versions/major/major';

/**
 * Retrieve the major version number from the release context in a template.
 */
export const $major = () => `\${${major()}}`;
