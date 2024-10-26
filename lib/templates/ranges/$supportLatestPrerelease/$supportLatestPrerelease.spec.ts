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
		expect(render($supportLatestPrerelease('rc'), { version: '6.1.12-rc.4' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the initial to the latest prerelease for the current version', () => {
		expect(render($supportLatestPrerelease('rc'), { version: '6.1.12-rc.4' })).toBe('>= 6.1.12-rc.3 < 6.1.12-rc.4');
	});

	it('should do nothing when the release is not a prerelease', () => {
		expect(render($supportLatestPrerelease(), { version: '6.2.6' })).toBe('');
		expect(render($supportLatestPrerelease(), { version: '7.2.0' })).toBe('');
		expect(render($supportLatestPrerelease(), { version: '7.0.0' })).toBe('');
	});
});
