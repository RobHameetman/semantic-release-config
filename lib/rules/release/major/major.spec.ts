import { MAJOR_RELEASE_RULES } from './major';

describe('MAJOR_RELEASE_RULES', () => {
	it('should be an array', () => {
		expect(MAJOR_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should only have rules for semantic major versions', () => {
		expect(MAJOR_RELEASE_RULES).toContainEqual(expect.objectContaining({
			release: expect.stringMatching(/^major$/),
		}));
	});
});

