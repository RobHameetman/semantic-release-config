import { isString } from '@rob.hameetman/type-guards';
import { clockify as pad } from '@@/utils/clockify';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth();
const CURRENT_DAY = new Date().getDate();
const CURRENT_HOUR = new Date().getHours();
const CURRENT_MINUTE = new Date().getMinutes();

jest.unstable_mockModule('@/utils/constants/DATE', () => ({
	DATE: new Date(CURRENT_YEAR, CURRENT_MONTH - 1, CURRENT_DAY, CURRENT_HOUR, CURRENT_MINUTE, CURRENT_MINUTE),
}));

const { DATE_HASH } = await import('@/utils/constants/DATE_HASH');

describe('DATETIME_HASH', () => {
	let DATETIME_HASH: unknown = null;

	beforeEach(async () => {
		({ DATETIME_HASH } = await import('./DATETIME_HASH'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		DATETIME_HASH = null;
	});

	it('should be a string', () => {
		expect(isString(DATETIME_HASH)).toBe(true);
	});

	it('should begin with the DATE_HASH', () => {
		expect(String(DATETIME_HASH).startsWith(DATE_HASH)).toBe(true);
	});

	it('should use the format "YYYYMMDDhhmmss"', () => {
		expect(DATETIME_HASH).toStrictEqual(expect.stringMatching(/^\d{14}$/g));
		expect(DATETIME_HASH).toContain(`${CURRENT_YEAR}${pad(CURRENT_MONTH)}${pad(CURRENT_DAY)}${pad(CURRENT_HOUR)}${pad(CURRENT_MINUTE)}`);
	});

	it('should include the time', () => {
		expect(String(DATETIME_HASH).length).not.toBeLessThan(14)
	});
});
