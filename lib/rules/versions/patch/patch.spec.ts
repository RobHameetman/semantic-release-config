import { PATCH_RELEASE_RULES } from './patch';

describe('PATCH_RELEASE_RULES', () => {
	it('should be an array', () => {
		expect(PATCH_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should only have rules for semantic patch versions', () => {
		expect(PATCH_RELEASE_RULES).toContainEqual(expect.objectContaining({
			release: expect.stringMatching(/^patch$/),
		}));
	});
});

