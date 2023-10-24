import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $patchBackBy } from './$patchBackBy';

describe('$patchBackBy()', () => {
	it('should be a function', () => {
		expect(isFunction($patchBackBy)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($patchBackBy())).toBe(true);
	});

	it('should resolve to the correct patch version number given an offset and a release version', () => {
		expect(render($patchBackBy(4), { version: '1.5.12' })).toBe('1.5.8');
	});

	it('should resolve to the correct patch version number given an offset and a prerelease version', () => {
		expect(render($patchBackBy(4), { version: '1.5.12-beta.9' })).toBe('1.5.8');
	});

	it('should resolve to the correct patch version number given a negative offset', () => {
		expect(render($patchBackBy(-4), { version: '1.5.12' })).toBe('1.5.8');
	});

	it('should not resolve to a negative version number given an offset greater than the current patch version', () => {
		expect(render($patchBackBy(13), { version: '1.5.12' })).toBe('1.5.0');
	});

	it('should resolve to the previous patch version number given no offset', () => {
		expect(render($patchBackBy(), { version: '1.5.12' })).toBe('1.5.11');
	});

	it('should resolve to the current patch version number given a zero offset', () => {
		expect(render($patchBackBy(0), { version: '1.5.12' })).toBe('1.5.12');
	});
});
