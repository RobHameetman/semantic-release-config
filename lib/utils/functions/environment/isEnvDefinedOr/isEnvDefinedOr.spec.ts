import { mockEnv } from '@@/utils/mockEnv';
import { isEnvDefinedOr } from './isEnvDefinedOr';

describe('isEnvDefinedOr()', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;

	beforeAll(() => {
		processEnv = process.env;

		mockEnv('TEST_ENV_DEFINED')
			.mockReturnValueOnce('test')
			.mockReturnValueOnce('test')
			.mockReturnValueOnce('')
			.mockReturnValue(undefined);

		mockEnv('TEST_ENV_UNDEFINED').mockReturnValue(undefined);
		mockEnv('TEST_ENV_UNDEFINED_AGAIN').mockReturnValue(undefined);
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

	it('should return true given the name of an environment variable which is defined', () => {
		expect(isEnvDefinedOr('TEST_ENV_DEFINED')(undefined)).toBe(true);
	});

	it('should return true given the names of one environment variable which is defined', () => {
		expect(isEnvDefinedOr(['TEST_ENV_UNDEFINED', 'TEST_ENV_UNDEFINED_AGAIN', 'TEST_ENV_DEFINED'])(undefined)).toBe(true);
	});

	it('should return false given the names of no environment variables which are defined', () => {
		expect(isEnvDefinedOr(['TEST_ENV_UNDEFINED', 'TEST_ENV_UNDEFINED_AGAIN'])(undefined)).toBe(false);
	});

	it('should return false given an empty string', () => {
		expect(isEnvDefinedOr('TEST_ENV_DEFINED')(undefined)).toBe(false);
	});

	it('should return false given an empty array with an empty string', () => {
		expect(isEnvDefinedOr([''])(undefined)).toBe(false);
	});

	it('should return false given an empty array', () => {
		expect(isEnvDefinedOr([])(undefined)).toBe(false);
	});
});
