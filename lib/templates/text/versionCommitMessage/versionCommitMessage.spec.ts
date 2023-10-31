import { mockEnv } from '@@/utils';
import { versionCommitMessage } from './versionCommitMessage';

describe('versionCommitMessage()', () => {
	let expected: jest.Mock | null = null;
	let actual: unknown = null;

	beforeAll(() => {
		mockEnv('RELEASE_COMMIT_MESSAGE')
			.mockReturnValue('chore: bump version');

		mockEnv('RELEASE_COMMIT_MODIFIER')
			.mockReturnValue('minor');

		mockEnv('RELEASE_COMMIT_TYPE')
			.mockReturnValue('feat');

		expected = jest.fn()
			.mockReturnValueOnce('feat(${nextRelease.version}): chore: bump version [minor]\n\n${nextRelease.notes}');

		actual = versionCommitMessage();
	});

	beforeEach(() => {
		expected = null;
		actual = null;
	});

	afterEach(() => {
		expected = null;
		actual = null;
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should return a version commit message with the given default message, modifier, and type', () => {
		expect(actual).toBe(expected);
	});

	it('should return a version commit message with the given message, modifier, and type', () => {
		expect(actual).toBe(expected);
	});
});
