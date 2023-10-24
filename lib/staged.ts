import {
	VERSIONED_RELEASE_BRANCHES,
	PluginPresets,
	analyzeCommits,
	createConfig,
	commitUpdatesAndPush,
	deprecatePreviousVersions,
	env,
	executeCustomCommands,
	generateReleaseNotes,
	getEnvBooleanOrValue,
	isEnvTrue,
	isEnvDefined,
	latestMajorVersionOnly,
	latestMinorVersionOnly,
	latestPatchVersionOnly,
	latestPrereleaseOnly,
	notifySlackChannel,
	prepareChangelog,
	publishGithubRelease,
	releaseRules,
	updateVersionAndPublishToRegistry,
} from '.';

const PLUGIN_PRESET = env('RELEASE_PLUGIN_PRESET') || PluginPresets.default;
const PUBLISH_FROM_DIST = env('RELEASE_PUBLISH_FROM_DIST', isEnvTrue);

const DISABLE_CHANGELOG = env('RELEASE_DISABLE_CHANGELOG', isEnvTrue);
const CHANGELOG_FILE = env('RELEASE_CHANGELOG_FILE') || 'CHANGELOG.md';
const CHANGELOG_TITLE = env('RELEASE_CHANGELOG_TITLE');

const SLACK_CHANNEL = env('RELEASE_NOTIFICATION_SLACK_CHANNEL') || env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC') || env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE') || env('SLACK_CHANNEL');
const HAS_SLACK_CHANNEL_PRIVATE = env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined);
const SLACK_CHANNEL_PRIVATE = env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE');
const HAS_SLACK_CHANNEL_PUBLIC = env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC', isEnvDefined);
const SLACK_CHANNEL_PUBLIC = env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC');

