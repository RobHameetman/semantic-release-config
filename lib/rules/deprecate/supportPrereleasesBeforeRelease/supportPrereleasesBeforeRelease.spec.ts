import { $prereleasesForVersion } from '@templates/ranges/$prereleasesForVersion';
import { supportPrereleasesBeforeRelease } from './supportPrereleasesBeforeRelease';

jest.mock('@templates/ranges/$prereleasesForVersion', () => ({
	__esModule: true,
	$prereleasesForVersion: jest.fn(() => '>= 1.1.2-rc.0 < 1.1.2'),
}));

describe('supportPrereleasesBeforeRelease()', () => {
	it('should return a deprecation object', () => {
		expect(supportPrereleasesBeforeRelease('rc')).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest prerelease', () => {
		expect($prereleasesForVersion).toBeCalled();
	});
});
