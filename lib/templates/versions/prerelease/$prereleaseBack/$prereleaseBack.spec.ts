import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $prereleaseBack } from './$prereleaseBack';

describe('$prereleaseBack()', () => {
	it('should be a function', () => {
		expect(isFunction($prereleaseBack)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($prereleaseBack())).toBe(true);
	});

	it('should resolve to an empty string given an offset and a release version', () => {
		expect(render($prereleaseBack(4), { version: '7.24.13' })).toBe('');
	});

	it('should resolve to the correct prerelease version number given an offset and a prerelease version', () => {
		expect(render($prereleaseBack(4), { version: '7.24.13-beta.9' })).toBe('5');
	});

	it('should resolve to the correct prerelease version number given a negative offset', () => {
		expect(render($prereleaseBack(-4), { version: '7.24.13-beta.9' })).toBe('5');
	});

	it('should not resolve to a negative version number given an offset greater than the current prerelease version', () => {
		expect(render($prereleaseBack(13), { version: '7.24.13-beta.9' })).toBe('1');
	});

	it('should resolve to the previous prerelease version number given no offset', () => {
		expect(render($prereleaseBack(), { version: '7.24.13-beta.9' })).toBe('8');
	});

	it('should resolve to the current prerelease version number given a zero offset', () => {
		expect(render($prereleaseBack(0), { version: '7.24.13-beta.9' })).toBe('9');
	});
});
