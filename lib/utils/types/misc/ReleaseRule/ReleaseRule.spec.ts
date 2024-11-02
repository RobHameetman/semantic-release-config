import { isReleaseRule } from './ReleaseRule';
import { fakeReleaseRule } from './__test__';

describe('isReleaseRule()', () => {
	it('should return true given a valid ReleaseRule', () => {
		expect(isReleaseRule(fakeReleaseRule())).toBe(true);
	});

	it('should return false given an invalid ReleaseRule', () => {
		expect(isReleaseRule(fakeReleaseRule({ release: null }))).toBe(false);
	});
});
