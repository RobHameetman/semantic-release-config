import { patch } from '@templates/versions/patch/patch';

/**
 * Retrieve the patch version number from the release context in a template.
 */
export const $patch = () => `\${${patch()}}`;