module.exports = createConfig({
	branches: [
		{ name: '@(main|master)', prerelease: false, channel: 'latest' },
		{ name: 'next-major', prerelease: 'rc', channel: 'next-major' },
		{ name: 'next', prerelease: 'rc', channel: 'next' },
		{ name: 'beta', prerelease: true, channel: 'beta' },
		{ name: 'alpha', prerelease: true, channel: 'alpha' },
	],
	plugins: [
		['@semantic-release/commit-analyzer', {
			preset: PLUGIN_PRESET,
			releaseRules,
		}],
		['@semantic-release/changelog', {
			changelogFile: CHANGELOG_FILE,
			changelogTitle: CHANGELOG_TITLE,
		}],
		['@semantic-release/release-notes-generator', {
			preset: PLUGIN_PRESET,
		}],
		['@semantic-release/npm', {
			pkgRoot: PUBLISH_FROM_DIST ? 'dist' : '.',
		}],
		['semantic-release-npm-deprecate', {
			deprecations: [
				latestMajorVersionOnly(),
				latestMinorVersionOnly(),
				latestPatchVersionOnly(),
				latestPrereleaseOnly(),
			]
		}],
		['@semantic-release/git', {
			message: 'release(${nextRelease.version}): Update package.json to new version [SKIP CI]\n\n${nextRelease.notes}',
			assets: ['package.json', 'package-lock.json'].concat(DISABLE_CHANGELOG ? [] : [CHANGELOG_FILE]),
		}],
		['@semantic-release/github', {
			assets: [],
			successComment: ':tada: This issue has been resolved in version ${nextRelease.version}.\n\nThe release is available [here](<github_release_url>)',
			failComment: 'This release from branch ${branch.name} had failed due to the following errors:\n- ${errors.map(err => err.message).join(\'\n- \')}',
			failTitle: '🚨 The automated release is failing',
		}],
		['@semantic-release/exec', {
			analyzeCommitsCmd: env('RELEASE_EXEC_ANALYZE_COMMITS_CMD'),
			addChannelCmd: env('RELEASE_EXEC_GENERATE_NOTES_CMD'),
			execCwd: env('RELEASE_EXEC_ADD_CHANNEL_CMD'),
			failCmd: env('RELEASE_EXEC_VERIFY_ARTIFACTS_CMD'),
			generateNotesCmd: env('RELEASE_EXEC_CWD'),
			prepareCmd: env('RELEASE_EXEC_FAIL_CMD'),
			publishCmd: env('RELEASE_EXEC_PREPARE_CMD'),
			shell: env('RELEASE_EXEC_PUBLISH_CMD'),
			successCmd: env('RELEASE_EXEC_SUCCESS_CMD'),
			verifyConditionsCmd: env('RELEASE_EXEC_SHELL', getEnvBooleanOrValue),
			verifyReleaseCmd: env('RELEASE_EXEC_VERIFY_CONDITIONS_CMD'),
		}],
		['semantic-release-slack-bot', {
			notifyOnSuccess: false,
			notifyOnFail: false,
			slackWebhookEnVar: 'RELEASE_NOTIFICATION_SLACK_WEBHOOK',
			slackTokenEnVar: 'RELEASE_NOTIFICATION_SLACK_TOKEN',
			slackIconEnVar: 'RELEASE_NOTIFICATION_SLACK_ICON',
			slackNameEnVar: 'RELEASE_NOTIFICATION_SLACK_NAME',
			slackChannel: SLACK_CHANNEL,
			branchesConfig: [
				{
					pattern: '@(main|master)',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					notifyOnFail: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE'),
					onSuccessTemplate: {
						text: '✅ Success! $package_name has been updated to version $npm_package_version.',
					},
					onFailTemplate: {
						text: '❌ Oh no! $package_name failed to update to version $npm_package_version.',
					},
				},
				{
					pattern: '@(main|master)',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC', isEnvDefined) || env('RELEASE_NOTIFICATION_SLACK_CHANNEL', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC') || env('RELEASE_NOTIFICATION_SLACK_CHANNEL'),
					onSuccessTemplate: {
						text: '🎉 A new version of $package_name has been released! This release is the culmination of hard work, extensive testing, and valuable feedback from many of you. To access version $npm_package_version, run `npm update --save $package_name` in your CLI to update your project\'s `package.json` file. For more detailed information about this release, please refer to our release notes at $repo_url. As always, your feedback is incredibly important to us, and we invite you to share your thoughts and experiences around this release with us right here in this channel. Stay tuned for more updates.'
					}
				},
				{
					pattern: 'next-major',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					notifyOnFail: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE'),
					onSuccessTemplate: {
						text: '✅ Success! Version $npm_package_version of $package_name has been published.',
					},
					onFailTemplate: {
						text: '❌ Oh no! Version $npm_package_version of $package_name failed to publish.',
					},
				},
				{
					pattern: 'next-major',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC', isEnvDefined) || env('RELEASE_NOTIFICATION_SLACK_CHANNEL', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC') || env('RELEASE_NOTIFICATION_SLACK_CHANNEL'),
					onSuccessTemplate: {
						text: '🔬 A new release candidate of $package_name is available for testing. This prerelease gives us the opportunity to iron out any kinks and gather valuable insights before the full launch. Please feel welcome to update to version $npm_package_version and try it out! We\'re looking forward to your participation and feedback. If you have any questions, please don\'t hesitate to reach out.'
					}
				},
				{
					pattern: 'next',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					notifyOnFail: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE'),
					onSuccessTemplate: {
						text: '✅ Success! Version $npm_package_version of $package_name has been published.',
					},
					onFailTemplate: {
						text: '❌ Oh no! Version $npm_package_version of $package_name failed to publish.',
					},
				},
				{
					pattern: 'next',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC', isEnvDefined) || env('RELEASE_NOTIFICATION_SLACK_CHANNEL', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC') || env('RELEASE_NOTIFICATION_SLACK_CHANNEL'),
					onSuccessTemplate: {
						text: '🔬 A new version of $package_name is available for testing. This prerelease gives us the opportunity to iron out any kinks and gather valuable insights before the full launch. Please feel welcome to update to version $npm_package_version and try it out! We\'re looking forward to your participation and feedback. If you have any questions, please don\'t hesitate to reach out.'
					}
				},
				{
					pattern: 'beta',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					notifyOnFail: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE'),
					onSuccessTemplate: {
						text: '✅ Success! Version $npm_package_version of $package_name has been published.',
					},
					onFailTemplate: {
						text: '❌ Oh no! Version $npm_package_version of $package_name failed to publish.',
					},
				},
				{
					pattern: 'beta',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC', isEnvDefined) || env('RELEASE_NOTIFICATION_SLACK_CHANNEL', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PUBLIC') || env('RELEASE_NOTIFICATION_SLACK_CHANNEL'),
					onSuccessTemplate: {
						text: '🔬 A new beta version of $package_name is available for testing. This prerelease gives us the opportunity to iron out any kinks and gather valuable insights before the full launch. Please feel welcome to update to version $npm_package_version and try it out! We\'re looking forward to your participation and feedback. If you have any questions, please don\'t hesitate to reach out.'
					}
				},
				{
					pattern: 'alpha',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					notifyOnFail: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL_PRIVATE'),
					onSuccessTemplate: {
						text: '✅ Success! Version $npm_package_version of $package_name has been published.',
					},
					onFailTemplate: {
						text: '❌ Oh no! Version $npm_package_version of $package_name failed to publish.',
					},
				},
			]
		}],
	],
});
