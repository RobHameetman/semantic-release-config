import { faker } from '@faker-js/faker';
import { getEnvValue } from './getEnvValue';

describe('getEnvValue()', () => {
	let error: Error | null = null;
	let result: unknown = null;

	beforeAll(() => {
		process.env.TEST_ENV_VALUE = faker.datatype.boolean().toString();
	});

	beforeEach(() => {
		try {
			result = getEnvValue(process.env.TEST_ENV_VALUE);
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		error = null;
		result = null;
	});

	afterAll(() => {
		delete process.env.TEST_ENV_VALUE;
	});

	it('should not throw an error', () => {
		expect(error).toBeNull();
	});

	it('should return the the value of the provided environment variable', () => {
		expect(result).toStrictEqual(process.env.TEST_ENV_VALUE);
	});
});
