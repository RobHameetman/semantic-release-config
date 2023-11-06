import { $supportLatestPatchRelease } from '@templates/ranges/$supportLatestPatchRelease';
import { supportLatestPatchRelease } from './supportLatestPatchRelease';

jest.mock('@templates/ranges/$supportLatestPatchRelease', () => ({
	__esModule: true,
	$supportLatestPatchRelease: jest.fn(() => '>= 1.1.0 < 1.2.0'),
}));

describe('supportLatestPatchRelease()', () => {
	it('should return a deprecation object', () => {
		expect(supportLatestPatchRelease()).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest patch release', () => {
		expect($supportLatestPatchRelease).toBeCalled();
	});
});
