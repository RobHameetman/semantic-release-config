import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@test/utils/render';
import { versionsOf } from '@test/utils/versionsOf';
import { $supportLatestPatchRelease } from './$supportLatestPatchRelease';

describe('$supportLatestPatchRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($supportLatestPatchRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($supportLatestPatchRelease())).toBe(true);
	});

	it('should resolve to a semantic version range', () => {
		expect(render($supportLatestPatchRelease(), { type: 'patch', version: '6.1.12' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the first minor release in the current major version to the current patch version', async () => {
		expect(render($supportLatestPatchRelease(), { type: 'patch', version: '6.1.12' })).toBe('>= 6.1.X < 6.1.12');

		await expect(versionsOf($supportLatestPatchRelease(), { version: '6.1.12' })).resolves.toContain('6.1.0');
		await expect(versionsOf($supportLatestPatchRelease(), { version: '6.1.12' })).resolves.not.toContain('6.1.12');
	});
});
