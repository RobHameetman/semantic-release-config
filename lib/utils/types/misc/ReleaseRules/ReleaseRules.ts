import { isArray, } from '@rob.hameetman/type-guards';
import { ReleaseRule, isReleaseRule } from '@/utils/types/misc/ReleaseRule';

/**
 * Represents a value of an environment variable.
 */
export type ReleaseRules = ReadonlyArray<ReleaseRule>

/**
 * Checks that an `unknown` value are {@link ReleaseRules}.
 *
 * Requirements:
 *   - `value` must be an array of valid {@link ReleaseRule}s.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` are or are not {@link ReleaseRules}.
 */
export const areReleaseRules = (value: unknown): value is ReleaseRules =>
	/**
	 * value
	 */
	isArray(value) &&
	value.every(isReleaseRule);
