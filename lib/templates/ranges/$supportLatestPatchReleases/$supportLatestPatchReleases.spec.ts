import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $supportLatestPatchReleases } from './$supportLatestPatchReleases';

describe('$supportLatestPatchReleases()', () => {
	it('should be a function', () => {
		expect(isFunction($supportLatestPatchReleases)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($supportLatestPatchReleases())).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($supportLatestPatchReleases(), { version: '6.8.12' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the first minor release in the current major version to the current patch version', () => {
		expect(render($supportLatestPatchReleases(3), { version: '6.8.12' })).toBe('>= 6.8.X < 6.8.9');
	});
});
