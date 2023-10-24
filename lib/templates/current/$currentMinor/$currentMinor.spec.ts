import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $currentMinor } from './$currentMinor';

describe('$currentMinor()', () => {
	it('should be a function', () => {
		expect(isFunction($currentMinor)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($currentMinor())).toBe(true);
	});

	it('should resolve to the current minor version given a release version', () => {
		expect(render($currentMinor(), { major: 2, minor: 1, prerelease: false })).toBe('2.1.X');
	});

	it('should resolve to the current minor version given a pre-release version', () => {
		expect(render($currentMinor(), { major: 2, minor: 1, prerelease: true })).toBe('2.1.X');
	});
});
