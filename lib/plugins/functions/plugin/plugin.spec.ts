// import { streamlineConfig } from '@/plugins/functions/streamlineConfig';
import { disableChangelog } from '@@/mocks/changelog/disableChangelog';
import { disableSlack } from '@@/mocks/slack/disableSlack';
import { mockEnv } from '@@/utils/mockEnv';
// import { plugin } from './plugin';

// disableChangelog();
// disableSlack();

describe('plugin()', () => {
	let error: Error | null = null;
	let result: unknown = null;
	let act: jest.Mock | null = null;

	beforeAll(async () => {
		// disableChangelog();
		// disableSlack();

		mockEnv('RELEASE_DISABLE_CHANGELOG')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValue(undefined);

		const { plugin } = await import('./plugin');

		act = jest.fn()
				.mockImplementationOnce(() => plugin(['@semantic-release/test-plugin', {
					foo: 'foo.js',
					bar: undefined,
				}]))
				.mockImplementationOnce(() => plugin(['@semantic-release/changelog', {
					changelogFile: './CHANGELOG.md',
					changelogTitle: '# Changelog',
				}]))
				.mockImplementationOnce(() => plugin(['@semantic-release/exec', {
					addChannelCmd: undefined,
					analyzeCommitsCmd: undefined,
					execCwd: undefined,
					failCmd: undefined,
					generateNotesCmd: undefined,
					prepareCmd: undefined,
					publishCmd: undefined,
					shell: undefined,
					successCmd: undefined,
					verifyConditionsCmd: undefined,
					verifyReleaseCmd: undefined,
				}]))
				.mockImplementationOnce(() => plugin(['@semantic-release/exec', {
					addChannelCmd: undefined,
					analyzeCommitsCmd: undefined,
					execCwd: undefined,
					failCmd: undefined,
					generateNotesCmd: undefined,
					prepareCmd: 'npm pkg set version ${nextRelease.version}-rc.${commit.gitHead}',
					publishCmd: undefined,
					shell: undefined,
					successCmd: undefined,
					verifyConditionsCmd: undefined,
					verifyReleaseCmd: undefined,
				}]))
				.mockImplementationOnce(() => plugin(['semantic-release-slack-bot', {
					notifyOnSuccess: true,
					notifyOnFail: true,
					onSuccessTemplate: {
						text: '✅ Success! Version $npm_package_version of $package_name has been published.',
					},
					onFailTemplate: {
						text: '❌ Oh no! Version $npm_package_version of $package_name failed to publish.',
					},
				}]));
	});

	beforeEach(() => {
		try {
			result = act?.();
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();

		result = null;
	});

	afterAll(() => {
		result = null;
	});

	// it('should streamline the provided config', () => {
	// 	expect(error).toBeNull();
	// 	expect(streamlineConfig).toBeCalled();
	// });

	it('should return a plugin spec given a plugin which is not checked for enablement', () => {
		expect(error).toBeNull();
		expect(result).not.toBeNull();
	});

	it('should return null given a changelog plugin configuration when the changelog plugin is disabled', () => {
		expect(error).toBeNull();
		expect(result).toBeNull();
	});

	it('should return null given an exec plugin configuration with no defined options', () => {
		expect(error).toBeNull();
		expect(result).toBeNull();
	});

	it('should return a plugin spec given an exec plugin configuration with defined options', () => {
		expect(error).toBeNull();
		expect(result).not.toBeNull();
	});

	it('should return null given a slack plugin configuration when the slack plugin is disabled', () => {
		expect(error).toBeNull();
		expect(result).toBeNull();
	});
});

