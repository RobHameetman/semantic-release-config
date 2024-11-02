import { isCommitMatch } from './CommitMatch';
import { fakeCommitMatch } from './__test__';

describe('isCommitMatch()', () => {
	it('should return true given a valid CommitMatch array', () => {
		expect(isCommitMatch(fakeCommitMatch())).toBe(true);
	});

	it('should return false given an invalid CommitMatch array', () => {
		expect(isCommitMatch(['fix(docs): Update README [PROJ-1234]', 'fix', 'docs', 'Update README [PROJ-1234]'], 'fix(docs): Update README [PROJ-1234]')).toBe(false);
	});
});
