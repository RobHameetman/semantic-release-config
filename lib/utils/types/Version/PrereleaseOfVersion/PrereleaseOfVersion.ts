import { isString, isUndefined } from '@rob.hameetman/type-guards';
import { VersionMatchGroupNames } from '@utils/enums/VersionMatchGroupNames';
import { SEMVER_REGEX } from '@utils/regex/SEMVER_REGEX';

/**
 * Infer the prerelease version number of a semantic version string for a PR
 * prerelease version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type TypeOfPrPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${number}.${string}.${number}.${infer U}+${string}`
		? U
		: undefined;

/**
 * Infer the prerelease version number of a semantic version string for a PR
 * prerelease version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type TypeOfPrPrerelease<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${number}.${string}.${number}.${infer U}`
		? U
		: undefined;

/**
 * Infer the prerelease version number of a semantic version string for a
 * prerelease version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type TypeOfPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${infer U}+${string}`
		? U
		: undefined;

/**
 * Infer the prerelease version number of a semantic version string for a
 * prerelease version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type TypeOfPrerelease<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${infer U}`
		? U
		: undefined;

/**
 * Represents the prerelease version number of a semantic version string for
 * prerelease versions.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const prerelease: PrereleaseOfVersion<'1.3.5-alpha.7'> = '7';
 *
 * // Error: Type '"6"' is not assignable to type 'PrereleaseOfVersion<"1.3.5-alpha.7">'.
 * const prerelease: PrereleaseOfVersion<'1.3.5-alpha.7'> = '6';
 * ```
 */
export type PrereleaseOfVersion<T extends string> =
	| TypeOfPrPrereleaseWithBuild<T>
	| TypeOfPrPrerelease<T>
	| TypeOfPrereleaseWithBuild<T>
	| TypeOfPrerelease<T>;

/**
 * Checks that an `unknown` value is a {@link PrereleaseOfVersion<T>}.
 *
 * Requirements:
 *   - `value` must be a numerical string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link PrereleaseOfVersion<T>}.
 */
export const isPrereleaseOfVersion = <T extends string>(
	value: unknown,
	version?: string,
): value is PrereleaseOfVersion<T> =>
	/**
	 * value
	 */
	((isString(value) && !isNaN(Number(value))) || isUndefined(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroupNames.prerelease)
		: true);
