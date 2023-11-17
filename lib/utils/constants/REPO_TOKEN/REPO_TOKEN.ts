import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';

/**
 * The auth token for the repo which triggered the release. This should be set
 * by the CI environment automatically. We check multiple environment variables
 * to support multiple CI providers. In some cases, you may need to
 * set this manually in your CI/CD pipeline configuration.
 *
 * @defaultValue - The repo token or `undefined`.
 *
 * @example
 * ```yaml
 * # .github/workflows/publish.yml file
 * CI_TOKEN=${{ github.token }}
 * ```
 */
export const REPO_TOKEN = env('CI_TOKEN', envOr([
	'GITHUB_TOKEN',
	'GH_TOKEN',
	'GITLAB_TOKEN',
	'BITBUCKET_TOKEN',
]));
