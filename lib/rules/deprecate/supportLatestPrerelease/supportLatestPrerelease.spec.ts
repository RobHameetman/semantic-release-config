jest.unstable_mockModule('@/templates/ranges/$supportLatestPrerelease', () => ({
	$supportLatestPrerelease: jest.fn(() => '>= 1.1.2-rc.2 < 1.1.2-rc.3'),
}));

describe('supportLatestPrerelease()', () => {
	let $supportLatestPrerelease: (() => string) | null = null;
	let supportLatestPrerelease: ((prerelease: string) => unknown) | null = null;

	beforeAll(async () => {
		({ $supportLatestPrerelease } = await import('@/templates/ranges/$supportLatestPrerelease'));
		({ supportLatestPrerelease } = await import('./supportLatestPrerelease'));
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should return a deprecation object', () => {
		expect(supportLatestPrerelease?.('rc')).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest prerelease', () => {
		expect($supportLatestPrerelease).toBeCalled();
	});
});
