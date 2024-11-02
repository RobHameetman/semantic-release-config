import { isBuildOfVersion } from './BuildOfVersion';

describe('isBuildOfVersion()', () => {
	it('should return true given a value for a version with a matching build', () => {
		expect(isBuildOfVersion('build.34', '1.2.4-alpha.9+build.34')).toBe(true);
	});
	it('should return true given undefined for a version without a build', () => {
		expect(isBuildOfVersion(undefined, '1.2.4-alpha.9')).toBe(true);
	});

	it('should return false given a value for a version with a non-matching build', () => {
		expect(isBuildOfVersion('build.43', '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given undefined for a version with a build', () => {
		expect(isBuildOfVersion(undefined, '1.2.4-alpha.9+build.34')).toBe(false);
	});

	it('should return false given a value for a version without a build', () => {
		expect(isBuildOfVersion('build.43', '1.2.4-alpha.9')).toBe(false);
	});
});
