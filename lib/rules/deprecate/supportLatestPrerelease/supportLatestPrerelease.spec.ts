import { $supportLatestPrerelease } from '@templates/ranges/$supportLatestPrerelease';
import { supportLatestPrerelease } from './supportLatestPrerelease';

jest.mock('@templates/ranges/$supportLatestPrerelease', () => ({
	__esModule: true,
	$supportLatestPrerelease: jest.fn(() => '>= 1.1.2-rc.2 < 1.1.2-rc.3'),
}));

describe('supportLatestPrerelease()', () => {
	it('should return a deprecation object', () => {
		expect(supportLatestPrerelease('rc')).toEqual({
			version: expect.any(String),
			message: expect.any(String),
		});
	});

	it('should support the latest prerelease', () => {
		expect($supportLatestPrerelease).toBeCalled();
	});
});
