import { SEMVER_REGEX } from './SEMVER_REGEX';

describe('SEMVER_REGEX', () => {
	it('should be a regular expression', () => {
		expect(SEMVER_REGEX).toBeInstanceOf(RegExp);
	});
});
