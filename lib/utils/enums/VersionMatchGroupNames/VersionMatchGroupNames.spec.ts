import { isVersionMatchGroupName } from './VersionMatchGroupNames';

describe('isVersionMatchGroupName()', () => {
	it('should return true given the string value "major"', () => {
		expect(isVersionMatchGroupName('major')).toBe(true);
	});

	it('should return true given the string value "minor"', () => {
		expect(isVersionMatchGroupName('minor')).toBe(true);
	});

	it('should return true given the string value "patch"', () => {
		expect(isVersionMatchGroupName('patch')).toBe(true);
	});

	it('should return true given the string value "preid"', () => {
		expect(isVersionMatchGroupName('preid')).toBe(true);
	});

	it('should return true given the string value "type"', () => {
		expect(isVersionMatchGroupName('type')).toBe(true);
	});

	it('should return true given the string value "pr"', () => {
		expect(isVersionMatchGroupName('pr')).toBe(true);
	});

	it('should return true given the string value "commit"', () => {
		expect(isVersionMatchGroupName('commit')).toBe(true);
	});

	it('should return true given the string value "date"', () => {
		expect(isVersionMatchGroupName('date')).toBe(true);
	});

	it('should return true given the string value "prerelease"', () => {
		expect(isVersionMatchGroupName('prerelease')).toBe(true);
	});

	it('should return true given the string value "build"', () => {
		expect(isVersionMatchGroupName('build')).toBe(true);
	});

	it('should return false given an empty string', () => {
		expect(isVersionMatchGroupName('')).toBe(false);
	});
});

