import { mockEnv } from '@@/utils/mockEnv';
import { isEnvDefined } from './isEnvDefined';

describe('isEnvDefined()', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;

	beforeAll(() => {
		processEnv = process.env;

		mockEnv('TEST_ENV_VALUE')
			.mockReturnValueOnce('true')
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
		expect(isEnvDefined(process.env.TEST_ENV_VALUE)).toBe(true);
	});

	it('should return true given an environment variable with the value "test"', () => {
		expect(isEnvDefined(process.env.TEST_ENV_VALUE)).toBe(true);
	});

	it('should return false given an environment variable with the value ""', () => {
		expect(isEnvDefined(process.env.TEST_ENV_VALUE)).toBe(false);
	});

	it('should return false given an undefined environment variable', () => {
		expect(isEnvDefined(process.env.TEST_ENV_VALUE)).toBe(false);
	});
});
