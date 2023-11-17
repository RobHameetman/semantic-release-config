import { isVersionMatchGroups } from './VersionMatchGroups';
import { fakeVersionMatchGroups } from './__test__';

describe('isVersionMatchGroups()', () => {
	it('should return true given a valid VersionMatchGroups', () => {
		expect(isVersionMatchGroups(...fakeVersionMatchGroups())).toBe(true);
	});

	it('should return false given an invalid VersionMatchGroups', () => {
		expect(isVersionMatchGroups(...fakeVersionMatchGroups({ major: undefined }))).toBe(false);
	});
});
