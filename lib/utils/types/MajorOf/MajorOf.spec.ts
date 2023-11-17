import { isMajorOf } from './MajorOf';

describe('isMajorOf()', () => {
	it('should return true given a value for a pr prerelease version with a matching major increment when a build is included', () => {
		expect(isMajorOf('1', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(true);
	});

	it('should return true given a value for a pr prerelease version with a matching major increment when a build is not included', () => {
		expect(isMajorOf('1', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(true);
	});

	it('should return true given a value for a prerelease version with a matching major increment when a build is included', () => {
		expect(isMajorOf('1', '1.2.4-alpha.9+build.34')).toBe(true);
	});

	it('should return true given a value for a prerelease version with a matching major increment when a build is not included', () => {
		expect(isMajorOf('1', '1.2.4-alpha.9')).toBe(true);
	});

	it('should return true given a value for a release version with a matching major increment when a build is included', () => {
		expect(isMajorOf('1', '1.2.4+build.34')).toBe(true);
	});

	it('should return true given a value for a release version with a matching major increment when a build is not included', () => {
		expect(isMajorOf('1', '1.2.4')).toBe(true);
	});

	it('should return false given undefined for any version when a build is included', () => {
		expect(isMajorOf(undefined, '1.2.4+build.34')).toBe(false);
	});

	it('should return false given undefined for any version when a build is not included', () => {
		expect(isMajorOf(undefined, '1.2.4')).toBe(false);
	});

	it('should return false given a value for a version with a non-matching major increment when a build is included', () => {
		expect(isMajorOf('2', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given a value for a version with a non-matching major increment when a build is not included', () => {
		expect(isMajorOf('2', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});
});
