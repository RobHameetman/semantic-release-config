import { areBranches } from './Branches';
import { fakeBranches } from './__test__';

describe('areBranches()', () => {
	it('should return true given valid Branches', () => {
		expect(areBranches(fakeBranches())).toBe(true);
	});

	it('should return false given invalid Branches', () => {
		expect(areBranches(fakeBranches({ includes: [{ not: 'a branch rule' }] }))).toBe(false);
	});
});
