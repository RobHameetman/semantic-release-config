import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { COMMIT_REGEX } from '@/utils/regex/COMMIT_REGEX';

/**
 * Infer the type of a conventional commit messages with a type and scope.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 */
type TypeOfCommitWithTypeAndScope<T extends string> =
	T extends `${infer U}(${string}): ${string}`
		? U
		: undefined;

/**
 * Infer the type of a conventional commit messages with a type and no scope.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 */
type TypeOfCommitWithType<T extends string> =
	T extends `${infer U}: ${string}`
		? U
		: undefined;

/**
 * Represents the type of a conventional commit message.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 *
 * @example
 * ```TypeScript
 * const type: TypeOf<'feat(auth): Refresh expired tokens automatically [PROJ-1234]'> = 'feat';
 *
 * // Error: Type '"auth"' is not assignable to type 'TypeOf<"feat(auth): Refresh expired tokens automatically [PROJ-1234]">'.
 * const type: TypeOf<'feat(auth): Refresh expired tokens automatically [PROJ-1234]'> = 'auth';
 * ```
 */
export type TypeOfCommit<T extends string> =
	| TypeOfCommitWithTypeAndScope<T>
	| TypeOfCommitWithType<T>;

/**
 * Checks that an `unknown` value is a {@link TypeOfCommit<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link TypeOfCommit<T>}.
 */
export const isTypeOfCommit = <T extends string>(
	value: unknown,
	version?: string,
): value is TypeOfCommit<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? (value === version.match(COMMIT_REGEX)?.groups?.type)
		: true);
