import { isBoolean, isObject, isString, isNull } from '@rob.hameetman/type-guards';

/**
 * Represents a value of an environment variable.
 */
export interface ReleaseRule extends Record<string, unknown> {
	readonly release: string | boolean;
	readonly scope?: string;
	readonly subject?: string;
	readonly type?: string;
};

/**
 * Checks that an `unknown` value is a {@link ReleaseRule}.
 *
 * Requirements:
 *   - `value` must be a string or undefined.
 *   - `value.release` is required and must be a string or boolean.
 *   - `value.scope` is optional and must be a string or `null` if provided.
 *   - `value.subject` is optional and must be a string or `null` if provided.
 *   - `value.type` is optional and must be a string or `null` if provided.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link ReleaseRule}.
 */
export const isReleaseRule = (value: unknown): value is ReleaseRule =>
	/**
	 * value
	 */
	isObject(value) &&
	/**
	 * value.release
	 */
	'release' in value &&
	(isString(value.release) || isBoolean(value.release)) &&
	/**
	 * value.scope
	 */
	('scope' in value
		? (isString(value.scope) || isNull(value.scope))
		: true) &&
	/**
	 * value.subject
	 */
	('subject' in value
		? (isString(value.subject) || isNull(value.subject))
		: true) &&
	/**
	 * value.type
	 */
	('type' in value
		? (isString(value.type) || isNull(value.type))
		: true);
