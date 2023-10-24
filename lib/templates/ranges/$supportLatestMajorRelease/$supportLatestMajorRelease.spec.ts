import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $supportLatestMajorRelease } from './$supportLatestMajorRelease';

describe('$supportLatestMajorRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($supportLatestMajorRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($supportLatestMajorRelease())).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($supportLatestMajorRelease(), { version: '6.1.12' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the first release version to the current major version', () => {
		expect(render($supportLatestMajorRelease(), { version: '6.1.12' })).toBe('< 6.X.X');
	});
});
