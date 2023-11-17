import { isString } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { VERSION_COMMIT_TYPE } from './VERSION_COMMIT_TYPE';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(() => {}),
}));

describe('VERSION_COMMIT_TYPE', () => {
	it('should be a string', () => {
		expect(isString(VERSION_COMMIT_TYPE)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('RELEASE_COMMIT_TYPE');
	});
});
