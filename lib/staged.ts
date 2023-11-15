import {
	CHANGELOG_ENABLED,
	PLUGIN_PRESET,
	PR_PRERELEASE_CHANNEL,
	PR_PRERELEASE_TYPE,
	PUBLISH_FROM_DIST,
	SLACK_ENABLED,
	createConfig,
	env,
	envOr,
	getEnvBooleanOrValue,
	plugin,
	releaseRules,
	supportLatestMinorRelease,
	supportLatestPatchRelease,
	supportLatestPrerelease,
	supportPrereleasesBeforeRelease,
} from '.';

module.exports = createConfig({
	branches: [
		{ name: '@(main|master)', prerelease: false, channel: 'latest' },
		{ name: 'next-major', prerelease: 'rc', channel: 'next-major' },
		{ name: 'next', prerelease: 'rc', channel: 'next' },
		{ name: 'beta', prerelease: true, channel: 'beta' },
		{ name: 'alpha', prerelease: true, channel: 'alpha' },
		{ name: `[1-9]*([0-9]).X.X`, range: '${name.split(".")[0]}.x.x', prerelease: false, channel: '${name.split(".")[0]}' },
		{ name: '@(!(main|master|next-major|next|beta|alpha|[1-9]*([0-9]).X.X))', prerelease: PR_PRERELEASE_TYPE, channel: PR_PRERELEASE_CHANNEL },
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
			pkgRoot: PUBLISH_FROM_DIST
				? env('RELEASE_BUILD_DIRECTORY') || 'dist'
				: '.',
		}]),
		plugin(['semantic-release-npm-deprecate', {
			deprecations: [
				supportLatestPatchRelease(),
				supportLatestMinorRelease(),
				supportPrereleasesBeforeRelease(['rc', 'beta', 'alpha', env('RELEASE_PR_PREID') || ''].filter(Boolean)),
				supportLatestPrerelease(['rc', 'beta', 'alpha', env('RELEASE_PR_PREID') || ''].filter(Boolean)),
			]
		}]),
		plugin(['@semantic-release/git', {
			message: 'release(${nextRelease.version}): Update package.json to new version [SKIP RELEASE]\n\n${nextRelease.notes}',
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
		}]),
	],
});
