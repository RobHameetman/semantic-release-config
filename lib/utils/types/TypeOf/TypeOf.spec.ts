import { isTypeOf } from './TypeOf';

describe('isTypeOf()', () => {
	it('should return true given a value for a pr prerelease version with a matching preid type when a build is included', () => {
		expect(isTypeOf('pr', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(true);
	});

	it('should return true given a value for a pr prerelease version with a matching preid type when a build is not included', () => {
		expect(isTypeOf('pr', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(true);
	});

	it('should return true given a value for a prerelease version with a matching preid type when a build is included', () => {
		expect(isTypeOf('alpha', '1.2.4-alpha.9+build.34')).toBe(true);
	});

	it('should return true given a value for a prerelease version with a matching preid type when a build is not included', () => {
		expect(isTypeOf('alpha', '1.2.4-alpha.9')).toBe(true);
	});

	it('should return true given undefined for a release version without a preid type when a build is included', () => {
		expect(isTypeOf(undefined, '1.2.4+build.34')).toBe(true);
	});

	it('should return true given undefined for a release version without a preid type when a build is not included', () => {
		expect(isTypeOf(undefined, '1.2.4')).toBe(true);
	});

	it('should return false given a value for a pr prerelease version with a non-matching preid type when a build is included', () => {
		expect(isTypeOf('alpha', '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given a value for a pr prerelease version with a non-matching preid type when a build is not included', () => {
		expect(isTypeOf('alpha', '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given a value for a prerelease version with a non-matching preid type when a build is included', () => {
		expect(isTypeOf('beta', '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given a value for a prerelease version with a non-matching preid type when a build is not included', () => {
		expect(isTypeOf('beta', '1.2.4-alpha.9')).toBe(false);
	});

	it('should return false given undefined for a pr prerelease version with a preid type when a build is included', () => {
		expect(isTypeOf(undefined, '1.2.4-pr.9.abcd1234.20131111.7+build.34')).toBe(false);
	});

	it('should return false given undefined for a pr prerelease version with a preid type when a build is not included', () => {
		expect(isTypeOf(undefined, '1.2.4-pr.9.abcd1234.20131111.7')).toBe(false);
	});

	it('should return false given undefined for a prerelease version with a preid type when a build is included', () => {
		expect(isTypeOf(undefined, '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given undefined for a prerelease version with a preid type when a build is not included', () => {
		expect(isTypeOf(undefined, '1.2.4-alpha.9')).toBe(false);
	});

	it('should return false given a value for a release version without a preid type when a build is included', () => {
		expect(isTypeOf('build', '1.2.4+build.34')).toBe(false);
	});

	it('should return false given a value for a release version without a preid type when a build is not included', () => {
		expect(isTypeOf('alpha', '1.2.4')).toBe(false);
	});
});
