import { $major } from '@templates/versions/major/$major';
import { $minor } from '@templates/versions/minor/$minor';
import { $patch } from '@templates/versions/patch/$patch';

/**
 * @deprecated
 */
export const $currentPatch = () => `${$major()}.${$minor()}.${$patch()}`;
