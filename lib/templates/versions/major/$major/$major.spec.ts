import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { $major } from './$major';

describe('$major()', () => {
	it('should be a function', () => {
		expect(isFunction($major)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($major())).toBe(true);
	});

	it('should resolve to the major version number given a release version', () => {
		expect(render($major(), { major: 1, prerelease: false })).toBe('1');
	});

	it('should resolve to the major version number given a pre-release version', () => {
		expect(render($major(), { major: 1, prerelease: true })).toBe('1');
	});
});
