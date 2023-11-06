import {
	CHANGELOG_ENABLED,
	COMMIT_SHA_SHORT,
	DATE_HASH,
	PLUGIN_PRESET,
	PUBLISH_FROM_DIST,
	SLACK_ENABLED,
	createConfig,
	env,
	envOr,
	getEnvBooleanOrValue,
	plugin,
	releaseRules,
} from '.';

const CANARY_PRERELEASE_TYPE = `canary-${COMMIT_SHA_SHORT}-${DATE_HASH}`;
const EXPERIMENTAL_PRERELEASE_TYPE = `experimental-${COMMIT_SHA_SHORT}-${DATE_HASH}`;

/**
 * React release strategy config. Similar to canary but with PR branches used to
 * create experimental prereleases. Versions for canary and experimental
 * branches are both hashed with the short commit hash and release date. The
 * canary channel tracks the main branch of the code repository. Experimental
 * versions are always 0.0.0 whereas canary versions are the current version.
 */
module.exports = createConfig({
	branches: [
		{ name: '[1-9]*([0-9]).+([0-9]).+([0-9])', prerelease: false, channel: 'latest' },
		{ name: '@(main|master)', prerelease: CANARY_PRERELEASE_TYPE, channel: 'canary' },
		{ name: `@(!(main|master|[1-9]*([0-9]).+([0-9]).+([0-9])))`, prerelease: EXPERIMENTAL_PRERELEASE_TYPE, channel: 'experimental' },
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
		}]),
	],
});
