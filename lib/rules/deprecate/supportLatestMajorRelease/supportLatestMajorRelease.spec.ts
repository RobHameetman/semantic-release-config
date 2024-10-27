jest.unstable_mockModule('@/templates/ranges/$supportLatestMajorRelease', () => ({
	$supportLatestMajorRelease: jest.fn().mockReturnValue('>= 1.0.0 < 2.0.0'),
}));

describe('supportLatestMajorRelease()', () => {
	let $supportLatestMajorRelease: (() => string) | null = null;
	let supportLatestMajorRelease: (() => unknown) | null = null;

	beforeAll(async () => {
		({ $supportLatestMajorRelease } = await import('@/templates/ranges/$supportLatestMajorRelease'));
		({ supportLatestMajorRelease } = await import('./supportLatestMajorRelease'));
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should return a deprecation object', () => {
		expect(supportLatestMajorRelease?.()).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest major release', () => {
		expect($supportLatestMajorRelease).toBeCalled();
	});
});
