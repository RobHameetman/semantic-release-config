import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { VersionMatchGroupNames } from '@utils/enums/VersionMatchGroupNames';
import { SEMVER_REGEX } from '@utils/regex/SEMVER_REGEX';

/**
 * Infer the PR number of a semantic version string for a PR prerelease version
 * with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PrOfPrPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${infer U}.${string}.${number}.${number}+${string}`
		? U
		: undefined;

/**
 * Infer the PR number of a semantic version string for a PR prerelease version
 * without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PrOfPrPrerelease<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${infer U}.${string}.${number}.${number}`
		? U
		: undefined;

/**
 * Represents the PR number of a semantic version string for PR prerelease
 * versions.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const pr: PrOf<'1.3.5-pr.2.abcd1234.20131111.7'> = '2';
 *
 * // Error: Type '"7"' is not assignable to type 'PrOf<"1.3.5-pr.2.abcd1234.20131111.7">'.
 * const pr: PrOf<'1.3.5-pr.2.abcd1234.20131111.7'> = '7';
 * ```
 */
export type PrOf<T extends string> =
	| PrOfPrPrereleaseWithBuild<T>
	| PrOfPrPrerelease<T>;

/**
 * Checks that an `unknown` value is a {@link PrOf<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link PrOf<T>}.
 */
export const isPrOf = <T extends string>(
	value: unknown,
	version?: string,
): value is PrOf<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroupNames.pr)
		: true);
