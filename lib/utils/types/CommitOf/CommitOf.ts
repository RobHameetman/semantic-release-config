import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { VersionMatchGroupNames } from '@utils/enums/VersionMatchGroupNames';
import { SEMVER_REGEX } from '@utils/regex/SEMVER_REGEX';

/**
 * Infer the build metadata of a semantic version string for a PR prerelease
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type CommitOfPrPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${number}.${infer U}.${number}.${number}+${string}`
		? U
		: undefined;

/**
 * Infer the build metadata of a semantic version string for a PR prerelease
 * version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type CommitOfPrPrerelease<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${number}.${infer U}.${number}.${number}`
		? U
		: undefined;

/**
 * Represents the commit sha of a semantic version string for a PR prerelease.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const commit: CommitOf<'1.3.5-pr.2.abcd1234.20131111.7'> = 'abcd1234';
 *
 * // Error: Type '"20131111"' is not assignable to type 'CommitOf<"1.3.5-pr.2.abcd1234.20131111.7">'.
 * const commit: CommitOf<'1.3.5-pr.2.abcd1234.20131111.7'> = '20131111';
 * ```
 */
export type CommitOf<T extends string> =
	| CommitOfPrPrereleaseWithBuild<T>
	| CommitOfPrPrerelease<T>;

/**
 * Checks that an `unknown` value is a {@link CommitOf<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link CommitOf<T>}.
 */
export const isCommitOf = <T extends string>(
	value: unknown,
	version?: string,
): value is CommitOf<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroupNames.commit)
		: true);
