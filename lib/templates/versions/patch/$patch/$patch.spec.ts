import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $patch } from './$patch';

describe('$patch()', () => {
	it('should be a function', () => {
		expect(isFunction($patch)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($patch())).toBe(true);
	});

	it('should resolve to the patch version number given a release version', () => {
		expect(render($patch(), { patch: 1, prerelease: false })).toBe('1');
	});

	it('should resolve to the patch version number given a pre-release version', () => {
		expect(render($patch(), { patch: 1, prerelease: true })).toBe('1');
	});
});
