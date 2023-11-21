import { isString, isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { BUILD_DIRECTORY } from './BUILD_DIRECTORY';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(jest.requireActual('@utils/functions/environment/env').env),
}));

describe('BUILD_DIRECTORY', () => {
	it('should be a string or undefined', () => {
		expect(isString(BUILD_DIRECTORY) || isUndefined(BUILD_DIRECTORY)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('RELEASE_BUILD_DIRECTORY');
	});
});
