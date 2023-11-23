import { isString, isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';
import { REPO_NAME } from './REPO_NAME';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(() => {}),
}));

jest.mock('@utils/functions/environment/envOr', () => ({
	__esModule: true,
	envOr: jest.fn(() => {}),
}));

describe('REPO_NAME', () => {
	it('should be a string or undefined', () => {
		expect(isString(REPO_NAME) || isUndefined(REPO_NAME)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('CI_REPOSITORY', undefined);
	});

	it('should check for specific alternatives when a generic environment variable is not defined', () => {
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GITHUB_REPOSITORY']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GH_REPOSITORY']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GITLAB_REPOSITORY']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['BITBUCKET_REPOSITORY']));
	});
});
