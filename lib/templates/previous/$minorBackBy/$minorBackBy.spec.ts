import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $minorBackBy } from './$minorBackBy';

describe('$minorBackBy()', () => {
	it('should be a function', () => {
		expect(isFunction($minorBackBy)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($minorBackBy())).toBe(true);
	});

	it('should resolve to the correct minor version number given an offset and a release version', () => {
		expect(render($minorBackBy(4), { version: '3.18.8' })).toBe('3.14.X');
	});

	it('should resolve to the correct minor version number given an offset and a prerelease version', () => {
		expect(render($minorBackBy(4), { version: '3.18.8-alpha.3' })).toBe('3.14.X');
	});

	it('should resolve to the correct minor version number given a negative offset', () => {
		expect(render($minorBackBy(-4), { version: '3.18.8' })).toBe('3.14.X');
	});

	it('should not resolve to a negative version number given an offset greater than the current minor version', () => {
		expect(render($minorBackBy(20), { version: '3.18.8' })).toBe('3.0.X');
	});

	it('should resolve to the previous minor version number given no offset', () => {
		expect(render($minorBackBy(), { version: '3.18.8' })).toBe('3.17.X');
	});

	it('should resolve to the current minor version number given a zero offset', () => {
		expect(render($minorBackBy(0), { version: '3.18.8' })).toBe('3.18.X');
	});
});
