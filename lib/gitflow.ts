import {
	CHANGELOG_ENABLED,
	PLUGIN_PRESET,
	PUBLISH_FROM_DIST,
	SLACK_ENABLED,
	VERSIONED_RELEASE_BRANCHES,
	createConfig,
	env,
	envOr,
	getEnvBooleanOrValue,
	isEnvDefined,
	latestMajorVersionOnly,
	latestMinorVersionOnly,
	latestPatchVersionOnly,
	latestPrereleaseOnly,
	plugin,
	releaseRules,
} from '.';

/**
 * Featured release strategy config. The term "featured" refers to feature-based
 * or "gitflow" branching strategies. `main`/`master` is the primary release
 * branch.
 */
module.exports = createConfig({
	branches: [
		{ name: 'main|master', prerelease: false, channel: 'latest' },
		{ name: 'staging', prerelease: 'beta', channel: 'beta' },
		{ name: 'develop', prerelease: 'alpha', channel: 'alpha' },
		...VERSIONED_RELEASE_BRANCHES,
	],
	plugins: [
		plugin(['@semantic-release/commit-analyzer', {
			preset: PLUGIN_PRESET,
			releaseRules,
		}]),
		plugin(['@semantic-release/changelog', {
			changelogFile: 'CHANGELOG.md',
			changelogTitle: '# Changelog',
		}]),
		plugin(['@semantic-release/release-notes-generator', {
			preset: PLUGIN_PRESET,
		}]),
		plugin(['@semantic-release/npm', {
			pkgRoot: PUBLISH_FROM_DIST ? 'dist' : '.',
		}]),
		plugin(['semantic-release-npm-deprecate', {
			deprecations: [
				latestMajorVersionOnly(),
				latestMinorVersionOnly(),
				latestPatchVersionOnly(),
				latestPrereleaseOnly(),
			]
		}]),
		plugin(['@semantic-release/git', {
			message: 'release(${nextRelease.version}): Update package.json to new version [SKIP CI]\n\n${nextRelease.notes}',
			assets: ['package.json', 'package-lock.json'].concat(CHANGELOG_ENABLED ? ['CHANGELOG.md'] : []),
		}]),
		plugin(['@semantic-release/github', {
			successComment: ':tada: This issue has been resolved in version ${nextRelease.version}.\n\nThe release is available [here](<github_release_url>)',
			failComment: 'This release from branch ${branch.name} had failed due to the following errors:\n- ${errors.map(err => err.message).join(\'\n- \')}',
			failTitle: '🚨 The automated release is failing',
		}]),
		plugin(['@semantic-release/exec', {
			addChannelCmd: env('RELEASE_EXEC_ADD_CHANNEL_CMD'),
			analyzeCommitsCmd: env('RELEASE_EXEC_ANALYZE_COMMITS_CMD'),
			execCwd: env('RELEASE_EXEC_CWD'),
			failCmd: env('RELEASE_EXEC_FAIL_CMD'),
			generateNotesCmd: env('RELEASE_EXEC_GENERATE_NOTES_CMD'),
			prepareCmd: env('RELEASE_EXEC_PREPARE_CMD'),
			publishCmd: env('RELEASE_EXEC_PUBLISH_CMD'),
			shell: env('RELEASE_EXEC_SHELL', getEnvBooleanOrValue),
			successCmd: env('RELEASE_EXEC_SUCCESS_CMD'),
			verifyConditionsCmd: env('RELEASE_EXEC_VERIFY_CONDITIONS_CMD'),
			verifyReleaseCmd: env('RELEASE_EXEC_VERIFY_ARTIFACTS_CMD'),
		}]),
		plugin(['semantic-release-slack-bot', {
			notifyOnSuccess: SLACK_ENABLED,
			notifyOnFail: SLACK_ENABLED,
			onSuccessTemplate: {
				text: '✅ Success! Version $npm_package_version of $package_name has been published.',
			},
			onFailTemplate: {
				text: '❌ Oh no! Version $npm_package_version of $package_name failed to publish.',
			},
			slackChannel: env('RELEASE_NOTIFICATION_SLACK_CHANNEL', envOr('SLACK_CHANNEL')),
			slackIcon: env('RELEASE_NOTIFICATION_SLACK_ICON', envOr('SLACK_ICON')),
			slackName: env('RELEASE_NOTIFICATION_SLACK_NAME', envOr('SLACK_NAME')),
			slackToken: env('RELEASE_NOTIFICATION_SLACK_TOKEN', envOr('SLACK_TOKEN')),
			slackWebhook: env('RELEASE_NOTIFICATION_SLACK_WEBHOOK', envOr('SLACK_WEBHOOK')),
			branchesConfig: [
				{
					pattern: 'main|master',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_PRIVATE_SLACK_CHANNEL', isEnvDefined),
					notifyOnFail: env('RELEASE_NOTIFICATION_PRIVATE_SLACK_CHANNEL', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_PRIVATE_SLACK_CHANNEL'),
					onSuccessTemplate: {
						text: '✅ Success! $package_name has been updated to version $npm_package_version.',
					},
					onFailTemplate: {
						text: '❌ Oh no! $package_name failed to update to version $npm_package_version.',
					},
				},
				{
					pattern: 'main|master',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_PUBLIC_SLACK_CHANNEL', isEnvDefined) || env('RELEASE_NOTIFICATION_SLACK_CHANNEL', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_PUBLIC_SLACK_CHANNEL') || env('RELEASE_NOTIFICATION_SLACK_CHANNEL'),
					onSuccessTemplate: {
						text: '🎉 A new version of $package_name has been released! This release is the culmination of hard work, extensive testing, and valuable feedback from many of you. To access version $npm_package_version, run `npm update --save $package_name` in your CLI to update your project\'s `package.json` file. For more detailed information about this release, please refer to our release notes at $repo_url. As always, your feedback is incredibly important to us, and we invite you to share your thoughts and experiences around this release with us right here in this channel. Stay tuned for more updates.'
					}
				},
				{
					pattern: 'staging',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_PRIVATE_SLACK_CHANNEL', isEnvDefined),
					notifyOnFail: env('RELEASE_NOTIFICATION_PRIVATE_SLACK_CHANNEL', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_PRIVATE_SLACK_CHANNEL'),
					onSuccessTemplate: {
						text: '✅ Success! Version $npm_package_version of $package_name has been published.',
					},
					onFailTemplate: {
						text: '❌ Oh no! Version $npm_package_version of $package_name failed to publish.',
					},
				},
				{
					pattern: 'staging',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_PUBLIC_SLACK_CHANNEL', isEnvDefined) || env('RELEASE_NOTIFICATION_SLACK_CHANNEL', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_PUBLIC_SLACK_CHANNEL') || env('RELEASE_NOTIFICATION_SLACK_CHANNEL'),
					onSuccessTemplate: {
						text: '🔬 A new version of $package_name is available for testing. This beta prerelease gives us the opportunity to iron out any kinks and gather valuable insights before the full launch. Please feel welcome to update to version $npm_package_version and try it out! We\'re looking forward to your participation and feedback. If you have any questions, please don\'t hesitate to reach out.'
					}
				},
				{
					pattern: 'develop',
					notifyOnSuccess: env('RELEASE_NOTIFICATION_PRIVATE_SLACK_CHANNEL', isEnvDefined),
					notifyOnFail: env('RELEASE_NOTIFICATION_PRIVATE_SLACK_CHANNEL', isEnvDefined),
					slackChannel: env('RELEASE_NOTIFICATION_PRIVATE_SLACK_CHANNEL'),
					onSuccessTemplate: {
						text: '✅ Success! Version $npm_package_version of $package_name has been published.',
					},
					onFailTemplate: {
						text: '❌ Oh no! Version $npm_package_version of $package_name failed to publish.',
					},
				},
			]
		}]),
	],
});
