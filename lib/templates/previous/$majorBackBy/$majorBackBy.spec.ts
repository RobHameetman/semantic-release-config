import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $majorBackBy } from './$majorBackBy';

describe('$majorBackBy()', () => {
	it('should be a function', () => {
		expect(isFunction($majorBackBy)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($majorBackBy())).toBe(true);
	});

	it('should resolve to the correct major version number given an offset and a release version', () => {
		expect(render($majorBackBy(4), { version: '6.19.1' })).toBe('2.X.X');
	});

	it('should resolve to the correct major version number given an offset and a prerelease version', () => {
		expect(render($majorBackBy(4), { version: '6.19.1-rc.4' })).toBe('2.X.X');
	});

	it('should resolve to the correct major version number given a negative offset', () => {
		expect(render($majorBackBy(-4), { version: '6.19.1' })).toBe('2.X.X');
	});

	it('should not resolve to a negative version number given an offset greater than the current major version', () => {
		expect(render($majorBackBy(9), { version: '6.19.1' })).toBe('1.X.X');
	});

	it('should resolve to the previous major version number given no offset', () => {
		expect(render($majorBackBy(), { version: '6.19.1' })).toBe('5.X.X');
	});

	it('should resolve to the current major version number given a zero offset', () => {
		expect(render($majorBackBy(0), { version: '6.19.1' })).toBe('6.X.X');
	});
});
