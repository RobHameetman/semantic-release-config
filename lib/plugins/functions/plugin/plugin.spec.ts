import { streamlineConfig } from '@plugins/functions/streamlineConfig';
import { onTest } from '@test/utils/onTest';
import { plugin } from './plugin';

jest.mock('@plugins/functions/streamlineConfig', () => ({
	__esModule: true,
	streamlineConfig: jest.fn(jest.requireActual('@plugins/functions/streamlineConfig').streamlineConfig),
}));

jest.mock('@plugins/constants/CHANGELOG_ENABLED', () => ({
	__esModule: true,
	CHANGELOG_ENABLED: false,
}));

jest.mock('@plugins/constants/SLACK_ENABLED', () => ({
	__esModule: true,
	SLACK_ENABLED: false,
}));

describe('plugin()', () => {
	let error: Error | null = null;
	let result: unknown = null;
	let index = 1;

	beforeEach(() => {
		try {
			onTest(index, {
				1: () => {
					result = plugin(['@semantic-release/test-plugin', {
						foo: 'foo.js',
						bar: undefined,
					}]);
				},
				2: () => {
					result = plugin(['@semantic-release/test-plugin', {
						foo: 'foo.js',
						bar: 'setToThis',
					}]);
				},
				3: () => {
					result = plugin(['@semantic-release/changelog', {
						changelogFile: './CHANGELOG.md',
						changelogTitle: '# Changelog',
					}]);
				},
				4: () => {
					result = plugin(['@semantic-release/exec', {
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
					}]);
				},
				5: () => {
					result = plugin(['@semantic-release/exec', {
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
					}]);
				},
				6: () => {
					result = plugin(['semantic-release-slack-bot', {
						notifyOnSuccess: true,
						notifyOnFail: true,
						onSuccessTemplate: {
							text: '✅ Success! Version $npm_package_version of $package_name has been published.',
						},
						onFailTemplate: {
							text: '❌ Oh no! Version $npm_package_version of $package_name failed to publish.',
						},
					}]);
				},
			});
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		result = null;
		index++;
	});

	it('should streamline the provided config', () => {
		expect(index).toBe(1);
		expect(error).toBeNull();

		expect(streamlineConfig).toBeCalled();
	});

	it('should return a plugin spec given a plugin which is not checked for enablement', () => {
		expect(index).toBe(2);
		expect(error).toBeNull();

		expect(result).not.toBeNull();
	});

	it('should return null given a changelog plugin configuration when the changelog plugin is disabled', () => {
		expect(index).toBe(3);
		expect(error).toBeNull();

		expect(result).toBeNull();
	});

	it('should return null given an exec plugin configuration with no defined options', () => {
		expect(index).toBe(4);
		expect(error).toBeNull();

		expect(result).toBeNull();
	});

	it('should return a plugin spec given an exec plugin configuration with defined options', () => {
		expect(index).toBe(5);
		expect(error).toBeNull();

		expect(result).not.toBeNull();
	});

	it('should return null given a slack plugin configuration when the slack plugin is disabled', () => {
		expect(index).toBe(6);
		expect(error).toBeNull();

		expect(result).toBeNull();
	});
});

