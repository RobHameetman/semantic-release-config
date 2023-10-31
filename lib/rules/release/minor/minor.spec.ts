import { MINOR_RELEASE_RULES } from './minor';

describe('MINOR_RELEASE_RULES', () => {
	it('should be an array', () => {
		expect(MINOR_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should only have rules for semantic minor versions', () => {
		expect(MINOR_RELEASE_RULES).toContainEqual(expect.objectContaining({
			release: expect.stringMatching(/^minor$/),
		}));
	});
});

