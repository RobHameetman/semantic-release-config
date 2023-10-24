import { $major } from '@templates/versions/major/$major';
import { $minor } from '@templates/versions/minor/$minor';
import { $patch } from '@templates/versions/patch/$patch';

/**
 * @TODO
 */
export const $currentRelease = () => `${$major()}.${$minor()}.${$patch()}`;
