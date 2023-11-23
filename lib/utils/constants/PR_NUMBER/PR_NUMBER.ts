import { isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';
import { getPrNumberForBranch } from '@utils/functions/misc/getPrNumberForBranch';

const _prNumberFromEnv = env('CI_PR_NUMBER', envOr([
	'CI_PULL_REQUEST',
	'CI_MERGE_REQUEST_IID',
	'PULL_REQUEST_NUMBER',
	'CIRCLE_PR_NUMBER',
	'TRAVIS_PULL_REQUEST',
	'BITBUCKET_PR_ID',
])) || (env('CI_REF', envOr([
	'CI_COMMIT_REF_NAME',
	'GITHUB_REF',
])) || '').split('/').at(2);

const _prNumberFromBranch = getPrNumberForBranch();

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
export const PR_NUMBER = !isUndefined(_prNumberFromBranch) && !isNaN(Number(_prNumberFromBranch))
	? Number(_prNumberFromBranch)
	: undefined;
