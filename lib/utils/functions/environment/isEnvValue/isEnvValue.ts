import type { EnvValue } from '@/utils/types/misc/EnvValue';

/**
 * Determine if the value of an environment variable matches the expected value.
 *
 * @example
 * ```TypeScript
 * env('RELEASE_DISABLE_CHANGELOG', isEnvValue('true))
 * ```
 *
 * @param value - The value of an environment variable.
 *
 * @returns A function that determines if the value of an environment variable
 * matches the expected value.
 */
export const isEnvValue =
	(expected: string) =>
		(value: EnvValue) =>
			value === expected;
