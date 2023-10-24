import { $majorBack } from '@templates/versions/major/$majorBack';

export const $majorBackBy = (offset = 1) => `${$majorBack(offset)}.X.X`;
