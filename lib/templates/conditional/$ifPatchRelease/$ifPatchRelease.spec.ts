import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { $ifPatchRelease } from './$ifPatchRelease';

describe('$ifPatchRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($ifPatchRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($ifPatchRelease(''))).toBe(true);
	});

	it('should resolve to the given predicate when the release is a patch release', () => {
		expect(render($ifPatchRelease('\'do something...\'', '\'do something else...\''), { type: 'patch', version: '15.1.1' })).toBe('do something...');
	});

	it('should resolve to the given alternative predicate if provided when the release is not a patch release', () => {
		expect(render($ifPatchRelease('\'do something...\'', '\'do something else...\''), { type: 'minor', version: '15.2.0' })).toBe('do something else...');
	});

	it('should resolve to an empty string when the release is not a patch release and an alternative predicate is not provided', () => {
		expect(render($ifPatchRelease('\'do something...\''), { type: 'minor', version: '15.2.0' })).toBe('');
	});
});
