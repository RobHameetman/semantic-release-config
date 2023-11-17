import { isString } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { VERSION_COMMIT_MESSAGE } from './VERSION_COMMIT_MESSAGE';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(() => {}),
}));

describe('VERSION_COMMIT_MESSAGE', () => {
	it('should be a string', () => {
		expect(isString(VERSION_COMMIT_MESSAGE)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('RELEASE_COMMIT_MESSAGE');
	});
});
