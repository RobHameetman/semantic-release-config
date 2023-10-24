import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $ifMajorRelease } from './$ifMajorRelease';

describe('$ifMajorRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($ifMajorRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($ifMajorRelease(''))).toBe(true);
	});

	it('should resolve to the given predicate when the release is a major release', () => {
		expect(render($ifMajorRelease('\'do something...\'', '\'do something else...\''), { type: 'major', version: '15.0.0' })).toBe('do something...');
	});

	it('should resolve to the given alternative predicate if provided when the release is not a major release', () => {
		expect(render($ifMajorRelease('\'do something...\'', '\'do something else...\''), { type: 'minor', version: '15.1.0' })).toBe('do something else...');
	});

	it('should resolve to an empty string when the release is not a major release and an alternative predicate is not provided', () => {
		expect(render($ifMajorRelease('\'do something...\''), { type: 'minor', version: '15.1.0' })).toBe('');
	});
});
