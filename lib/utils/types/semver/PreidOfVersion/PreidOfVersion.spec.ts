import { isPreidOfVersion } from './PreidOfVersion';

describe('isPreidOfVersion()', () => {
	it('should return true given a value for a pr prerelease version with a matching preid when a build is included', () => {
		expect(isPreidOfVersion('pr.9.abcd1234.20131111.7', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(true);
	});

	it('should return true given a value for a pr prerelease version with a matching preid when a build is not included', () => {
		expect(isPreidOfVersion('pr.9.abcd1234.20131111.7', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(true);
	});

	it('should return true given a value for a prerelease version with a matching preid when a build is included', () => {
		expect(isPreidOfVersion('alpha.9', '1.2.4-alpha.9+build.34')).toBe(true);
	});

	it('should return true given a value for a prerelease version with a matching preid when a build is not included', () => {
		expect(isPreidOfVersion('alpha.9', '1.2.4-alpha.9')).toBe(true);
	});

	it('should return true given undefined for a release version without a preid when a build is included', () => {
		expect(isPreidOfVersion(undefined, '1.2.4+build.34')).toBe(true);
	});

	it('should return true given undefined for a release version without a preid when a build is not included', () => {
		expect(isPreidOfVersion(undefined, '1.2.4')).toBe(true);
	});

	it('should return false given a value for a pr prerelease version with a non-matching preid when a build is included', () => {
		expect(isPreidOfVersion('pr.9.1234abcd.20131111.7', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given a value for a pr prerelease version with a non-matching preid when a build is not included', () => {
		expect(isPreidOfVersion('pr.9.1234abcd.20131111.7', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given a value for a prerelease version with a non-matching preid when a build is included', () => {
		expect(isPreidOfVersion('alpha', '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given a value for a prerelease version with a non-matching preid when a build is not included', () => {
		expect(isPreidOfVersion('alpha', '1.2.4-alpha.9')).toBe(false);
	});

	it('should return false given undefined for a pr prerelease version with a preid when a build is included', () => {
		expect(isPreidOfVersion(undefined, '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given undefined for a pr prerelease version with a preid when a build is not included', () => {
		expect(isPreidOfVersion(undefined, '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given undefined for a prerelease version with a preid when a build is included', () => {
		expect(isPreidOfVersion(undefined, '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given undefined for a prerelease version with a preid when a build is not included', () => {
		expect(isPreidOfVersion(undefined, '1.2.4-alpha.9')).toBe(false);
	});

	it('should return false given a value for a release version without a preid when a build is included', () => {
		expect(isPreidOfVersion('build.34', '1.2.4+build.34')).toBe(false);
	});

	it('should return false given a value for a release version without a preid when a build is not included', () => {
		expect(isPreidOfVersion('2.4', '1.2.4')).toBe(false);
	});
});
