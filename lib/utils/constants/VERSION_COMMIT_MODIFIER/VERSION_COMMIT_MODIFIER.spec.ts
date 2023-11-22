import { isString } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { VERSION_COMMIT_MODIFIER } from './VERSION_COMMIT_MODIFIER';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(() => {}),
}));

describe('VERSION_COMMIT_MODIFIER', () => {
	it('should be a string', () => {
		expect(isString(VERSION_COMMIT_MODIFIER)).toBe(true);
	});

	it('should first check for a generic environment variable', () => {
		expect(env).toBeCalledWith('RELEASE_COMMIT_MODIFIER');
	});

	it('should be a valid skip modifier by default', () => {
		expect(VERSION_COMMIT_MODIFIER).toStrictEqual(
			expect.stringMatching(/^(?:RELEASE |CI |ACTIONS |VERSION )SKIP$|^SKIP(?: RELEASE| CI| ACTIONS| VERSION)$/i),
		);
	});
});
