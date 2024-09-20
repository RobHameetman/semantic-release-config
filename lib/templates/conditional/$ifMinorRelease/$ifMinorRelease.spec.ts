import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { $ifMinorRelease } from './$ifMinorRelease';

describe('$ifMinorRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($ifMinorRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($ifMinorRelease(''))).toBe(true);
	});

	it('should resolve to the given predicate when the release is a minor release', () => {
		expect(render($ifMinorRelease('\'do something...\'', '\'do something else...\''), { type: 'minor', version: '15.1.0' })).toBe('do something...');
	});

	it('should resolve to the given alternative predicate if provided when the release is not a minor release', () => {
		expect(render($ifMinorRelease('\'do something...\'', '\'do something else...\''), { type: 'patch', version: '15.1.1' })).toBe('do something else...');
	});

	it('should resolve to an empty string when the release is not a minor release and an alternative predicate is not provided', () => {
		expect(render($ifMinorRelease('\'do something...\''), { type: 'patch', version: '15.1.1' })).toBe('');
	});
});
