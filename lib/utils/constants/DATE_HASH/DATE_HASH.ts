import { DATE } from '@utils/constants/DATE';

/**
 * A date hash used in specific prerelease types.
 */
export const DATE_HASH =
	`${DATE.getFullYear()}${String(DATE.getMonth() + 1).padStart(2, '0')}${String(DATE.getDate()).padStart(2, '0')}`;
