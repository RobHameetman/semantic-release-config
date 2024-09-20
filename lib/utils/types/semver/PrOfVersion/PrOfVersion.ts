import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { VersionMatchGroup } from '@/utils/enums/VersionMatchGroup';
import { SEMVER_REGEX } from '@/utils/regex/SEMVER_REGEX';

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
 * const pr: PrOfVersion<'1.3.5-pr.2.abcd1234.20131111.7'> = '2';
 *
 * // Error: Type '"7"' is not assignable to type 'PrOfVersion<"1.3.5-pr.2.abcd1234.20131111.7">'.
 * const pr: PrOfVersion<'1.3.5-pr.2.abcd1234.20131111.7'> = '7';
 * ```
 */
export type PrOfVersion<T extends string> =
	| PrOfPrPrereleaseWithBuild<T>
	| PrOfPrPrerelease<T>;

/**
 * Checks that an `unknown` value is a {@link PrOfVersion<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link PrOfVersion<T>}.
 */
export const isPrOfVersion = <T extends string>(
	value: unknown,
	version?: string,
): value is PrOfVersion<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroup.pr)
		: true);
