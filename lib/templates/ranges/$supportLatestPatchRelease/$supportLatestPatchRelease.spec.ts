import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { versionsOf } from '@@/utils/versionsOf';
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
		expect(render($supportLatestPatchRelease(), { type: 'patch', version: '6.1.10' })).toBe('>= 6.1.9 < 6.1.10');

		await expect(versionsOf($supportLatestPatchRelease(), { type: 'patch', version: '6.1.10' })).resolves.toContain('6.1.9');
		await expect(versionsOf($supportLatestPatchRelease(), { type: 'patch', version: '6.1.10' })).resolves.not.toContain('6.1.10');
	});

	it('should do nothing when the release is not a patch version', () => {
		expect(render($supportLatestPatchRelease(), { type: 'minor', version: '6.2.0' })).toBe('');
		expect(render($supportLatestPatchRelease(), { type: 'major', version: '7.0.0' })).toBe('');
	});
});
