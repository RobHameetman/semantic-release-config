import { faker } from '@faker-js/faker';
import { env } from './env';
import { falseOrString } from './__test__';

describe('env()', () => {
	beforeAll(() => {
		process.env.TEST_VARIABLE_1 = 'true';
		process.env.TEST_VARIABLE_2 = falseOrString();
		process.env.TEST_VARIABLE_3 = faker.lorem.sentence();
	});

	afterAll(() => {
		delete process.env.TEST_VARIABLE_1;
		delete process.env.TEST_VARIABLE_2;
		delete process.env.TEST_VARIABLE_3;
		delete process.env.TEST_VARIABLE_4;
	});

	it('should return the value by default given no callback', () => {
		expect(() => env('TEST_VARIABLE_1')).not.toThrowError();
		expect(env('TEST_VARIABLE_1')).toStrictEqual(expect.any(String));
	});

	it('should return the string "true" when TEST_VARIABLE_1 is "true" given no callback', () => {
		expect(() => env('TEST_VARIABLE_1')).not.toThrowError();
		expect(env('TEST_VARIABLE_1')).toBe('true');
	});

	it('should return undefined given the name of an undefined variable and no callback', () => {
		expect(() => env('UNDEFINED_TEST_VARIABLE')).not.toThrowError();
		expect(env('UNDEFINED_TEST_VARIABLE')).toBe(undefined);
	});

	it('should return false given the name of an undefined variable and the Boolean constructor as a callback', () => {
		expect(() => env('UNDEFINED_TEST_VARIABLE', Boolean)).not.toThrowError();
		expect(env('UNDEFINED_TEST_VARIABLE', Boolean)).toBe(false);
	});

	it('should return the value returned by the callback given a callback', () => {
		expect(() => env('TEST_VARIABLE_3', (value) => value)).not.toThrowError();
		expect(env('TEST_VARIABLE_3', (value) => value)).toBe(process.env.TEST_VARIABLE_3);
		expect(env('TEST_VARIABLE_3', (value = '') => value.split(' '))).toBeInstanceOf(Array);
		expect(env('TEST_VARIABLE_3', () => 5)).toBe(5);
	});
});
