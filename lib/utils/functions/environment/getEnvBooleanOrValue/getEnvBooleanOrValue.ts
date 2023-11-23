import { isEnvFalse } from '@utils/functions/environment/isEnvFalse';
import { isEnvTrue } from '@utils/functions/environment/isEnvTrue';
import type { EnvValue } from '@utils/types/misc/EnvValue';

/**
 * Determine if an environment variable is true or false, or return the original
 * value.
 *
 * @example
 * ```TypeScript
 * // if process.env.RELEASE_EXEC_SHELL is 'true' or 'false', you'll receive the
 * // boolean true or false respectively, otherwise you'll receive the original
 * // value
 * env('RELEASE_EXEC_SHELL', getEnvBooleanOrValue)
 * ```
 *
 * @param value - The value to check.
 *
 * @returns A boolean true or false mapping to the values 'true' and 'false'
 * respectively, or the original value.
 */
export const getEnvBooleanOrValue = (value: EnvValue) => {
	if (isEnvTrue(value)) {
		return true;
	}

	if (isEnvFalse(value)) {
		return false;
	}

	return value;
};
