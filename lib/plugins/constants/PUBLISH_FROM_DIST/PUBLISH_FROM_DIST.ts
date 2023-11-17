import { env } from '@utils/functions/environment/env';
import { isEnvTrue } from '@utils/functions/environment/isEnvTrue';

/**
 * Whether or not to run `npm publish` from a build directory like the `dist/`
 * folder. This allows you to override the default behavior with the
 * `RELEASE_DISABLE_CHANGELOG` environment variable if you are publishing from
 * the build directory.
 *
 * @defaultValue - `false`
 *
 * @example
 * ```sh
 * # .env file
 * RELEASE_PUBLISH_FROM_DIST=true
 * ```
 */
export const PUBLISH_FROM_DIST = env('RELEASE_PUBLISH_FROM_DIST', isEnvTrue);
