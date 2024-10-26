import { PR_PRERELEASE_LABELS } from './PrPrereleaseLabel';

describe('PR_PRERELEASE_LABELS', () => {
	it('should include the string value "branch"', () => {
		expect(PR_PRERELEASE_LABELS).toContain('branch');
	});

	it('should include the string value "commit"', () => {
		expect(PR_PRERELEASE_LABELS).toContain('commit');
	});

	it('should include the string value "date"', () => {
		expect(PR_PRERELEASE_LABELS).toContain('date');
	});

	it('should include the string value "pr"', () => {
		expect(PR_PRERELEASE_LABELS).toContain('pr');
	});

	it('should not include other values', () => {
		expect(PR_PRERELEASE_LABELS).toHaveLength(4);
	});
});

