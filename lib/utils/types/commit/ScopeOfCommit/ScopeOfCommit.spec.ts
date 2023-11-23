import { isScopeOfCommit } from './ScopeOfCommit';

describe('isScopeOfCommit()', () => {
	it('should return true given a value for a commit message with a matching scope', () => {
		expect(isScopeOfCommit('docs', 'fix(docs): Update README [PROJ-1234]')).toBe(true);
	});

	it('should return true given undefined for a commit message with no scope', () => {
		expect(isScopeOfCommit(undefined, 'fix: Update README [PROJ-1234]')).toBe(true);
	});

	it('should return false given a value for a commit message with a non-matching scope', () => {
		expect(isScopeOfCommit('fix', 'fix(docs): Update README [PROJ-1234]')).toBe(false);
		expect(isScopeOfCommit('Update README [PROJ-1234]', 'fix(docs): Update README [PROJ-1234]')).toBe(false);
	});

	it('should return false given undefined for a commit message with a scope', () => {
		expect(isScopeOfCommit(undefined, 'fix(docs): Update README [PROJ-1234]')).toBe(false);
	});
});
