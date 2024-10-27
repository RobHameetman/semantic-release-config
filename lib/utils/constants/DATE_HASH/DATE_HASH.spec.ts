import { isString } from '@rob.hameetman/type-guards';
import { clockify as pad } from '@@/utils/clockify';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth();
const CURRENT_DAY = new Date().getDate();

jest.unstable_mockModule('@/utils/constants/DATE', () => ({
	DATE: new Date(CURRENT_YEAR, CURRENT_MONTH - 1, CURRENT_DAY, 12, 33, 41),
}));

describe('DATE_HASH', () => {
	let DATE_HASH: unknown = null;

	beforeEach(async () => {
		({ DATE_HASH } = await import('./DATE_HASH'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		DATE_HASH = null;
	});

	it('should be a string', () => {
		expect(isString(DATE_HASH)).toBe(true);
	});

	it('should use the format "YYYYMMDD"', () => {
		expect(DATE_HASH).toStrictEqual(expect.stringMatching(/^\d{8}$/g));
		expect(DATE_HASH).toBe(`${CURRENT_YEAR}${pad(CURRENT_MONTH)}${pad(CURRENT_DAY)}`);
	});

	it('should not include the time', () => {
		expect(String(DATE_HASH).length).not.toBeGreaterThan(8)
	});
});
