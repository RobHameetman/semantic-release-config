import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { patch } from './patch';

describe('patch()', () => {
	it('should be a function', () => {
		expect(isFunction(patch)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString(patch())).toBe(true);
	});

	it('should resolve to the patch version number given a release version', () => {
		expect(render(`\${${patch()}}`, { version: '1.2.5' })).toBe('5');
	});

	it('should resolve to the patch version number given a pre-release version', () => {
		expect(render(`\${${patch()}}`, { version: '1.2.5-rc.0' })).toBe('5');
	});
});
