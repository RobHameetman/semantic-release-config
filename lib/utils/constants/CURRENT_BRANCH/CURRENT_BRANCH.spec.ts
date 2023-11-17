import { isString, isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';
import { CURRENT_BRANCH } from './CURRENT_BRANCH';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(jest.requireActual('@utils/functions/environment/env').env),
}));

jest.mock('@utils/functions/environment/envOr', () => ({
	__esModule: true,
	envOr: jest.fn(jest.requireActual('@utils/functions/environment/envOr').envOr),
}));

describe('CURRENT_BRANCH', () => {
	it('should be a string or undefined', () => {
		expect(isString(CURRENT_BRANCH) || isUndefined(CURRENT_BRANCH)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('CI_COMMIT_BRANCH', expect.any(Function));
	});

	it('should check for specific alternatives when a generic environment variable is not defined', () => {
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GITHUB_HEAD_REF']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GIT_BRANCH']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['CI_MERGE_REQUEST_SOURCE_BRANCH_NAME']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['CIRCLE_BRANCH']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['TRAVIS_BRANCH']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['BITBUCKET_BRANCH']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['BUILD_SOURCEBRANCH']));
	});
});
