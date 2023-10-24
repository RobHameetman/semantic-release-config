import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $supportLatestMajorReleases } from './$supportLatestMajorReleases';

describe('$supportLatestMajorReleases()', () => {
	it('should be a function', () => {
		expect(isFunction($supportLatestMajorReleases)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($supportLatestMajorReleases())).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($supportLatestMajorReleases(), { version: '6.8.12' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the first release version to the major version from the given offset', () => {
		expect(render($supportLatestMajorReleases(3), { version: '6.8.12' })).toBe('< 3.X.X');
	});
});
