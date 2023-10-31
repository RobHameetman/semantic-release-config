import { isBoolean } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { CHANGELOG_ENABLED } from './CHANGELOG_ENABLED';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(() => false),
}));

describe('CHANGELOG_ENABLED', () => {
	it('should be a boolean', () => {
		expect(isBoolean(CHANGELOG_ENABLED)).toBe(true);
	});

	it('should be true when the changelog is not explicitly disabled with an environment variable', () => {
		expect(env).toBeCalledWith('RELEASE_DISABLE_CHANGELOG', expect.any(Function));
	});
});
