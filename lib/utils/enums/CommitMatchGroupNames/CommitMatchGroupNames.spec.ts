import { isCommitMatchGroupName } from './CommitMatchGroupNames';

describe('isCommitMatchGroupName()', () => {
	it('should return true given the string value "type"', () => {
		expect(isCommitMatchGroupName('type')).toBe(true);
	});

	it('should return true given the string value "scope"', () => {
		expect(isCommitMatchGroupName('scope')).toBe(true);
	});

	it('should return true given the string value "subject"', () => {
		expect(isCommitMatchGroupName('subject')).toBe(true);
	});

	it('should return false given an empty string', () => {
		expect(isCommitMatchGroupName('')).toBe(false);
	});
});

