import { readFileSync as _readFileSync } from 'fs';
import { exec as _exec } from 'child_process';
import { promisify } from 'util';
import { isUndefined } from '@rob.hameetman/type-guards';
import { components } from '@octokit/openapi-types';
import { Endpoints } from '@octokit/types';
import { CURRENT_BRANCH } from '@/utils/constants/CURRENT_BRANCH';
import { REPO_NAME } from '@/utils/constants/REPO_NAME';
import { REPO_TOKEN } from '@/utils/constants/REPO_TOKEN';
import { env } from '@/utils/functions/environment/env';
import { envOr } from '@/utils/functions/environment/envOr';

type PullRequestSchema = components['schemas']['pull-request-simple'];
type PullRequestData = Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'];
type PullRequest = PullRequestSchema & PullRequestData;
type PullRequests = ReadonlyArray<PullRequest>;

let value = Number(env('CI_PR_NUMBER', envOr([
	'CI_PULL_REQUEST',
	'PULL_REQUEST_NUMBER',
	/**
	 * @see https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
	 */
	'CI_MERGE_REQUEST_IID',
	/**
	 * @see https://circleci.com/docs/variables/#built-in-environment-variables
	 */
	'CIRCLE_PR_NUMBER',
	/**
	 * @see https://docs.travis-ci.com/user/environment-variables/
	 */
	'TRAVIS_PULL_REQUEST',
	/**
	 * @see https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/
	 */
	'BITBUCKET_PR_ID',
]))) || (env('CI_REF', envOr([
	'CI_COMMIT_REF_NAME',
	'GITHUB_REF',
])) || '').split('/').map(Number).at(2);

if (isUndefined(value) || isNaN(value)) {
	const exec = promisify(_exec);

	const { stdout, stderr } = await exec(
		`curl -s -H "Authorization: token ${REPO_TOKEN}" "https://api.github.com/repos/${REPO_NAME}/pulls?state=open"`,
	);

	if (stderr) {
		throw new Error(stderr);
	}

	const openPullRequests = JSON.parse(stdout) as PullRequests;

	if (!(openPullRequests instanceof Array)) {
		throw new Error((openPullRequests as Record<'message', string>).message || 'Unknown error');
	}

	const prNumbersByBranchName = openPullRequests.reduce((map, { number, head }) => {
		if (!isNaN(number)) {
			map.set(head.ref, number);
		}

		return map;
	}, new Map<string, number>());

	if (prNumbersByBranchName.has(CURRENT_BRANCH || '')) {
		value = prNumbersByBranchName.get(CURRENT_BRANCH || '');
	}
}

/**
 * The PR number used in PR prerelease versions. This should be set by the CI
 * environment automatically. PR prerelease versions are used for easier testing
 * of specific features. Each PR gets its own channel and the preid uses the PR
 * number and commit SHA for easy identification. We check multiple environment
 * variables to support multiple CI providers. You may need to set this manually
 * in your CI/CD pipeline configuration.
 *
 * @defaultValue - The relevant PR number or `undefined` if the current branch
 * does not have a PR open.
 *
 * @example
 * ```yaml
 * # .github/workflows/publish.yml file
 * CI_PR_NUMBER=${{ github.event.pull_request.number }}
 * ```
 */
export const PR_NUMBER = value;
