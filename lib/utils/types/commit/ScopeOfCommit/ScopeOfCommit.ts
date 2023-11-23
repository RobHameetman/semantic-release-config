import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { COMMIT_REGEX } from '@utils/regex/COMMIT_REGEX';

/**
 * Infer the scope of a conventional commit message with a type and scope.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 */
type ScopeOfCommitWithTypeAndScope<T extends string> =
	T extends `${string}(${infer U}): ${string}`
		? U
		: undefined;

/**
 * Infer the scope of a conventional commit messages with a scope and no type.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 */
type ScopeOfCommitWithScope<T extends string> =
	T extends `(${infer U}): ${string}`
		? U
		: undefined;

/**
 * Represents the scope of a conventional commit message.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 *
 * @example
 * ```TypeScript
 * const scope: ScopeOf<'feat(auth): Refresh expired tokens automatically [PROJ-1234]'> = 'auth';
 *
 * // Error: Type '"feat"' is not assignable to type 'ScopeOf<"feat(auth): Refresh expired tokens automatically [PROJ-1234]">'. Did you mean '"alpha"'?
 * const scope: ScopeOf<'feat(auth): Refresh expired tokens automatically [PROJ-1234]'> = 'feat';
 * ```
 */
export type ScopeOfCommit<T extends string> =
	| ScopeOfCommitWithTypeAndScope<T>
	| ScopeOfCommitWithScope<T>;

/**
 * Checks that an `unknown` value is a {@link ScopeOfCommit<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A conventional commit message string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link ScopeOfCommit<T>}.
 */
export const isScopeOfCommit = <T extends string>(
	value: unknown,
	version?: string,
): value is ScopeOfCommit<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? (value === version.match(COMMIT_REGEX)?.groups?.scope)
		: true);
