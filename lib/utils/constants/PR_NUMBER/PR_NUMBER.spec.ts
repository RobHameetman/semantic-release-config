import { isNumber, isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';
import { PR_NUMBER } from './PR_NUMBER';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn((envVar: string, cb = (value: unknown) => value) =>
		cb(process.env[envVar])),
}));

jest.mock('@utils/functions/environment/envOr', () => ({
	__esModule: true,
	envOr: jest.fn((envs: ReadonlyArray<string>) =>
		(value: string | undefined) => value || envs.map(
			(envName: string) => envName === 'GITHUB_REF'
				? 'refs/pull/42/merge'
				: process.env[envName]
		).find((env: unknown) => env !== undefined && env !== '')),
}));

describe('PR_NUMBER', () => {
	it('should be a number or undefined', () => {
		expect(isNumber(PR_NUMBER) || isUndefined(PR_NUMBER)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('CI_PR_NUMBER', expect.any(Function));
	});

	it('should check for specific alternatives when a generic environment variable is not defined', () => {
		expect(envOr).toBeCalledWith(expect.arrayContaining(['CI_PULL_REQUEST']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['CI_MERGE_REQUEST_IID']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['PULL_REQUEST_NUMBER']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['CIRCLE_PR_NUMBER']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['TRAVIS_PULL_REQUEST']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['BITBUCKET_PR_ID']));
	});

	it('should check the commit ref when no relevant environment variables are defined', () => {
		expect(env).toBeCalledWith('CI_REF', expect.any(Function));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['CI_COMMIT_REF_NAME']));
		expect(envOr).toBeCalledWith(expect.arrayContaining(['GITHUB_REF']));
		expect(PR_NUMBER).toBe(42);
	});
});
