import { COMMIT_SHA_SHORT } from '@/utils/constants/COMMIT_SHA_SHORT';
import { DATE_HASH } from '@/utils/constants/DATE_HASH';
import { PR_NUMBER } from '@/utils/constants/PR_NUMBER';
import { PR_PRERELEASE_TYPE } from '@/utils/constants/PR_PRERELEASE_TYPE';
import { env } from '@/utils/functions/environment/env';

/**
 * The preid used for PR prerelease versions. You can override the default value
 * with the `RELEASE_PR_PRERELEASE_PREID` environment variable.
 *
 * @defaultValue - `${PR_PRERELEASE_TYPE}.${PR_NUMBER}.${COMMIT_SHA_SHORT}.${DATE_HASH}`
 */
export const PR_PRERELEASE_PREID = env('RELEASE_PR_PRERELEASE_PREID') ||
	`${PR_PRERELEASE_TYPE}.${PR_NUMBER}.${COMMIT_SHA_SHORT}.${DATE_HASH}`;
