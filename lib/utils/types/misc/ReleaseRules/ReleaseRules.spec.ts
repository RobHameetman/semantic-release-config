import { areReleaseRules } from './ReleaseRules';
import { fakeReleaseRules } from './__test__';

describe('areReleaseRules()', () => {
	it('should return true given a valid ReleaseRule', () => {
		expect(areReleaseRules(fakeReleaseRules())).toBe(true);
	});

	it('should return false given an invalid ReleaseRule', () => {
		expect(areReleaseRules(fakeReleaseRules({ release: null }))).toBe(false);
	});
});
