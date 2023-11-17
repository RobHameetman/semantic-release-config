import { env } from '@utils/functions/environment/env';

/**
 * The default commit type for the version update commit. This is the
 * commitlint type in the title. You can override the default value with the
 * `RELEASE_COMMIT_TYPE` environment variable.
 *
 * @defaultValue - `'version'`
 */
export const VERSION_COMMIT_TYPE = env('RELEASE_COMMIT_TYPE') || 'version';
