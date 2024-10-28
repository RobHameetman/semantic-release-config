import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { versionsOf } from '@@/utils/versionsOf';
import { $supportLatestMajorRelease } from './$supportLatestMajorRelease';

describe('$supportLatestMajorRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($supportLatestMajorRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($supportLatestMajorRelease())).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($supportLatestMajorRelease(), { version: '6.0.0', type: 'major' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the first release version to the current major version', async () => {
		expect(render($supportLatestMajorRelease(), { version: '6.0.0', type: 'major' })).toBe('>= 5.0.0 < 6.0.0');

		await expect(versionsOf($supportLatestMajorRelease(), { version: '6.0.0', type: 'major' })).resolves.toContain('5.0.0');
		await expect(versionsOf($supportLatestMajorRelease(), { version: '6.0.0', type: 'major' })).resolves.not.toContain('6.0.0');
	});

	it('should do nothing when the release is not a major version', () => {
		expect(render($supportLatestMajorRelease(), { type: 'patch', version: '6.2.6' })).toBe('>= 6.2.6 < 6.2.6');
		expect(render($supportLatestMajorRelease(), { type: 'minor', version: '7.2.0' })).toBe('>= 7.2.0 < 7.2.0');
	});
});
