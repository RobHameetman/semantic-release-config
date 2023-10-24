import { onTest } from '@test/utils/onTest';
import { isEnvTrue } from './isEnvTrue';

describe('isEnvTrue()', () => {
	let error: Error | null = null;
	let result: unknown = null;
	let index = 1;

	beforeEach(() => {
		try {
			result = onTest(index, {
				1: () => {
					process.env.TEST_ENV_VALUE = 'true';
				},
				2: () => {
					process.env.TEST_ENV_VALUE = 'false';
				},
				3: () => {
					process.env.TEST_ENV_VALUE = 'test';
				},
				4: () => {
					process.env.TEST_ENV_VALUE = '';
				},
			});

			result = isEnvTrue(process.env.TEST_ENV_VALUE);
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		delete process.env.TEST_ENV_VALUE;

		error = null;
		result = null;

		index += 1;
	});

	it('should return true given an environment variable with the value "true"', () => {
		expect(index).toBe(1);
		expect(error).toBeNull();

		expect(result).toBe(true);
	});

	it('should return false given an environment variable with the value "false"', () => {
		expect(index).toBe(2);
		expect(error).toBeNull();

		expect(result).toBe(false);
	});

	it('should return false given an environment variable with the value "test"', () => {
		expect(index).toBe(3);
		expect(error).toBeNull();

		expect(result).toBe(false);
	});

	it('should return false given an environment variable with the value ""', () => {
		expect(index).toBe(4);
		expect(error).toBeNull();

		expect(result).toBe(false);
	});

	it('should return false given an undefined environment variable', () => {
		expect(index).toBe(5);
		expect(error).toBeNull();

		expect(result).toBe(false);
	});
});
