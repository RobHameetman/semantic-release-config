import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { patchBack } from './patchBack';

describe('patchBack()', () => {
	it('should be a function', () => {
		expect(isFunction(patchBack)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString(patchBack())).toBe(true);
	});

	it('should resolve to the correct patch version number given an offset and a release version', () => {
		expect(render(`\${${patchBack(4)}}`, { version: '1.5.12' })).toBe('8');
	});

	it('should resolve to the correct patch version number given an offset and a prerelease version', () => {
		expect(render(`\${${patchBack(4)}}`, { version: '1.5.12-beta.9' })).toBe('8');
	});

	it('should resolve to the correct patch version number given a negative offset', () => {
		expect(render(`\${${patchBack(-2)}}`, { version: '1.5.12' })).toBe('10');
	});

	it('should not resolve to a negative version number given an offset greater than the current patch version', () => {
		expect(render(`\${${patchBack(13)}}`, { version: '1.5.12' })).toBe('0');
	});

	it('should resolve to the previous patch version number given no offset', () => {
		expect(render(`\${${patchBack()}}`, { version: '1.5.12' })).toBe('11');
	});

	it('should resolve to the current patch version number given a zero offset', () => {
		expect(render(`\${${patchBack(0)}}`, { version: '1.5.12' })).toBe('12');
	});
});
