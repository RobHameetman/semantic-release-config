import { env } from '@/utils/functions/environment/env';
import { PrPrereleaseStrategy } from '@/utils/enums/PrPrereleaseStrategy';

/**
 * The strategy used to determine the prerelease version of a branch or pull
 * request.
 */
export type PR_PRERELEASE_STRATEGY = keyof typeof PrPrereleaseStrategy;

/**
 * The strategy used to determine the PR prerelease version.
 *
 * @defaultValue - `'default'`
 */
export const PR_PRERELEASE_STRATEGY = (env('RELEASE_PR_PRERELEASE_STRATEGY') || 'default') as PR_PRERELEASE_STRATEGY;
