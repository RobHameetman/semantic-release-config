import { isEnv } from '@/utils/functions/environment/isEnv';

/**
 * Determine if the value of an environment variable is true.
 *
 * @example
 * ```TypeScript
 * env('RELEASE_DISABLE_CHANGELOG', isEnvTrue)
 * ```
 *
 * @param value - The value of an environment variable.
 *
 * @returns A boolean which is `true` if the value is the string "true".
 */
export const isEnvTrue = isEnv('true');
