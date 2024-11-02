import type { BranchObject } from 'semantic-release';
import { isObject, isString, isNull } from '@rob.hameetman/type-guards';

/**
 * Represents a value of an environment variable.
 */
export interface PrBranchRule extends Omit<BranchObject, 'prerelease' | 'channel'> {
	readonly name: `@(!(${string}))`;
	readonly prerelease: Promise<string>;
	readonly channel: Promise<string>;
};

/**
 * Checks that an `unknown` value is a {@link PrBranchRule}.
 *
 * Requirements:
 *   - `value` must be a string or undefined.
 *   - `value.name` is required and must be a string beginning with "@(!(" and ending with "))".
 *   - `value.prerelease` is required and must be a {@link Promise} which resolves to a string or `undefined`.
 *   - `value.channel` is required and must be a {@link Promise} which resolves to a string or `undefined`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link PrBranchRule}.
 */
export const isPrBranchRule = (value: unknown): value is PrBranchRule =>
	/**
	 * value
	 */
	isObject(value) &&
	/**
	 * value.name
	 */
	'name' in value &&
	(isString(value.name) &&
		value.name.startsWith('@(!(') &&
		value.name.endsWith('))')) &&
	/**
	 * value.prerelease
	 */
	'prerelease' in value &&
	(value.prerelease instanceof Promise) &&
	/**
	 * value.channel
	 */
	'channel' in value &&
	(value.channel instanceof Promise);
