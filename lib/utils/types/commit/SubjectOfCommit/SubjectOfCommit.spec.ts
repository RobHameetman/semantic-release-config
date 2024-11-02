import { isSubjectOfCommit } from './SubjectOfCommit';

describe('isSubjectOfCommit()', () => {
	it('should return true given a value for a commit message with a matching subject', () => {
		expect(isSubjectOfCommit('Update README [PROJ-1234]', 'fix(docs): Update README [PROJ-1234]')).toBe(true);
	});

	it('should return false given a value for a commit message with a non-matching subject', () => {
		expect(isSubjectOfCommit('fix', 'fix(docs): Update README [PROJ-1234]')).toBe(false);
		expect(isSubjectOfCommit('docs', 'fix(docs): Update README [PROJ-1234]')).toBe(false);
	});

	it('should return false given undefined for a commit message with a type and scope', () => {
		expect(isSubjectOfCommit(undefined, 'fix(docs): Update README [PROJ-1234]')).toBe(false);
	});

	it('should return false given undefined for a commit message with a scope and no type', () => {
		expect(isSubjectOfCommit(undefined, '(docs): Update README [PROJ-1234]')).toBe(false);
	});

	it('should return false given undefined for a commit message with a type and no scope', () => {
		expect(isSubjectOfCommit(undefined, 'fix: Update README [PROJ-1234]')).toBe(false);
	});

	it('should return false given undefined for a commit message with no type or scope', () => {
		expect(isSubjectOfCommit(undefined, 'Update README [PROJ-1234]')).toBe(false);
	});
});
