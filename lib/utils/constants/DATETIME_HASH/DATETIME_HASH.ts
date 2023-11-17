import { DATE } from '@utils/constants/DATE';
import { DATE_HASH } from '@utils/constants/DATE_HASH';

/**
 * A datetime hash used in specific prerelease types, like PR prereleases. This
 * appends the `DATE_HASH` with time heuristics and pads the hour, minute, and
 * seconds with a leading zero if necessary so that the datetime hash is always
 * 14 characters long. The format is `YYYYMMDDhhmmss`.
 */
export const DATETIME_HASH =
	`${DATE_HASH}${String(DATE.getHours()).padStart(2, '0')}${String(DATE.getMinutes()).padStart(2, '0')}${String(DATE.getSeconds()).padStart(2, '0')}`;
