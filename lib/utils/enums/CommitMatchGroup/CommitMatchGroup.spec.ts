import { isCommitMatchGroup } from './CommitMatchGroup';

describe('isCommitMatchGroup()', () => {
	it('should return true given the string value "type"', () => {
		expect(isCommitMatchGroup('type')).toBe(true);
	});

	it('should return true given the string value "scope"', () => {
		expect(isCommitMatchGroup('scope')).toBe(true);
	});

	it('should return true given the string value "subject"', () => {
		expect(isCommitMatchGroup('subject')).toBe(true);
	});

	it('should return false given an empty string', () => {
		expect(isCommitMatchGroup('')).toBe(false);
	});
});

