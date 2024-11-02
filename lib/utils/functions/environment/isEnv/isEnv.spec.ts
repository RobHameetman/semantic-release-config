import { mockEnv } from '@@/utils/mockEnv';
import { isEnv } from './isEnv';

describe('isEnv()', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;

	beforeAll(() => {
		processEnv = process.env;

		mockEnv('TEST_ENV_VALUE')
			.mockReturnValueOnce('test')
			.mockReturnValueOnce('nottest')
			.mockReturnValue(undefined);
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;
	});

	it('should be true given an environment variable and matching value', () => {
		expect(isEnv('test')(process.env.TEST_ENV_VALUE)).toBe(true);
	});

	it('should be false given an environment variable and non-matching value', () => {
		expect(isEnv('test')(process.env.TEST_ENV_VALUE)).toBe(false);
	});

	it('should be false given an undefined environment variable and any value', () => {
		expect(isEnv('test')(process.env.TEST_ENV_VALUE)).toBe(false);
	});

	it('should be false given an undefined environment variable and an empty string', () => {
		expect(isEnv('')(process.env.TEST_ENV_VALUE)).toBe(false);
	});
});
