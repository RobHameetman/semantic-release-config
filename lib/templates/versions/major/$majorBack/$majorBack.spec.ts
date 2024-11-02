import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { $majorBack } from './$majorBack';

describe('$majorBack()', () => {
	it('should be a function', () => {
		expect(isFunction($majorBack)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($majorBack())).toBe(true);
	});

	it('should resolve to the correct major version number given an offset and a release version', () => {
		expect(render($majorBack(4), { version: '6.19.1' })).toBe('2');
	});

	it('should resolve to the correct major version number given an offset and a prerelease version', () => {
		expect(render($majorBack(4), { version: '6.19.1-rc.4' })).toBe('2');
	});

	it('should resolve to the correct major version number given a negative offset', () => {
		expect(render($majorBack(-4), { version: '6.19.1' })).toBe('2');
	});

	it('should not resolve to a negative version number given an offset greater than the current major version', () => {
		expect(render($majorBack(9), { version: '6.19.1' })).toBe('0');
	});

	it('should resolve to the previous major version number given no offset', () => {
		expect(render($majorBack(), { version: '6.19.1' })).toBe('5');
	});

	it('should resolve to the current major version number given a zero offset', () => {
		expect(render($majorBack(0), { version: '6.19.1' })).toBe('6');
	});
});
