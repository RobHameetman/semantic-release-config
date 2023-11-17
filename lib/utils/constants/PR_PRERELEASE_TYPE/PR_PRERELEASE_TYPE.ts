import { env } from '@utils/functions/environment/env';

/**
 * The preid type used for PR prerelease versions. You can override the default
 * value with the `RELEASE_PR_PRERELEASE_TYPE` environment variable.
 *
 * @defaultValue - `'pr'`
 */
export const PR_PRERELEASE_TYPE = env('RELEASE_PR_PRERELEASE_TYPE') || 'pr';
