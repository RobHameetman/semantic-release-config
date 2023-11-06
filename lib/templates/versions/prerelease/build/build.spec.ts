import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { build } from './build';

describe('build()', () => {
	it('should be a function', () => {
		expect(isFunction(build)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString(build())).toBe(true);
	});

	it('should resolve to the prerelease build given a prerelease version with a build number', () => {
		expect(render(`\${${build()}}`, { version: '1.2.20-rc.1+build.5' })).toBe('build.5');
	});

	it('should resolve to the commit sha given a prerelease version with a commit sha', () => {
		expect(render(`\${${build()}}`, { version: '1.2.20-rc.1+f2a50a338d88a941d6cf17f2a0588bd1e3fd266d' })).toBe('f2a50a338d88a941d6cf17f2a0588bd1e3fd266d');
	});

	it('should resolve to the release build given a release version with a build number', () => {
		expect(render(`\${${build()}}`, { version: '1.2.20+build.2' })).toBe('build.2');
	});

	it('should resolve to an empty string given a prerelease version without a build', () => {
		expect(render(`\${${build()}}`, { version: '1.2.20-rc.1' })).toBe('');
	});

	it('should resolve to an empty string given a release version without a build', () => {
		expect(render(`\${${build()}}`, { version: '1.2.20' })).toBe('');
	});
});
