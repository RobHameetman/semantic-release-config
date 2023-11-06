import { isString } from '@rob.hameetman/type-guards';
import { DATE_HASH } from './DATE_HASH';

jest.mock('@utils/constants/DATE', () => ({
	__esModule: true,
	DATE: new Date(2023, 1, 5, 12, 33, 41),
}));

describe('DATE_HASH', () => {
	it('should be a string', () => {
		expect(isString(DATE_HASH)).toBe(true);
	});

	it('should use the format "YYYYMMDD"', () => {
		expect(DATE_HASH).toStrictEqual(expect.stringMatching(/^\d{8}$/g));
		expect(DATE_HASH).toBe('20230205');
	});

	it('should not include the time', () => {
		expect(DATE_HASH).not.toStrictEqual(expect.stringContaining('12'));
		expect(DATE_HASH).not.toStrictEqual(expect.stringContaining('33'));
		expect(DATE_HASH).not.toStrictEqual(expect.stringContaining('41'));
	});
});
