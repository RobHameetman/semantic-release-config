import { DATE } from '@utils/constants/DATE';
import { DATE_HASH } from '@utils/constants/DATE_HASH';

/**
 * A date hash used in specific prerelease types.
 */
export const DATETIME_HASH =
	`${DATE_HASH}${String(DATE.getHours()).padStart(2, '0')}${String(DATE.getMinutes()).padStart(2, '0')}${String(DATE.getSeconds()).padStart(2, '0')}`;
