import { isCommitMatchGroups } from './CommitMatchGroups';
import { fakeCommitMatchGroups } from './__test__';

describe('isCommitMatchGroups()', () => {
	it('should return true given a valid CommitMatchGroups', () => {
		expect(isCommitMatchGroups(...fakeCommitMatchGroups())).toBe(true);
	});

	it('should return false given an invalid CommitMatchGroups', () => {
		expect(isCommitMatchGroups(...fakeCommitMatchGroups({ subject: undefined }))).toBe(false);
	});
});
