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
		expect(render($preid(), { version: '16.0.0-test.4' })).toEqual(expect.stringContaining('test'));
	});

	it('should resolve to an empty string given a release version', () => {
		expect(render($preid(), { prerelease: false })).toBe('');
		expect(render($preid(), { version: '16.0.0' })).toBe('');
		expect(render($preid(), { version: '15.2.0' })).toBe('');
		expect(render($preid(), { version: '15.1.2' })).toBe('');
	});
});
