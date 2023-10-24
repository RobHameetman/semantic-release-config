import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $prerelease } from './$prerelease';

describe('$prerelease()', () => {
	it('should be a function', () => {
		expect(isFunction($prerelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($prerelease())).toBe(true);
	});

	it('should resolve to the prerelease version number given a pre-release version', () => {
		expect(render($prerelease(), { update: 1, prerelease: true })).toBe('1');
	});

	it('should resolve to an empty string given a release version', () => {
		expect(render($prerelease(), { update: 1, prerelease: false })).toBe('');
	});
});
