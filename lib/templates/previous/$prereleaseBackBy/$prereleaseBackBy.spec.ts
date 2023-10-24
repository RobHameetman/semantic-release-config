import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $prereleaseBackBy } from './$prereleaseBackBy';

describe('$prereleaseBackBy()', () => {
	it('should be a function', () => {
		expect(isFunction($prereleaseBackBy)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($prereleaseBackBy())).toBe(true);
	});

	it('should resolve to an empty string given an offset and a release version', () => {
		expect(render($prereleaseBackBy(4), { version: '7.24.13' })).toBe('');
	});

	it('should resolve to the correct prerelease version number given an offset and a prerelease version', () => {
		expect(render($prereleaseBackBy(4), { version: '7.24.13-beta.9' })).toBe('7.24.13-beta.5');
	});

	it('should resolve to the correct prerelease version number given a negative offset', () => {
		expect(render($prereleaseBackBy(-4), { version: '7.24.13-beta.9' })).toBe('7.24.13-beta.5');
	});

	it('should not resolve to a negative version number given an offset greater than the current prerelease version', () => {
		expect(render($prereleaseBackBy(13), { version: '7.24.13-beta.9' })).toBe('7.24.13-beta.1');
	});

	it('should resolve to the previous prerelease version number given no offset', () => {
		expect(render($prereleaseBackBy(), { version: '7.24.13-beta.9' })).toBe('7.24.13-beta.8');
	});

	it('should resolve to the current prerelease version number given a zero offset', () => {
		expect(render($prereleaseBackBy(0), { version: '7.24.13-beta.9' })).toBe('7.24.13-beta.9');
	});
});
