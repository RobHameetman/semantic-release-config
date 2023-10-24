import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { $deprecatePrereleasesOnRelease } from './$deprecatePrereleasesOnRelease';

describe('$deprecatePrereleasesOnRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($deprecatePrereleasesOnRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($deprecatePrereleasesOnRelease())).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($deprecatePrereleasesOnRelease('rc'), { version: '6.1.12' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should resolve to multiple ranges given multiple preids', () => {
		expect(render($deprecatePrereleasesOnRelease(['next', 'rc']), { version: '6.1.12' })).toBe('>= 6.1.12-next.0 < 6.1.12 || >= 6.1.12-rc.0 < 6.1.12');
	});

	it('should range from the first prerelease version to the current release version for each provided preid', () => {
		expect(render($deprecatePrereleasesOnRelease('rc'), { version: '6.1.12' })).toBe('>= 6.1.12-rc.0 < 6.1.12');
	});
});
