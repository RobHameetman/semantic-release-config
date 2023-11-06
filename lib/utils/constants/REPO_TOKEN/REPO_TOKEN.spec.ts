import { isString, isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';
import { REPO_TOKEN } from './REPO_TOKEN';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(() => {}),
}));

jest.mock('@utils/functions/environment/envOr', () => ({
	__esModule: true,
	envOr: jest.fn(() => {}),
}));

describe('REPO_TOKEN', () => {
	it('should be a string or undefined', () => {
		expect(isString(REPO_TOKEN) || isUndefined(REPO_TOKEN)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('CI_TOKEN', undefined);
	});

	it('should check for specific alternatives when a generic environment variable is not defined', () => {
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GITHUB_TOKEN']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GH_TOKEN']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GITLAB_TOKEN']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['BITBUCKET_TOKEN']));
	});
});
