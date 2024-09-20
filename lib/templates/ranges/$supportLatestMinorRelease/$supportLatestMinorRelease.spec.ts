import { isFunction, isString } from '@rob.hameetman/type-guards';
import { render } from '@@/utils/render';
import { versionsOf } from '@@/utils/versionsOf';
import { $supportLatestMinorRelease } from './$supportLatestMinorRelease';

describe('$supportLatestMinorRelease()', () => {
	it('should be a function', () => {
		expect(isFunction($supportLatestMinorRelease)).toBe(true);
	});

	it('should return a string', () => {
		expect(isString($supportLatestMinorRelease())).toBe(true);
	});

	it('should resolve to a range', () => {
		expect(render($supportLatestMinorRelease(), { version: '7.2.0', type: 'minor' })).toStrictEqual(
			expect.stringMatching(/>|>=|<|<=|=|\^|~| - |\|\||\d+\.\d+\.\d+(?:-\w+\.\d+)?/)
		);
	});

	it('should range from the first release in the previous minor version to the current minor version', async () => {
		expect(render($supportLatestMinorRelease(), { version: '7.2.0', type: 'minor' })).toBe('>= 7.1.0 < 7.2.0');

		await expect(versionsOf($supportLatestMinorRelease(), { version: '7.2.0', type: 'minor' })).resolves.toContain('7.1.0');
		await expect(versionsOf($supportLatestMinorRelease(), { version: '7.2.0', type: 'minor' })).resolves.not.toContain('7.2.0');
	});
});
