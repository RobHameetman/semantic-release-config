import { $major } from '@templates/versions/major/$major';
import { $minor } from '@templates/versions/minor/$minor';

/**
 * @deprecated
 */
export const $currentMinor = () => `${$major()}.${$minor()}.X`;
