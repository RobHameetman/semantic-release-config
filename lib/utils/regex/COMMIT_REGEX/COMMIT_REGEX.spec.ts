import { COMMIT_REGEX } from './COMMIT_REGEX';

describe('COMMIT_REGEX', () => {
	it('should be a regular expression', () => {
		expect(COMMIT_REGEX).toBeInstanceOf(RegExp);
	});
});
