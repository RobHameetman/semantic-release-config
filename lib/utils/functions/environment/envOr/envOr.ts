import { isString } from '@rob.hameetman/type-guards';
import { isEnvDefined } from '@utils/functions/environment/isEnvDefined';
import type { EnvValue } from '@utils/types/misc/EnvValue';

/**
 * Use the provided value of an environment variable or try an alternative.
 *
 * @example
 * ```TypeScript
 * env('RELEASE_NOTIFICATION_SLACK_CHANNEL', envOr('SLACK_CHANNEL'))
 * ```
 *
 * @param altEnvName - One or more alternative names of environment variables to
 * try if the provided environment variable is not defined.
 *
 * @returns The value of the provided environment variable or the first
 * alternative environment variable which is defined.
 */
export const envOr = (altEnvName: string | Array<string>) =>
	(value: EnvValue) => value ||
		(isString(altEnvName)
			? process.env[altEnvName]
			: altEnvName.map((envName) => process.env[envName]).find(isEnvDefined));
