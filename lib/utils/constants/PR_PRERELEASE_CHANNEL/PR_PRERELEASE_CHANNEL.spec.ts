import { isString } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { PR_PRERELEASE_CHANNEL } from './PR_PRERELEASE_CHANNEL';

jest.mock('@utils/constants/PR_NUMBER', () => ({
	__esModule: true,
	PR_NUMBER: 42,
}));

jest.mock('@utils/constants/PR_PRERELEASE_TYPE', () => ({
	__esModule: true,
	PR_PRERELEASE_TYPE: 'pr',
}));

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn((envVar: string, cb = (value: unknown) => value) =>
		cb(process.env[envVar])),
}));

describe('PR_PRERELEASE_CHANNEL', () => {
	it('should be a string', () => {
		expect(isString(PR_PRERELEASE_CHANNEL)).toBe(true);
	});

	it('should be overridable', () => {
		expect(env).toBeCalledWith('RELEASE_PR_PRERELEASE_CHANNEL');
	});

	it('should use the format "pr-<PR_NUMBER>" by default', () => {
		expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringMatching(/^(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)-\d+$/g));
		expect(PR_PRERELEASE_CHANNEL).toBe('pr-42');
	});
});