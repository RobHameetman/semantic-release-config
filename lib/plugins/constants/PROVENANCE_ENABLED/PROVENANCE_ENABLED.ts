import { env } from '#utils/functions/environment/env';
import { isEnvTrue } from '#utils/functions/environment/isEnvTrue';

/**
 * Whether or not to publish with npm provenance. When enabled, the
 * `@semantic-release/npm` plugin passes `--provenance` to `npm publish`, which
 * emits a signed provenance attestation. This is the natural pairing with npm
 * trusted publishing (OIDC) and requires the publish environment to provide an
 * OIDC token (e.g. GitHub Actions with `id-token: write`). Disable it with the
 * `RELEASE_DISABLE_PROVENANCE` environment variable when publishing from an
 * environment that cannot mint an OIDC token.
 *
 * @defaultValue - `true`
 *
 * @example
 * ```sh
 * # .env file
 * RELEASE_DISABLE_PROVENANCE=true
 * ```
 */
export const PROVENANCE_ENABLED = !env('RELEASE_DISABLE_PROVENANCE', isEnvTrue);
