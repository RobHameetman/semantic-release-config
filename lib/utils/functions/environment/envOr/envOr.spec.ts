import { env } from '@/utils/functions/environment/env';
import { onTest } from '@@/utils/onTest';
import { envOr } from './envOr';

describe('envOr()', () => {
	let error: Error | null = null;
	let result: unknown = null;
	let index = 1;

	beforeEach(() => {
		try {
			result = onTest(index, {
				1: () => {
					process.env.TEST_ENV_VALUE = 'true';
					process.env.ALTERNATIVE_TEST_ENV_VALUE = 'false';

					return env('TEST_ENV_VALUE', envOr('ALTERNATIVE_TEST_ENV_VALUE'));
				},
				2: () => {
					process.env.TEST_ENV_VALUE = 'test';

					return env('TEST_ENV_VALUE', envOr('ALTERNATIVE_TEST_ENV_VALUE'));
				},
				3: () => {
					process.env.ALTERNATIVE_TEST_ENV_VALUE = 'test';

					return env('TEST_ENV_VALUE', envOr('ALTERNATIVE_TEST_ENV_VALUE'));
				},
				4: () => {
					process.env.ANOTHER_TEST_VALUE = 'test';

					return env('TEST_ENV_VALUE', envOr(['ALTERNATIVE_TEST_ENV_VALUE', 'ANOTHER_TEST_VALUE']));
				},
				5: () => {
					return env('TEST_ENV_VALUE', envOr(['ALTERNATIVE_TEST_ENV_VALUE', 'ANOTHER_TEST_VALUE']));
				}
			});
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		delete process.env.TEST_ENV_VALUE;
		delete process.env.ALTERNATIVE_TEST_ENV_VALUE;
		delete process.env.ANOTHER_TEST_VALUE;

		error = null;
		result = null;

		index += 1;
	});

	it('should return "true" given an env variable with the value "true"', () => {
		expect(index).toBe(1);
		expect(error).toBeNull();

		expect(result).toBe('true');
	});

	it('should return "test" given an env variable with the value "test"', () => {
		expect(index).toBe(2);
		expect(error).toBeNull();

		expect(result).toBe('test');
	});

	it('should return "test" given an alternative env variable with the value "test"', () => {
		expect(index).toBe(3);
		expect(error).toBeNull();

		expect(result).toBe('test');
	});

	it('should return "test" given an array of env variable names when one is defined as "test"', () => {
		expect(index).toBe(4);
		expect(error).toBeNull();

		expect(result).toBe('test');
	});

	it('should return undefined given an array of undefined env variable names', () => {
		expect(index).toBe(5);
		expect(error).toBeNull();

		expect(result).toBe(undefined);
	});
});
