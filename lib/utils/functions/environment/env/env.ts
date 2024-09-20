import { getEnvValue } from '@/utils/functions/environment/getEnvValue';
import { EnvValue } from '@/utils/types/misc/EnvValue';

/**
 * A callback function to transform the value of the environment variable.
 *
 * @typeParam T - [Optional] The type of the value returned by the callback.
 * This is reverse inferred from the return type of the provided callback so
 * you shouldn't need to specify it.
 */
type Callback<T = unknown> = (value: EnvValue) => T;

/**
 * Reference an environment variable and optionally transform its value.
 *
 * @example
 * ```TypeScript
 * // get the value of process.env.RELEASE_NOTIFICATION_SLACK_CHANNEL
 * env('RELEASE_NOTIFICATION_SLACK_CHANNEL')
 *
 * // determine if process.env.RELEASE_NOTIFICATION_SLACK_CHANNEL is defined
 * env('RELEASE_NOTIFICATION_SLACK_CHANNEL', isEnvDefined)
 *
 * // get the value of process.env.RELEASE_NOTIFICATION_SLACK_CHANNEL or
 * // process.env.SLACK_CHANNEL if the former is not defined
 * env('RELEASE_NOTIFICATION_SLACK_CHANNEL', envOr('SLACK_CHANNEL'))
 * ```
 *
 * @typeParam T - [Optional] The type of the value returned by the callback.
 * This is reverse inferred from the return type of the provided callback so
 * you shouldn't need to specify it.
 *
 * @param envVar - The name of the environment variable to reference.
 * @param cb - [Optional] A callback function to transform the value of the
 * environment variable. Defaults to a callback which returns the unchanged
 * value.
 *
 * @returns The value of the environment variable as returned by the provided
 * callback.
 */
export const env = <T = EnvValue>(
	envVar: string,
	cb = getEnvValue as Callback<T>,
) =>
	cb(process.env[envVar]);
