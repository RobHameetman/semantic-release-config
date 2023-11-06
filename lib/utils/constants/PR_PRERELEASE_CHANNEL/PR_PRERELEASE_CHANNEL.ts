import { PR_NUMBER } from '@utils/constants/PR_NUMBER';
import { env } from '@utils/functions/environment/env';

/**
 * A date hash used in specific prerelease types.
 */
export const PR_PRERELEASE_CHANNEL = env('PR_PRERELEASE_CHANNEL') || `pr-${PR_NUMBER}`;
