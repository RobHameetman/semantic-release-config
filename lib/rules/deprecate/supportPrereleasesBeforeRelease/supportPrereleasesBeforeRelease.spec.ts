jest.unstable_mockModule('@/templates/ranges/$prereleasesForVersion', () => ({
	$prereleasesForVersion: jest.fn(() => '>= 1.1.2-rc.0 < 1.1.2'),
}));

describe('supportPrereleasesBeforeRelease()', () => {
	let $prereleasesForVersion: (($preids: string) => string) | null = null;
	let supportPrereleasesBeforeRelease: ((prerelease: string) => unknown) | null = null;

	beforeAll(async () => {
		({ $prereleasesForVersion } = await import('@/templates/ranges/$prereleasesForVersion'));
		({ supportPrereleasesBeforeRelease } = await import('./supportPrereleasesBeforeRelease'));
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should return a deprecation object', () => {
		expect(supportPrereleasesBeforeRelease?.('rc')).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest prerelease', () => {
		expect($prereleasesForVersion).toHaveBeenCalled();
	});
});
