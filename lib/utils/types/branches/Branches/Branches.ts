import type { BranchObject } from 'semantic-release';
import { isArray, isObject, isString } from '@rob.hameetman/type-guards';
import { PrBranchRule, isPrBranchRule } from '@/utils/types/branches/PrBranchRule';

/**
 * Represents an array of branch objects with an optional PR branch rule at the
 * end.
 */
export type Branches =
	| readonly [...ReadonlyArray<BranchObject>, PrBranchRule]
	| ReadonlyArray<BranchObject>;

/**
 * Checks that an `unknown` value are {@link Branches}.
 *
 * Requirements:
 *   - `value` must be an array of strings or {@link BranchObject}s with an optional PR branch rule at the end.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` are or are not {@link Branches}.
 */
export const areBranches = (value: unknown): value is Branches =>
	/**
	 * value
	 */
	isArray<BranchObject>(value) &&
	value.every(
		(item) => isString(item) ||
		(isObject(item) && 'name' in item && isString(item.name))) &&
	(value.length
		? (isPrBranchRule(value.at(-1)) ||
			(isObject(value.at(-1)) && 'name' in (value.at(-1) as BranchObject) && isString(value.at(-1)?.name)))
		: true);
