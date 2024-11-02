import { isTypeOfCommit } from './TypeOfCommit';

describe('isTypeOfCommit()', () => {
	it('should return true given a value for a commit message with a matching type', () => {
		expect(isTypeOfCommit('fix', 'fix(docs): Update README [PROJ-1234]')).toBe(true);
	});

	it('should return true given undefined for a commit message with no type', () => {
		expect(isTypeOfCommit(undefined, '(docs): Update README [PROJ-1234]')).toBe(true);
	});

	it('should return false given a value for a commit message with a non-matching type', () => {
		expect(isTypeOfCommit('docs', 'fix(docs): Update README [PROJ-1234]')).toBe(false);
		expect(isTypeOfCommit('Update README [PROJ-1234]', 'fix(docs): Update README [PROJ-1234]')).toBe(false);
	});

	it('should return false given undefined for a commit message with a type', () => {
		expect(isTypeOfCommit(undefined, 'fix(docs): Update README [PROJ-1234]')).toBe(false);
	});
});
