import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { VersionMatchGroupNames } from '@utils/enums/VersionMatchGroupNames';
import { SEMVER_REGEX } from '@utils/regex/SEMVER_REGEX';

/**
 * Infer the build metadata of a semantic version string for a PR prerelease
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type DateOfPrPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${number}.${string}.${infer U}.${number}+${string}`
		? U
		: undefined;

/**
 * Infer the build metadata of a semantic version string for a PR prerelease
 * version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type DateOfPrPrerelease<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${number}.${string}.${infer U}.${number}`
		? U
		: undefined;

/**
 * Represents the date hash of a semantic version string for a PR prerelease.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const date: DateOf<'1.3.5-pr.2.abcd1234.20131111.7'> = '20131111';
 *
 * // Error: Type '"abcd1234"' is not assignable to type 'DateOf<"1.3.5-pr.2.abcd1234.20131111.7">'.
 * const date: DateOf<'1.3.5-pr.2.abcd1234.20131111.7'> = 'abcd1234';
 * ```
 */
export type DateOf<T extends string> =
	| DateOfPrPrereleaseWithBuild<T>
	| DateOfPrPrerelease<T>;

/**
 * Checks that an `unknown` value is a {@link DateOf<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link DateOf<T>}.
 */
export const isDateOf = <T extends string>(
	value: unknown,
	version?: string,
): value is DateOf<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroupNames.date)
		: true);
