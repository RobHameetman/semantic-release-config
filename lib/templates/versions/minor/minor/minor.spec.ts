import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { minor } from './minor';

describe('minor()', () => {
	it('should be a function', () => {
		expect(isFunction(minor)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString(minor())).toBe(true);
	});

	it('should resolve to the minor version number given a release version', () => {
		expect(render(`\${${minor()}}`, { version: '1.2.0' })).toBe('2');
	});

	it('should resolve to the minor version number given a pre-release version', () => {
		expect(render(`\${${minor()}}`, { version: '1.2.0-rc.0' })).toBe('2');
	});
});
