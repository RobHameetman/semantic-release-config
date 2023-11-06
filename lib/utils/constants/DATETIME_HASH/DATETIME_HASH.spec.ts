import { isString } from '@rob.hameetman/type-guards';
import { DATE_HASH } from '@utils/constants/DATE_HASH';
import { DATETIME_HASH } from './DATETIME_HASH';

jest.mock('@utils/constants/DATE', () => ({
	__esModule: true,
	DATE: new Date(2023, 1, 5, 12, 33, 41),
}));

jest.mock('@utils/constants/DATE_HASH', () => ({
	__esModule: true,
	DATE_HASH: '20230205',
}));

describe('DATETIME_HASH', () => {
	it('should be a string', () => {
		expect(isString(DATETIME_HASH)).toBe(true);
	});

	it('should begin with the DATE_HASH', () => {
		expect(DATETIME_HASH.startsWith(DATE_HASH)).toBe(true);
	});

	it('should use the format "YYYYMMDDhhmmss"', () => {
		expect(DATETIME_HASH).toStrictEqual(expect.stringMatching(/^\d{14}$/g));
		expect(DATETIME_HASH).toBe('20230205123341');
	});

	it('should include the time', () => {
		expect(DATETIME_HASH).toStrictEqual(expect.stringContaining('12'));
		expect(DATETIME_HASH).toStrictEqual(expect.stringContaining('33'));
		expect(DATETIME_HASH).toStrictEqual(expect.stringContaining('41'));
	});
});
