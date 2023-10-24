import { $major } from '@templates/versions/major/$major';

/**
 * @deprecated
 */
export const $currentMajor = () => `${$major()}.X.X`;
