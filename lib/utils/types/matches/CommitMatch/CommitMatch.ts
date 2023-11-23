import { isArray, isString } from '@rob.hameetman/type-guards';
import { CommitMatchGroupNames } from '@utils/enums/CommitMatchGroupNames';
import { TypeOfCommit, isTypeOfCommit } from '@utils/types/commit/TypeOfCommit';
import { ScopeOfCommit, isScopeOfCommit } from '@utils/types/commit/ScopeOfCommit';
import { SubjectOfCommit, isSubjectOfCommit } from '@utils/types/commit/SubjectOfCommit';
import { CommitMatchGroups, isCommitMatchGroups } from '@utils/types/matches/CommitMatchGroups';

/**
 * Represents a {@link RegExpMatch} array for a semantic version string.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
export type CommitMatch<T extends string> =
	RegExpMatchArray &
	[
		T,
		TypeOfCommit<T>,
		ScopeOfCommit<T>,
		SubjectOfCommit<T>,
		index: 0,
		input: T,
		groups: CommitMatchGroups<T>,
	];

/**
 * Checks that an `unknown` value is a {@link CommitMatch<T>}.
 *
 * Requirements:
 *   - `value` must be a string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link CommitMatch<T>}.
 */
export const isCommitMatch = <T extends string>(
	value: unknown,
	version?: string,
): value is CommitMatch<T> =>
	/**
	 * value
	 */
	isArray(value) &&
	(version
		? value.at(0) === version
		: isString(value.at(0))) &&
	isTypeOfCommit(value.at(CommitMatchGroupNames.type), version) &&
	isScopeOfCommit(value.at(CommitMatchGroupNames.scope), version) &&
	isSubjectOfCommit(value.at(CommitMatchGroupNames.subject), version) &&
	/**
	 * value.groups
	 */
	'groups' in value &&
	isCommitMatchGroups(value.groups, version);
