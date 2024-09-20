import { preid } from '@/templates/versions/prerelease/preid';

/**
 * Retrieve the prerelease preid from the release context in a template.
 */
export const $preid = () => `\${${preid()}}`;
