import { isEnvDefined } from '@utils/functions/environment/isEnvDefined';
import type { EnvValue } from '@utils/types/EnvValue';

/**
 * Determine if the value of an environment variable is defined or if the value
 * of one or more alternative environment variables is defined.
 *
 * @example
 * ```TypeScript
 * // Returns true if process.env.RELEASE_EXEC_SHELL is defined and not an empty
 * // string or if process.env.EXEC_SHELL is defined and not an empty string,
 * // otherwise returns false
 * env('RELEASE_EXEC_SHELL', isEnvDefined('EXEC_SHELL'))
 * ```
 *
 * @param value - The value of an environment variable.
 *
 * @returns A boolean which is true if the value is defined and not an empty
 * string or if one or more alternative environment variables are defined and not
 * an empty string.
 */
export const isEnvDefinedOr = (altEnvName: string | ReadonlyArray<string>) =>
	(value: EnvValue) =>
	isEnvDefined(value) ||
		(altEnvName instanceof Array
			? altEnvName.some((name) => isEnvDefined(process.env[name]))
			: isEnvDefined(process.env[altEnvName]));
