import { $supportLatestMinorRelease } from '@templates/ranges/$supportLatestMinorRelease';
import { supportLatestMinorRelease } from './supportLatestMinorRelease';

jest.mock('@templates/ranges/$supportLatestMinorRelease', () => ({
	__esModule: true,
	$supportLatestMinorRelease: jest.fn(() => '>= 1.1.0 < 1.2.0'),
}));

describe('supportLatestMinorRelease()', () => {
	it('should return a deprecation object', () => {
		expect(supportLatestMinorRelease()).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest minor release', () => {
		expect($supportLatestMinorRelease).toBeCalled();
	});
});
