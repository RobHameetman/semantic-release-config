import { PR_NUMBER } from '@/utils/constants/PR_NUMBER';
import { PR_PRERELEASE_LABEL } from '@/utils/constants/PR_PRERELEASE_LABEL';
import { env } from '@/utils/functions/environment/env';

/**
 * TODO - Make this strategy-dependent
 */

/**
 * The dist channel used for PR prerelease versions. You can override the
 * default value with the `RELEASE_PR_PRERELEASE_CHANNEL` environment variable.
 *
 * @defaultValue - `${PR_PRERELEASE_LABEL}-${PR_NUMBER}`
 */
export const PR_PRERELEASE_CHANNEL = env('RELEASE_PR_PRERELEASE_CHANNEL') || `${PR_PRERELEASE_LABEL}-${PR_NUMBER}`;
