import { isUndefined } from '@rob.hameetman/type-guards';
import { isEnv } from '@/utils/functions/environment/isEnv';
import type { EnvValue } from '@/utils/types/misc/EnvValue';

/**
 * Determine if the value of an environment variable is defined.
 *
 * @example
 * ```TypeScript
 * // Returns true if process.env.RELEASE_EXEC_SHELL is defined and not an empty
 * // string, otherwise returns false
 * env('RELEASE_EXEC_SHELL', isEnvDefined)
 * ```
 *
 * @param value - The value of an environment variable.
 *
 * @returns A boolean which is true if the value is defined and not an empty
 * string.
 */
export const isEnvDefined = (value: EnvValue) =>
	!isEnv('')(value) && !isUndefined(value);
