jest.unstable_mockModule('@/templates/ranges/$supportLatestMinorRelease', () => ({
	$supportLatestMinorRelease: jest.fn(() => '>= 1.1.0 < 1.2.0'),
}));

describe('supportLatestMinorRelease()', () => {
	let $supportLatestMinorRelease: (() => string) | null = null;
	let supportLatestMinorRelease: (() => unknown) | null = null;

	beforeAll(async () => {
		({ $supportLatestMinorRelease } = await import('@/templates/ranges/$supportLatestMinorRelease'));
		({ supportLatestMinorRelease } = await import('./supportLatestMinorRelease'));
	});

	it('should return a deprecation object', () => {
		expect(supportLatestMinorRelease?.()).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest minor release', () => {
		expect($supportLatestMinorRelease).toBeCalled();
	});
});
