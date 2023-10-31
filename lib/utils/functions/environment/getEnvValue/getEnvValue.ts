import type { EnvValue } from '@utils/types/EnvValue';

/**
 * Get the value of an environment variable. This is the default callback used
 * by the `env()` functions if no callback is provided so you shouldn't need to
 * use it directly.
 *
 * @example
 * ```TypeScript
 * // Uses getEnvValue() to return the value of process.env.RELEASE_EXEC_SHELL
 * env('RELEASE_EXEC_SHELL')
 * ```
 *
 * @param value - The value to check.
 *
 * @returns The original value.
 */
export const getEnvValue = (value: EnvValue) => value;
