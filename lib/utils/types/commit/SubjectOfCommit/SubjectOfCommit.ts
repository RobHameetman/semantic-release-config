import { isNonEmptyString } from '@rob.hameetman/type-guards';
import { COMMIT_REGEX } from '@utils/regex/COMMIT_REGEX';

/**
 * Infer the subject of a conventional commit messages with a type and scope.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 */
type SubjectOfCommitWithTypeAndScope<T extends string> =
	T extends `${string}(${string}): ${infer U}`
		? U
		: never;

/**
 * Infer the subject of a conventional commit messages with a type and no scope.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 */
type SubjectOfCommitWithType<T extends string> =
	T extends `${string}: ${infer U}`
		? U
		: never;

/**
 * Infer the subject of a conventional commit messages with a scope and no type.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 */
type SubjectOfCommitWithScope<T extends string> =
	T extends `(${string}): ${infer U}`
		? U
		: never;

/**
 * Infer the subject of a conventional commit messages with no type or scope.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 */
type SubjectOfAnyCommit<T extends string> =
	T extends `${infer U}`
		? U
		: never;

/**
 * Represents the subject of a conventional commit message.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 *
 * @example
 * ```TypeScript
 * const subject: SubjectOf<'feat: Refresh auth tokens automatically [PROJ-1234]'> = 'Refresh auth tokens automatically [PROJ-1234]';
 *
 * // Error: Type '"feat"' is not assignable to type 'SubjectOf<"feat: Refresh auth tokens automatically [PROJ-1234]">'.
 * const subject: SubjectOf<'feat: Refresh auth tokens automatically [PROJ-1234]'> = 'feat';
 * ```
 */
export type SubjectOfCommit<T extends string> =
	| SubjectOfCommitWithTypeAndScope<T>
	| SubjectOfCommitWithType<T>
	| SubjectOfCommitWithScope<T>
	| SubjectOfAnyCommit<T>;

/**
 * Checks that an `unknown` value is a {@link SubjectOfCommit<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link SubjectOfCommit<T>}.
 */
export const isSubjectOfCommit = <T extends string>(
	value: unknown,
	version?: string,
): value is SubjectOfCommit<T> =>
	/**
	 * value
	 */
	isNonEmptyString(value) &&
	(version
		? (value === version.match(COMMIT_REGEX)?.groups?.subject)
		: true);
