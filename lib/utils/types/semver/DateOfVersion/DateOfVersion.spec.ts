import { isDateOfVersion } from './DateOfVersion';

describe('isDateOfVersion()', () => {
	it('should return true given a value for a version with a matching date hash when a build is included', () => {
		expect(isDateOfVersion('20131111', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(true);
	});

	it('should return true given a value for a version with a matching date hash when a build is not included', () => {
		expect(isDateOfVersion('20131111', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(true);
	});

	it('should return true given undefined for a version without a date hash when a build is included', () => {
		expect(isDateOfVersion(undefined, '1.2.4-alpha.9+build.34')).toBe(true);
	});

	it('should return true given undefined for a version without a date hash when a build is not included', () => {
		expect(isDateOfVersion(undefined, '1.2.4-alpha.9')).toBe(true);
	});

	it('should return false given a value for a version with a non-matching date hash when a build is included', () => {
		expect(isDateOfVersion('20131112', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given a value for a version with a non-matching date hash when a build is not included', () => {
		expect(isDateOfVersion('20131112', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given undefined for a version with a date hash when a build is included', () => {
		expect(isDateOfVersion(undefined, '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given undefined for a version with a date hash when a build is not included', () => {
		expect(isDateOfVersion(undefined, '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given a value for a version without a date hash when a build is included', () => {
		expect(isDateOfVersion('20131111', '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given a value for a version without a date hash when a build is not included', () => {
		expect(isDateOfVersion('20131111', '1.2.4-alpha.9')).toBe(false);
	});
});
