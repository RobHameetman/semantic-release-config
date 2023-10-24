import { VERSIONED_RELEASE_BRANCHES } from './versioned';

describe('VERSIONED_RELEASE_BRANCHES', () => {
	it('should be an array', () => {
		expect(VERSIONED_RELEASE_BRANCHES).toBeInstanceOf(Array);
	});

	it('should have semantic-release BranchObjects for a range of potential major versions', () => {
		expect(VERSIONED_RELEASE_BRANCHES).toContainEqual(expect.objectContaining({
			name: expect.stringMatching(/\d+\.X\.X/),
			range: expect.stringMatching(/\d+\.x\.x/),
			channel: expect.stringMatching(/^\d+$/),
		}));
	});
});

