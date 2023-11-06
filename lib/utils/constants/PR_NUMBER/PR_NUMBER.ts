import { isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';

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

/**
 * The PR number used in PR prerelease versions. PR prerelease versions are used
 * for easier testing of specific features. Each PR gets its own channel and the
 * preid uses the PR number and commit SHA for easy identification.
 */
export const PR_NUMBER = !isUndefined(_prNumberFromEnv) && !isNaN(Number(_prNumberFromEnv))
	? Number(_prNumberFromEnv)
	: undefined;
