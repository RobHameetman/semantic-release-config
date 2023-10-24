import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $supportLatestMinorReleases } from './$supportLatestMinorReleases';

describe('$supportLatestMinorReleases()', () => {
	it('should be a function', () => {
		expect(isFunction($supportLatestMinorReleases)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($supportLatestMinorReleases())).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($supportLatestMinorReleases(), { version: '6.8.12' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the first release in the current major version to the minor version from the given offset', () => {
		expect(render($supportLatestMinorReleases(3), { version: '6.8.12' })).toBe('>= 6.X.X < 6.5.X');
	});
});
