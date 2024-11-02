import { isPrBranchRule } from './PrBranchRule';
import { fakePrBranchRule } from './__test__';

describe('isPrBranchRule()', () => {
	it('should return true given a valid PrBranchRule', () => {
		expect(isPrBranchRule(fakePrBranchRule())).toBe(true);
	});

	it('should return false given an invalid PrBranchRule', () => {
		expect(isPrBranchRule(fakePrBranchRule({ release: 'pr.undefined.1234abcd.20131111.1', channel: 'pr-undefined' }))).toBe(false);
	});
});
