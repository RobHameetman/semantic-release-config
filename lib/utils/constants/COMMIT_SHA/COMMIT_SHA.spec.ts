import { isString, isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';
import { COMMIT_SHA } from './COMMIT_SHA';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(jest.requireActual('@utils/functions/environment/env').env),
}));

jest.mock('@utils/functions/environment/envOr', () => ({
	__esModule: true,
	envOr: jest.fn(jest.requireActual('@utils/functions/environment/envOr').envOr),
}));

describe('COMMIT_SHA', () => {
	it('should be a string or undefined', () => {
		expect(isString(COMMIT_SHA) || isUndefined(COMMIT_SHA)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('CI_SHA', expect.any(Function));
	});

	it('should check for specific alternatives when a generic environment variable is not defined', () => {
		expect(envOr).toBeCalledWith(expect.arrayContaining(['CI_COMMIT_SHA']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GITHUB_SHA']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GIT_COMMIT']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['CIRCLE_SHA1']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['TRAVIS_COMMIT']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['BITBUCKET_COMMIT']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['BUILD_SOURCEVERSION']));
	});
});
