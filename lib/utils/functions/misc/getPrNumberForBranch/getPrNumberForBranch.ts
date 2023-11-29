import { readFileSync as _readFileSync } from 'fs';
import { exec as _exec } from 'child_process';
import { components } from '@octokit/openapi-types';
import { Endpoints } from '@octokit/types';
import { promisify } from 'util';
import { isString } from '@rob.hameetman/type-guards';
import { CURRENT_BRANCH } from '@utils/constants/CURRENT_BRANCH';
import { REPO_NAME } from '@utils/constants/REPO_NAME';
import { REPO_TOKEN } from '@utils/constants/REPO_TOKEN';

type PullRequestSchema = components["schemas"]["pull-request-simple"];
type PullRequestData = Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]['data'];
type PullRequest = PullRequestSchema & PullRequestData;
type PullRequests = ReadonlyArray<PullRequest>;

type Head = PullRequest['head'];
type PRField = keyof PullRequest;

const field: PRField = 'html_url';

/**
 * Functional dependencies used in the {@link getPrNumberForBranch()} function.
 * This object is provided in tests for mocking and spying.
 */
export interface GetPrNumberForBranchDependencies {
	/**
	 * [Optional] Synchronously reads the entire contents of a file.
	 */
	readonly execSync?: typeof _exec;
}

/**
 * Get the repository URL from the `package.json` file. If the
 * `npm_package_repository_url` environment variable is set, it will be used
 * instead.
 *
 * @param _dependencies - [Optional] Used in tests for mocking and spying.
 * Defaults to `{}`.
 *
 * @returns The repository URL.
 *
 * @privateRemarks This function uses `readFileSync()` instead of `import()`
 * because of an issue with TypeScript in which an error that the import must be
 * explicitly typed as JSON is thrown even when the import is typed as JSON via
 * `import(path, { assert: { type: 'json' }})`.
 */
export const getPrNumberForBranch = async (
	branch = CURRENT_BRANCH,
	token = REPO_TOKEN,
	repo = REPO_NAME
) => {
	const exec = promisify(_exec);

	const { stdout, stderr } = await exec(
		`curl -H "Authorization: token ${token}" "https://api.github.com/repos/${repo}/pulls?state=open"`,
	);

	if (stderr) {
		throw new Error(stderr);
	}

	const data = JSON.parse(stdout) as PullRequests;
	const { number: prNumber } = data.find(({ head }) => head.ref === branch) || {};

	console.log(`PR_NUMBER: ${prNumber}`);

	return prNumber;
};
