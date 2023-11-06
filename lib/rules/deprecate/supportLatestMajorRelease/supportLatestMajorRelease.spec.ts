import { $supportLatestMajorRelease } from '@templates/ranges/$supportLatestMajorRelease';
import { supportLatestMajorRelease } from './supportLatestMajorRelease';

jest.mock('@templates/ranges/$supportLatestMajorRelease', () => ({
	__esModule: true,
	$supportLatestMajorRelease: jest.fn(() => '>= 1.0.0 < 2.0.0'),
}));

describe('supportLatestMajorRelease()', () => {
	it('should return a deprecation object', () => {
		expect(supportLatestMajorRelease()).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest major release', () => {
		expect($supportLatestMajorRelease).toBeCalled();
	});
});
