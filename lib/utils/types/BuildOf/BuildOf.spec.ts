import { isBuildOf } from './BuildOf';

describe('isBuildOf()', () => {
	it('should return true given a value for a version with a matching build', () => {
		expect(isBuildOf('build.34', '1.2.4-alpha.9+build.34')).toBe(true);
	});
	it('should return true given undefined for a version without a build', () => {
		expect(isBuildOf(undefined, '1.2.4-alpha.9')).toBe(true);
	});

	it('should return false given a value for a version with a non-matching build', () => {
		expect(isBuildOf('build.43', '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given undefined for a version with a build', () => {
		expect(isBuildOf(undefined, '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given a value for a version without a build', () => {
		expect(isBuildOf('build.43', '1.2.4-alpha.9')).toBe(false);
	});
});
