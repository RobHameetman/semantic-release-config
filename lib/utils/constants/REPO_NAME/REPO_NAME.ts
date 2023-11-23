import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';

/**
 * The name of the repo which triggered the release. This should be set by the
 * CI environment automatically. We check multiple environment variables to
 * support multiple CI providers. In some cases, you may need to set this
 * manually in your CI/CD pipeline configuration.
 *
 * @defaultValue - The repo token or `undefined`.
 *
 * @example
 * ```yaml
 * # .github/workflows/publish.yml file
 * CI_REPOSITORY=${{ github.repository }}
 * ```
 */
export const REPO_NAME = env('CI_REPOSITORY', envOr([
	'GITHUB_REPOSITORY',
	'GH_REPOSITORY',
	'GITLAB_REPOSITORY',
	'BITBUCKET_REPOSITORY',
]));
