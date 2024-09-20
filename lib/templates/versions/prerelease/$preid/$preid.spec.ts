import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { $preid } from './$preid';

describe('$preid()', () => {
	it('should be a function', () => {
		expect(isFunction($preid)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($preid())).toBe(true);
	});

	it('should resolve to the prerelease preid given a pre-release version', () => {
		expect(render($preid(), { prereleaseType: 'test' })).toEqual(expect.stringContaining('test'));
	});

	it('should resolve to an empty string given a release version', () => {
		expect(render($preid(), { prerelease: false })).toBe('');
	});
});
