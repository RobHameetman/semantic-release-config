import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $ifRelease } from './$ifRelease';

describe('$ifRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($ifRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($ifRelease(''))).toBe(true);
	});

	it('should resolve to the given predicate when the release is not a prerelease', () => {
		expect(render($ifRelease('\'do something...\'', '\'do something else...\''), { version: '15.2.0' })).toBe('do something...');
	});

	it('should resolve to the given alternative predicate if provided when the release is a prerelease', () => {
		expect(render($ifRelease('\'do something...\'', '\'do something else...\''), { version: '15.1.1-rc.1' })).toBe('do something else...');
	});

	it('should resolve to an empty string when the release is a prerelease and an alternative predicate is not provided', () => {
		expect(render($ifRelease('\'do something...\''), { version: '15.1.1-rc.1' })).toBe('');
	});
});
