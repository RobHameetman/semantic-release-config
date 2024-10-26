jest.unstable_mockModule('@/templates/ranges/$supportLatestPatchRelease', () => ({
	$supportLatestPatchRelease: jest.fn().mockReturnValue('>= 1.1.0 < 1.2.0'),
}));

describe('supportLatestPatchRelease()', () => {
	let $supportLatestPatchRelease: (() => string) | null = null;
	let supportLatestPatchRelease: (() => unknown) | null = null;

	beforeAll(async () => {
		({ $supportLatestPatchRelease } = await import('@/templates/ranges/$supportLatestPatchRelease'));
		({ supportLatestPatchRelease } = await import('./supportLatestPatchRelease'));
	});

	afterAll(() => {
		jest.restoreAllMocks();

		$supportLatestPatchRelease = null;
		supportLatestPatchRelease = null;
	});

	it('should return a deprecation object', () => {
		expect(supportLatestPatchRelease?.()).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest patch release', () => {
		expect($supportLatestPatchRelease).toBeCalled();
	});
});
