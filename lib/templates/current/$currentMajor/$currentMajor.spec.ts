import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $currentMajor } from './$currentMajor';

describe('$currentMajor()', () => {
	it('should be a function', () => {
		expect(isFunction($currentMajor)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($currentMajor())).toBe(true);
	});

	it('should resolve to the current major version given a release version', () => {
		expect(render($currentMajor(), { major: 1, prerelease: false })).toBe('1.X.X');
	});

	it('should resolve to the current major version given a pre-release version', () => {
		expect(render($currentMajor(), { major: 1, prerelease: true })).toBe('1.X.X');
	});
});
