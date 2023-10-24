import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $minor } from './$minor';

describe('$minor()', () => {
	it('should be a function', () => {
		expect(isFunction($minor)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($minor())).toBe(true);
	});

	it('should resolve to the minor version number given a release version', () => {
		expect(render($minor(), { minor: 1, prerelease: false })).toBe('1');
	});

	it('should resolve to the minor version number given a pre-release version', () => {
		expect(render($minor(), { minor: 1, prerelease: true })).toBe('1');
	});
});
