import { SKIP_RELEASE_RULES } from './skip';

describe('SKIP_RELEASE_RULES', () => {
	it('should be an array', () => {
		expect(SKIP_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should only have rules for skipping releases', () => {
		expect(SKIP_RELEASE_RULES).toContainEqual(expect.objectContaining({
			release: false,
		}));
	});
});

