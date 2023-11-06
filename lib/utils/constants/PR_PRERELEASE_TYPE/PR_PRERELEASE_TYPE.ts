import { COMMIT_SHA_SHORT } from '@utils/constants/COMMIT_SHA_SHORT';
import { DATE_HASH } from '@utils/constants/DATE_HASH';
import { PR_NUMBER } from '@utils/constants/PR_NUMBER';
import { env } from '@utils/functions/environment/env';

/**
 * A date hash used in specific prerelease types.
 */
export const PR_PRERELEASE_TYPE = env('PR_PRERELEASE_TYPE') || `pr.${PR_NUMBER}.${COMMIT_SHA_SHORT}.${DATE_HASH}`;
