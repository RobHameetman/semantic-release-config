import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $currentRelease } from './$currentRelease';

describe('$currentRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($currentRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($currentRelease())).toBe(true);
	});

	it('should resolve to the current patch version given a release version', () => {
		expect(render($currentRelease(), { major: 2, minor: 1, patch: 4, prerelease: false })).toBe('2.1.4');
	});

	it('should resolve to the current patch version given a pre-release version', () => {
		expect(render($currentRelease(), { major: 2, minor: 1, patch: 4, prerelease: true })).toBe('2.1.4');
	});
});
