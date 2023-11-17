import { env } from '@utils/functions/environment/env';
import { isEnvTrue } from '@utils/functions/environment/isEnvTrue';

/**
 * Whether or not to enable the changelog plugin. This allows you to disable the
 * changelog plugin with the `RELEASE_DISABLE_CHANGELOG` environment variable if
 * you don't want to use it. Setting it to `false` explicitly for prereleases
 * does not enable changelog generation.
 *
 * @defaultValue - `true`
 *
 * @example
 * ```sh
 * # .env file
 * RELEASE_DISABLE_CHANGELOG=true
 * ```
 */
export const CHANGELOG_ENABLED = !env('RELEASE_DISABLE_CHANGELOG', isEnvTrue);
