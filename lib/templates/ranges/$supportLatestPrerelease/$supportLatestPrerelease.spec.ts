import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { $supportLatestPrerelease } from './$supportLatestPrerelease';

describe('$supportLatestPrerelease()', () => {
	it('should be a function', () => {
		expect(isFunction($supportLatestPrerelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($supportLatestPrerelease())).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($supportLatestPrerelease('rc'), { version: '6.1.12-rc.7' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the initial to the latest prerelease for the current version', () => {
		expect(render($supportLatestPrerelease('rc'), { version: '6.1.12-rc.7' })).toBe('>= 6.1.12-rc.2 < 6.1.12-rc.7');
		expect(render($supportLatestPrerelease(), { version: '12.4.9-alpha.7' })).toBe('>= 12.4.9-alpha.2 < 12.4.9-alpha.7');
	});

	it('should do nothing when the release is not a prerelease', () => {
		expect(render($supportLatestPrerelease(), { version: '6.2.6' })).toBe('>= 6.2.6 < 6.2.6');
		expect(render($supportLatestPrerelease(), { version: '7.2.0' })).toBe('>= 7.2.0 < 7.2.0');
		expect(render($supportLatestPrerelease(), { version: '7.0.0' })).toBe('>= 7.0.0 < 7.0.0');
	});
});
