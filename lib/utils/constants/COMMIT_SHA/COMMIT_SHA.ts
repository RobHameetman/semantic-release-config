import { env } from '@/utils/functions/environment/env';
import { envOr } from '@/utils/functions/environment/envOr';

/**
 * The long commit sha for the commit which triggered the release. This should
 * be set by the CI environment automatically. We check multiple environment
 * variables to support multiple CI providers. In some cases, you may need to
 * set this manually in your CI/CD pipeline configuration.
 *
 * @defaultValue - The short commit sha or `undefined`.
 *
 * @example
 * ```yaml
 * # .github/workflows/publish.yml file
 * CI_SHA=${{ github.sha }}
 * ```
 */
export const COMMIT_SHA = env('CI_SHA', envOr([
	'CI_COMMIT_SHA',
	'GITHUB_SHA',
	'GIT_COMMIT',
	'CIRCLE_SHA1',
	'TRAVIS_COMMIT',
	'BITBUCKET_COMMIT',
	'BUILD_SOURCEVERSION',
]));
