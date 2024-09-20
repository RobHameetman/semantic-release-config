import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { $type } from './$type';

describe('$type()', () => {
	it('should be a function', () => {
		expect(isFunction($type)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($type())).toBe(true);
	});

	it('should resolve to the release type given a release version', () => {
		expect(render($type(), { type: 'patch', prerelease: false })).toBe('patch');
	});

	it('should resolve to the release type given a pre-release version', () => {
		expect(render($type(), { type: 'minor', prerelease: true })).toBe('minor');
	});
});
