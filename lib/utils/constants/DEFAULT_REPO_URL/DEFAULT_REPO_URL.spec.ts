import { DEFAULT_REPO_URL } from './DEFAULT_REPO_URL';

describe('DEFAULT_REPO_URL', () => {
	it('should be a non-empty string', () => {
		expect(typeof DEFAULT_REPO_URL).toBe('string');
		expect(DEFAULT_REPO_URL.length).toBeGreaterThan(0);
	});

	it('should be a valid url', () => {
		expect(DEFAULT_REPO_URL.startsWith('https://')).toBe(true);
	});

	it('should end with a trailing slash', () => {
		expect(DEFAULT_REPO_URL.endsWith('/')).toBe(true);
	});
});
