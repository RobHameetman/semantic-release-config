import { isVersionMatchGroup } from './VersionMatchGroup';

describe('isVersionMatchGroup()', () => {
	it('should return true given the string value "major"', () => {
		expect(isVersionMatchGroup('major')).toBe(true);
	});

	it('should return true given the string value "minor"', () => {
		expect(isVersionMatchGroup('minor')).toBe(true);
	});

	it('should return true given the string value "patch"', () => {
		expect(isVersionMatchGroup('patch')).toBe(true);
	});

	it('should return true given the string value "preid"', () => {
		expect(isVersionMatchGroup('preid')).toBe(true);
	});

	it('should return true given the string value "type"', () => {
		expect(isVersionMatchGroup('type')).toBe(true);
	});

	it('should return true given the string value "pr"', () => {
		expect(isVersionMatchGroup('pr')).toBe(true);
	});

	it('should return true given the string value "commit"', () => {
		expect(isVersionMatchGroup('commit')).toBe(true);
	});

	it('should return true given the string value "date"', () => {
		expect(isVersionMatchGroup('date')).toBe(true);
	});

	it('should return true given the string value "prerelease"', () => {
		expect(isVersionMatchGroup('prerelease')).toBe(true);
	});

	it('should return true given the string value "build"', () => {
		expect(isVersionMatchGroup('build')).toBe(true);
	});

	it('should return false given an empty string', () => {
		expect(isVersionMatchGroup('')).toBe(false);
	});
});

