import { DATE } from '@utils/constants/DATE';

/**
 * A date hash used in specific prerelease types, like PR prereleases. This pads
 * the month and day with a leading zero if necessary so that the date has is
 * always 8 characters long. The format is `YYYYMMDD`.
 */
export const DATE_HASH =
	`${DATE.getFullYear()}${String(DATE.getMonth() + 1).padStart(2, '0')}${String(DATE.getDate()).padStart(2, '0')}`;
