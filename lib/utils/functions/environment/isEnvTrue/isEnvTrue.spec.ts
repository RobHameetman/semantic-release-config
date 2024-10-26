import { mockEnv } from '@@/utils/mockEnv';
import { isEnvTrue } from './isEnvTrue';

describe('isEnvTrue()', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;

	beforeAll(() => {
		processEnv = process.env;

		mockEnv('TEST_ENV_VALUE')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('false')
			.mockReturnValueOnce('test')
			.mockReturnValueOnce('')
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

	it('should return true given an environment variable with the value "true"', () => {
		expect(isEnvTrue(process.env.TEST_ENV_VALUE)).toBe(true);
	});

	it('should return false given an environment variable with the value "false"', () => {
		expect(isEnvTrue(process.env.TEST_ENV_VALUE)).toBe(false);
	});

	it('should return false given an environment variable with the value "test"', () => {
		expect(isEnvTrue(process.env.TEST_ENV_VALUE)).toBe(false);
	});

	it('should return false given an environment variable with the value ""', () => {
		expect(isEnvTrue(process.env.TEST_ENV_VALUE)).toBe(false);
	});

	it('should return false given an undefined environment variable', () => {
		expect(isEnvTrue(process.env.TEST_ENV_VALUE)).toBe(false);
	});
});
