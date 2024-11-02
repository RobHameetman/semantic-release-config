import { isFunction, isString } from '@rob.hameetman/type-guards';
import { patch } from '@/templates/versions/patch/patch';
import { prerelease } from '@/templates/versions/prerelease/prerelease';
import { render } from '@@/utils/render';
import { vparse } from './vparse';

describe('vparse()', () => {
	it('should be a function', () => {
		expect(isFunction(vparse)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString(vparse(1))).toBe(true);
	});

	it('should resolve to the major version number given an index of 1', () => {
		expect(render(`\${${vparse(1)}}`, { version: '2.5.12-rc.1+build.5' })).toBe('2');
	});

	it('should resolve to the minor version number given an index of 2', () => {
		expect(render(`\${${vparse(2)}}`, { version: '2.5.12-rc.1+build.5' })).toBe('5');
	});

	it('should resolve to the patch version number given an index of 3', () => {
		expect(render(`\${${vparse(3)}}`, { version: '2.5.12-rc.1+build.5' })).toBe('12');
	});

	it('should resolve to the preid given an index of 4 when the version is a prerelease version', () => {
		expect(render(`\${${vparse(4)}}`, { version: '2.5.12-rc.1+build.5' })).toBe('rc.1');
	});

	it('should resolve to an empty string given an index of 4 when the version is a release version', () => {
		expect(render(`\${${vparse(4)}}`, { version: '2.5.12' })).toBe('');
	});

	it('should resolve to the build given an index of 5 when the version is a prerelease version with build metadata', () => {
		expect(render(`\${${vparse(5)}}`, { version: '2.5.12-rc.1+build.5' })).toBe('build.5');
	});

	it('should resolve to an empty string given an index of 5 when the version is a prerelease version without build metadata', () => {
		expect(render(`\${${vparse(5)}}`, { version: '2.5.12-rc.1' })).toBe('');
	});

	it('should resolve to an empty string given an index of 5 when the version is a release version', () => {
		expect(render(`\${${vparse(5)}}`, { version: '2.5.12' })).toBe('');
	});
});
