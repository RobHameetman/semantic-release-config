import { isString } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { PR_PRERELEASE_TYPE } from './PR_PRERELEASE_TYPE';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn((envVar: string, cb = (value: unknown) => value) =>
		cb(process.env[envVar])),
}));

describe('PR_PRERELEASE_TYPE', () => {
	it('should be a string', () => {
		expect(isString(PR_PRERELEASE_TYPE)).toBe(true);
	});

	it('should be overridable', () => {
		expect(env).toBeCalledWith('RELEASE_PR_PRERELEASE_TYPE');
	});

	it('should use "pr" by default', () => {
		expect(PR_PRERELEASE_TYPE).toBe('pr');
	});
});
