import { isEnv } from '@/utils/functions/environment/isEnv';

/**
 * Determine if the value of an environment variable is false.
 *
 * @example
 * ```TypeScript
 * env('RELEASE_DISABLE_CHANGELOG', isEnvFalse)
 * ```
 *
 * @param value - The value of an environment variable.
 *
 * @returns A boolean which is `true` if the value is the string "false".
 */
export const isEnvFalse = isEnv('false');
