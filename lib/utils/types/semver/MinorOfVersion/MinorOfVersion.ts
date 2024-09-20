import { isString } from '@rob.hameetman/type-guards';
import { VersionMatchGroup } from '@/utils/enums/VersionMatchGroup';
import { SEMVER_REGEX } from '@/utils/regex/SEMVER_REGEX';

/**
 * Infer the minor version number of a semantic version string for a PR
 * prerelease version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MinorOfPrPrereleaseWithBuild<T extends string> =
	T extends `${number}.${infer U}.${number}-${string}.${number}.${string}.${number}.${number}+${string}`
		? U
		: never;

/**
 * Infer the minor version number of a semantic version string for a PR
 * prerelease version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MinorOfPrPrerelease<T extends string> =
	T extends `${number}.${infer U}.${number}-${string}.${number}.${string}.${number}.${number}`
		? U
		: never;

/**
 * Infer the minor version number of a semantic version string for a prerelease
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MinorOfPrereleaseWithBuild<T extends string> =
	T extends `${number}.${infer U}.${number}-${string}.${number}+${string}`
		? U
		: never;

/**
 * Infer the minor version number of a semantic version string for a prerelease
 * version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MinorOfPrerelease<T extends string> =
	T extends `${number}.${infer U}.${number}-${string}.${number}`
		? U
		: never;

/**
 * Infer the minor version number of a semantic version string for a release
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MinorOfReleaseWithBuild<T extends string> =
	T extends `${number}.${infer U}.${number}+${string}`
		? U
		: never;

/**
 * Infer the minor version number of a semantic version string for a release
 * version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MinorOfRelease<T extends string> =
	T extends `${number}.${infer U}.${number}+${string}`
		? U
		: never;

/**
 * Represents the minor version number of a semantic version string.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const minor: MinorOfVersion<'1.3.5-alpha.7'> = '3';
 *
 * // Error: Type '"1"' is not assignable to type '"3"'.
 * const minor: MinorOfVersion<'1.3.5-alpha.7'> = '1';
 * ```
 */
export type MinorOfVersion<T extends string> =
	| MinorOfPrPrereleaseWithBuild<T>
	| MinorOfPrPrerelease<T>
	| MinorOfPrereleaseWithBuild<T>
	| MinorOfPrerelease<T>
	| MinorOfReleaseWithBuild<T>
	| MinorOfRelease<T>;

/**
 * Checks that an `unknown` value is a {@link MinorOfVersion<T>}.
 *
 * Requirements:
 *   - `value` must be a numerical string.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link MinorOfVersion<T>}.
 */
export const isMinorOfVersion = <T extends string>(
	value: unknown,
	version?: string,
): value is MinorOfVersion<T> =>
	/**
	 * value
	 */
	isString(value) &&
	!isNaN(Number(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroup.minor)
		: true);
