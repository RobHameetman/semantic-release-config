import { COMMIT_SHA } from '@utils/constants/COMMIT_SHA';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';

/**
 * The short (8 characters) commit sha for the commit which triggered the
 * release. This should be set by the CI environment. We check multiple
 * environment variables to support multiple CI providers. In some cases, you
 * may need to set this manually in your CI/CD pipeline configuration.
 *
 * @defaultValue - The short commit sha provided either directly or by
 * shortening the long sha, or `undefined` if no short or long sha is provided.
 *
 * @example
 * ```yaml
 * # .github/workflows/publish.yml file
 * CI_SHA_SHORT=${{ github.sha }}
 * ```
 */
export const COMMIT_SHA_SHORT = env('CI_SHA_SHORT', envOr([
	'CI_COMMIT_SHORT_SHA',
])) || (COMMIT_SHA || '').slice(0, 8) || undefined;
