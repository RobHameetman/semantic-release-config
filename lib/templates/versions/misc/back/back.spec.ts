import { isFunction, isString } from '@rob.hameetman/type-guards';
import { patch } from '@templates/versions/patch/patch';
import { prerelease } from '@templates/versions/prerelease/prerelease';
import { render } from '@test/utils/render';
import { back } from './back';

describe('back()', () => {
	it('should be a function', () => {
		expect(isFunction(back)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString(back(patch()))).toBe(true);
	});

	it('should resolve to the correct specified version number given an offset and a release version', () => {
		expect(render(`\${${back(patch(), 2)}}`, { version: '1.5.12' })).toBe('10');
	});

	it('should resolve to the correct specified version number given an offset and a prerelease version', () => {
		expect(render(`\${${back(patch(), 2)}}`, { version: '1.5.12-beta.9' })).toBe('10');
	});

	it('should resolve to the correct specified version number given a negative offset', () => {
		expect(render(`\${${back(patch(), -2)}}`, { version: '1.5.12' })).toBe('10');
	});

	it('should not resolve to a negative specified version number given an offset greater than the current version', () => {
		expect(render(`\${${back(patch(), 13)}}`, { version: '1.5.12' })).toBe('0');
	});

	it('should resolve to the previous specified version number given no offset', () => {
		expect(render(`\${${back(patch())}}`, { version: '1.5.12' })).toBe('11');
	});

	it('should resolve to the current specified version number given a zero offset', () => {
		expect(render(`\${${back(patch(), 0)}}`, { version: '1.5.12' })).toBe('12');
	});

	it('should resolve to the correct specified version number given a floor above the difference between the version number and the offset', () => {
		expect(render(`\${${back(patch(), 9, 2)}}`, { version: '1.5.12' })).toBe('3');
	});

	it('should resolve to the floor given a floor above the difference between the version number and the offset', () => {
		expect(render(`\${${back(patch(), 11, 3)}}`, { version: '1.5.12' })).toBe('3');
	});

	it('should resolve to an empty string given a version which is not evaluated as a number', () => {
		expect(render(`\${${back(prerelease(), 2)}}`, { version: '1.5.12' })).toBe('');
	});

	it('should resolve to an empty string given a floor and a version which is not evaluated as a number', () => {
		expect(render(`\${${back(prerelease(), 2, 5)}}`, { version: '1.5.12' })).toBe('');
	});
});
