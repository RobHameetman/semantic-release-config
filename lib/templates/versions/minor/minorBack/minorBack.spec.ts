import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { minorBack } from './minorBack';

describe('$minorBack()', () => {
	it('should be a function', () => {
		expect(isFunction(minorBack)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString(minorBack())).toBe(true);
	});

	it('should resolve to the correct minor version number given an offset and a release version', () => {
		expect(render(`\${${minorBack(4)}}`, { version: '3.18.8' })).toBe('14');
	});

	it('should resolve to the correct minor version number given an offset and a prerelease version', () => {
		expect(render(`\${${minorBack(4)}}`, { version: '3.18.8-alpha.3' })).toBe('14');
	});

	it('should resolve to the correct minor version number given a negative offset', () => {
		expect(render(`\${${minorBack(-4)}}`, { version: '3.18.8' })).toBe('14');
	});

	it('should not resolve to a negative version number given an offset greater than the current minor version', () => {
		expect(render(`\${${minorBack(20)}}`, { version: '3.18.8' })).toBe('0');
	});

	it('should resolve to the previous minor version number given no offset', () => {
		expect(render(`\${${minorBack()}}`, { version: '3.18.8' })).toBe('17');
	});

	it('should resolve to the current minor version number given a zero offset', () => {
		expect(render(`\${${minorBack(0)}}`, { version: '3.18.8' })).toBe('18');
	});
});
