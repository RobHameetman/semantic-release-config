import { PR_PRERELEASE_STRATEGIES } from './PrPrereleaseStrategy';

describe('PR_PRERELEASE_STRATEGIES', () => {
	it('should include the string value "branch"', () => {
		expect(PR_PRERELEASE_STRATEGIES).toContain('branch');
	});

	it('should include the string value "branch.date"', () => {
		expect(PR_PRERELEASE_STRATEGIES).toContain('branch.date');
	});

	it('should include the string value "commit"', () => {
		expect(PR_PRERELEASE_STRATEGIES).toContain('commit');
	});

	it('should include the string value "commitfull"', () => {
		expect(PR_PRERELEASE_STRATEGIES).toContain('commitfull');
	});

	it('should include the string value "date"', () => {
		expect(PR_PRERELEASE_STRATEGIES).toContain('date');
	});

	it('should include the string value "datetime"', () => {
		expect(PR_PRERELEASE_STRATEGIES).toContain('datetime');
	});

	it('should include the string value "default"', () => {
		expect(PR_PRERELEASE_STRATEGIES).toContain('default');
	});

	it('should include the string value "default.date"', () => {
		expect(PR_PRERELEASE_STRATEGIES).toContain('default.date');
	});

	it('should not include other values', () => {
		expect(PR_PRERELEASE_STRATEGIES).toHaveLength(8);
	});
});

