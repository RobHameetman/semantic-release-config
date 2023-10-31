import { isBoolean } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { PUBLISH_FROM_DIST } from './PUBLISH_FROM_DIST';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(() => false),
}));

describe('PUBLISH_FROM_DIST', () => {
	it('should be a boolean', () => {
		expect(isBoolean(PUBLISH_FROM_DIST)).toBe(true);
	});

	it('should be true when the "RELEASE_PUBLISH_FROM_DIST" environment variable is true', () => {
		expect(env).toBeCalledWith('RELEASE_PUBLISH_FROM_DIST', expect.any(Function));
	});

	it('should default to false when the "RELEASE_PUBLISH_FROM_DIST" environment variable is not defined', () => {
		expect(PUBLISH_FROM_DIST).toBe(false);
	});
});
