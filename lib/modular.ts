import type { BranchObject } from 'semantic-release';
import {
	VERSIONED_RELEASE_BRANCHES,
	analyzeCommits,
	createConfig,
	commitUpdatesAndPush,
	env,
	executeCustomCommands,
	deprecatePreviousVersions,
	generateReleaseNotes,
	isEnvTrue,
	notifySlackChannel,
	prepareChangelog,
	publishGithubRelease,
	updateVersionAndPublishToRegistry,
} from '.';

const USE_MASTER = env('RELEASE_MAIN_IS_LATEST', isEnvTrue);
const RELEASE_BRANCHES = env('RELEASE_BRANCHES', (value = '') => value.split(','));

/**
 * @beta - WIP. The idea is to have a release strategy that supports multiple
 * release branches in a multi-package monorepo.
 */
module.exports = createConfig({
	branches: [
		USE_MASTER ? { name: 'major|latest', prerelease: false, channel: 'latest' } : null,
		...RELEASE_BRANCHES.map((name) => ({ name, prerelease: false, channel: 'latest' })),
	].filter(Boolean) as Array<BranchObject>,
	plugins: [
		analyzeCommits(),
		updateVersionAndPublishToRegistry(),
		deprecatePreviousVersions(),
		prepareChangelog(),
		commitUpdatesAndPush(),
		generateReleaseNotes(),
		publishGithubRelease(),
		executeCustomCommands(),
		notifySlackChannel(),
	],
});
