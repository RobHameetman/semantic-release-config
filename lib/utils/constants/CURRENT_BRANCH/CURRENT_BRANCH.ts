import { env } from '@/utils/functions/environment/env';
import { envOr } from '@/utils/functions/environment/envOr';

/**
 * The current branch on which the commit that triggered the release was made.
 * This should be set by the CI environment automatically. We check multiple
 * environment variables to support multiple CI providers. In some cases, you
 * may need to set this manually in your CI/CD pipeline configuration.
 *
 * @defaultValue - The short commit sha provided either directly or by
 * shortening the long sha, or `undefined` if no short or long sha is provided.
 *
 * @example
 * ```yaml
 * # .github/workflows/publish.yml file
 * CI_COMMIT_BRANCH=${{ github.ref_name }}
 * ```
 */
export const CURRENT_BRANCH = env('CI_COMMIT_BRANCH', envOr([
	'GITHUB_HEAD_REF',
	'GIT_BRANCH',
	'CI_MERGE_REQUEST_SOURCE_BRANCH_NAME',
	'CIRCLE_BRANCH',
	'TRAVIS_BRANCH',
	'BITBUCKET_BRANCH',
	'BUILD_SOURCEBRANCH',
]));
