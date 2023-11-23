import { isObject } from '@rob.hameetman/type-guards';
import { CommitMatchGroupName } from '@utils/enums/CommitMatchGroupNames';
import { ScopeOfCommit, isScopeOfCommit } from '@utils/types/commit/ScopeOfCommit';
import { SubjectOfCommit, isSubjectOfCommit } from '@utils/types/commit/SubjectOfCommit';
import { TypeOfCommit, isTypeOfCommit } from '@utils/types/commit/TypeOfCommit';

/**
 * A type alias used to avoid a break on line `29`.
 */
type Groups = Readonly<Record<CommitMatchGroupName, unknown>>;

/**
 * A conventional commit message by capturing group in key/value pairs. This is
 * the type used by `CommitMatch['groups']`. This interface extends a `Record`
 * with {@link CommitMatchGroupName} strings as keys and `string | undefined`
 * values and defines specific types for each key.
 *
 * @example
 * ```TypeScript
 * const groups: CommitMatchGroups = {
 *   type: 'feat',
 *   scope: 'auth',
 *   subject: 'Refresh expired tokens automatically [PROJ-1234]',
 * };
 * ```
 *
 * @typeParam `T` - A conventional commit message string literal type.
 */
export interface CommitMatchGroups<T extends string> extends Groups {
	readonly type: TypeOfCommit<T>;
	readonly scope: ScopeOfCommit<T>;
	readonly subject: SubjectOfCommit<T>;
}

/**
 * Checks that an `unknown` value is a {@link CommitMatchGroups}.
 *
 * Requirements:
 *   - `value` must be an object.
 *   - `value.type` is required and must be a string or `undefined`.
 *   - `value.scope` is required and must be a string or `undefined`.
 *   - `value.subject` is required and must be a string.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A conventional commit message to check against.
 *
 * @returns The determination that `value` is or is not a {@link CommitMatchGroups}.
 */
export const isCommitMatchGroups = <T extends string>(
	value: unknown,
	version?: string,
): value is CommitMatchGroups<T> =>
	/**
	 * value
	 */
	isObject(value) &&
	/**
	 * value.type
	 */
	'type' in value &&
	isTypeOfCommit(value.type, version) &&
	/**
	 * value.scope
	 */
	'scope' in value &&
	isScopeOfCommit(value.scope, version) &&
	/**
	 * value.subject
	 */
	'subject' in value &&
	isSubjectOfCommit(value.subject, version);
