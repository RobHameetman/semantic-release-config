import { isVersionMatch } from './VersionMatch';
import { fakeVersionMatch } from './__test__';

describe('isVersionMatch()', () => {
	it('should return true given a valid VersionMatch array', () => {
		expect(isVersionMatch(fakeVersionMatch())).toBe(true);
	});

	it('should return false given an invalid VersionMatch array', () => {
		expect(isVersionMatch(['1.2.3', '1', '2', '4', undefined, undefined], '1.2.3')).toBe(false);
	});
});
