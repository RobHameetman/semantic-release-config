import { faker } from '@faker-js/faker';
import { isEnvValue } from './EnvValue';

describe('isEnvValue()', () => {
	it('should return true given a non-empty string', () => {
		expect(isEnvValue(faker.lorem.word())).toBe(true);
	});

	it('should return true given an empty string', () => {
		expect(isEnvValue('')).toBe(true);
	});

	it('should return true given "null"', () => {
		expect(isEnvValue('null')).toBe(true);
	});

	it('should return true given undefined', () => {
		expect(isEnvValue(undefined)).toBe(true);
	});

	it('should return false given a number', () => {
		expect(isEnvValue(1)).toBe(false);
	});

	it('should return false given null', () => {
		expect(isEnvValue(null)).toBe(false);
	});
});
