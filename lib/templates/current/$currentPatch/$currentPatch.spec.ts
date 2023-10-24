import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $currentPatch } from './$currentPatch';

describe('$currentPatch()', () => {
	it('should be a function', () => {
		expect(isFunction($currentPatch)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($currentPatch())).toBe(true);
	});

	it('should resolve to the current patch version given a release version', () => {
		expect(render($currentPatch(), { major: 2, minor: 1, patch: 4, prerelease: false })).toBe('2.1.4');
	});

	it('should resolve to the current patch version given a pre-release version', () => {
		expect(render($currentPatch(), { major: 2, minor: 1, patch: 4, prerelease: true })).toBe('2.1.4');
	});
});
