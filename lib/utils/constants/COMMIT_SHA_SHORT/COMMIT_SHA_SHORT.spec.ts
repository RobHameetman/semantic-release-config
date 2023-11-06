import { isString, isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';
import { COMMIT_SHA_SHORT } from './COMMIT_SHA_SHORT';

jest.mock('@utils/constants/COMMIT_SHA', () => ({
	__esModule: true,
	COMMIT_SHA: '3c274fc187e032ab384ac559377d8e86f3c8fc43',
}));

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(jest.requireActual('@utils/functions/environment/env').env),
}));

jest.mock('@utils/functions/environment/envOr', () => ({
	__esModule: true,
	envOr: jest.fn(jest.requireActual('@utils/functions/environment/envOr').envOr),
}));

describe('COMMIT_SHA_SHORT', () => {
	it('should be a string or undefined', () => {
		expect(isString(COMMIT_SHA_SHORT) || isUndefined(COMMIT_SHA_SHORT)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('CI_SHA_SHORT', expect.any(Function));
	});

	it('should check for specific alternatives when a generic environment variable is not defined', () => {
		expect(envOr).toBeCalledWith(expect.arrayContaining(['CI_COMMIT_SHORT_SHA']));
	});

	it('should use the first 8 characters of the COMMIT_SHA when no directly relevant environment variables are defined', () => {
		expect(COMMIT_SHA_SHORT).toBe('3c274fc1');
	});
});
