import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { $prereleasesForVersion } from './$prereleasesForVersion';

describe('$prereleasesForVersion()', () => {
	it('should be a function', () => {
		expect(isFunction($prereleasesForVersion)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($prereleasesForVersion('rc'))).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($prereleasesForVersion('rc'), { version: '6.1.12' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should resolve to multiple ranges given multiple preids', () => {
		expect(render($prereleasesForVersion(['next', 'rc']), { version: '6.1.12' })).toBe('>= 6.1.12-next.0 < 6.1.12 || >= 6.1.12-rc.0 < 6.1.12');
	});

	it('should range from the first prerelease version to the current release version for each provided preid', () => {
		expect(render($prereleasesForVersion('rc'), { version: '6.1.12' })).toBe('>= 6.1.12-rc.0 < 6.1.12');
	});

	it('should do nothing when the release is not a prerelease version', () => {
		expect(render($prereleasesForVersion(''), { version: '1.0.0-alpha.23' })).toBe('>= 1.0.0-alpha.23 < 1.0.0-alpha.23');
		expect(render($prereleasesForVersion(['rc', 'beta', 'alpha']), { version: '1.0.0-alpha.23' })).toBe('>= 1.0.0-alpha.23 < 1.0.0-alpha.23');
	});
});
