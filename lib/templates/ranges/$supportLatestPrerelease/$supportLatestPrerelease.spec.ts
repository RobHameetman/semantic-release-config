import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $supportLatestPrerelease } from './$supportLatestPrerelease';

describe('$supportLatestPrerelease()', () => {
	it('should be a function', () => {
		expect(isFunction($supportLatestPrerelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($supportLatestPrerelease())).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($supportLatestPrerelease('rc'), { version: '6.1.12-rc.4' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the initial to the latest prerelease for the current version', () => {
		expect(render($supportLatestPrerelease('rc'), { version: '6.1.12-rc.4' })).toBe('>= 6.1.12-rc.3 < 6.1.12-rc.4');
	});
});
