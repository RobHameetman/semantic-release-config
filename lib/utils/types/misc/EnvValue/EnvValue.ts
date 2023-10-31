import { isString, isUndefined, } from '@rob.hameetman/type-guards';

/**
 * Represents a value of an environment variable.
 */
export type EnvValue = string | undefined;

/**
 * Checks that an `unknown` value is a {@link EnvValue}.
 *
 * Requirements:
 *   - `value` must be a string or undefined.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link EnvValue}.
 */
export const isEnvValue = (value: unknown): value is EnvValue =>
	isString(value) ||
	isUndefined(value);
