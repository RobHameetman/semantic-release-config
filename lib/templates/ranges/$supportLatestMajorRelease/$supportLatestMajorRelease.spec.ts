import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { versionsOf } from '@test/utils/versionsOf';
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
});
