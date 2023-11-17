import { isPrOf } from './PrOf';

describe('isPrOf()', () => {
	it('should return true given a value for a version with a matching pr number when a build is included', () => {
		expect(isPrOf('9', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(true);
	});

	it('should return true given a value for a version with a matching pr number when a build is not included', () => {
		expect(isPrOf('9', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(true);
	});

	it('should return true given undefined for a version without a pr number when a build is included', () => {
		expect(isPrOf(undefined, '1.2.4-alpha.9+build.34')).toBe(true);
	});

	it('should return true given undefined for a version without a pr number when a build is not included', () => {
		expect(isPrOf(undefined, '1.2.4-alpha.9')).toBe(true);
	});

	it('should return false given a value for a version with a non-matching pr number when a build is included', () => {
		expect(isPrOf('99', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given a value for a version with a non-matching pr number when a build is not included', () => {
		expect(isPrOf('99', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given undefined for a version with a pr number when a build is included', () => {
		expect(isPrOf(undefined, '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given undefined for a version with a pr number when a build is not included', () => {
		expect(isPrOf(undefined, '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given a value for a version without a pr number when a build is included', () => {
		expect(isPrOf('9', '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given a value for a version without a pr number when a build is not included', () => {
		expect(isPrOf('9', '1.2.4-alpha.9')).toBe(false);
	});
});
