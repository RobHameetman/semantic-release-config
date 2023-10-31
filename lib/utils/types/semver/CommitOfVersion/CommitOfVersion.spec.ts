import { isCommitOfVersion } from './CommitOfVersion';

describe('isCommitOfVersion()', () => {
	it('should return true given a value for a version with a matching commit sha when a build is included', () => {
		expect(isCommitOfVersion('abcd1234', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(true);
	});

	it('should return true given a value for a version with a matching commit sha when a build is not included', () => {
		expect(isCommitOfVersion('abcd1234', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(true);
	});

	it('should return true given undefined for a version without a commit sha when a build is included', () => {
		expect(isCommitOfVersion(undefined, '1.2.4-alpha.9+build.34')).toBe(true);
	});

	it('should return true given undefined for a version without a commit sha when a build is not included', () => {
		expect(isCommitOfVersion(undefined, '1.2.4-alpha.9')).toBe(true);
	});

	it('should return false given a value for a version with a non-matching commit sha when a build is included', () => {
		expect(isCommitOfVersion('1234abcd', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given a value for a version with a non-matching commit sha when a build is not included', () => {
		expect(isCommitOfVersion('1234abcd', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given undefined for a version with a commit sha when a build is included', () => {
		expect(isCommitOfVersion(undefined, '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given undefined for a version with a commit sha when a build is not included', () => {
		expect(isCommitOfVersion(undefined, '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given a value for a version without a commit sha when a build is included', () => {
		expect(isCommitOfVersion('1234abcd', '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given a value for a version without a commit sha when a build is not included', () => {
		expect(isCommitOfVersion('1234abcd', '1.2.4-alpha.9')).toBe(false);
	});
});
