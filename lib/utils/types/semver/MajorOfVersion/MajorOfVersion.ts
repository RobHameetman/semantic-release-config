import { isString } from '@rob.hameetman/type-guards';
import { VersionMatchGroup } from '@/utils/enums/VersionMatchGroup';
import { SEMVER_REGEX } from '@/utils/regex/SEMVER_REGEX';

/**
 * Infer the major version number of a semantic version string for a PR
 * prerelease version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MajorOfPrPrereleaseWithBuild<T extends string> =
	T extends `${infer U}.${number}.${number}-${string}.${number}.${string}.${number}.${number}+${string}`
		? U
		: never;

/**
 * Infer the major version number of a semantic version string for a PR
 * prerelease version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MajorOfPrPrerelease<T extends string> =
	T extends `${infer U}.${number}.${number}-${string}.${number}.${string}.${number}.${number}`
		? U
		: never;

/**
 * Infer the major version number of a semantic version string for a prerelease
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MajorOfPrereleaseWithBuild<T extends string> =
	T extends `${infer U}.${number}.${number}-${string}.${number}+${string}`
		? U
		: never;

/**
 * Infer the major version number of a semantic version string for a prerelease
 * version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MajorOfPrerelease<T extends string> =
	T extends `${infer U}.${number}.${number}-${string}.${number}`
		? U
		: never;

/**
 * Infer the major version number of a semantic version string for a release
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MajorOfReleaseWithBuild<T extends string> =
	T extends `${infer U}.${number}.${number}+${string}`
		? U
		: never;

/**
 * Infer the major version number of a semantic version string for a release
 * version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type MajorOfRelease<T extends string> =
	T extends `${infer U}.${number}.${number}+${string}`
		? U
		: never;

/**
 * Represents the major version number of a semantic version string.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const major: MajorOfVersion<'1.3.5-alpha.7'> = '1';
 *
 * // Error: Type '"5"' is not assignable to type '"1"'.
 * const major: MajorOfVersion<'1.3.5-alpha.7'> = '5';
 * ```
 */
export type MajorOfVersion<T extends string> =
	| MajorOfPrPrereleaseWithBuild<T>
	| MajorOfPrPrerelease<T>
	| MajorOfPrereleaseWithBuild<T>
	| MajorOfPrerelease<T>
	| MajorOfReleaseWithBuild<T>
	| MajorOfRelease<T>;

/**
 * Checks that an `unknown` value is a {@link MajorOfVersion<T>}.
 *
 * Requirements:
 *   - `value` must be a numerical string.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link MajorOfVersion<T>}.
 */
export const isMajorOfVersion = <T extends string>(
	value: unknown,
	version?: string,
): value is MajorOfVersion<T> =>
	/**
	 * value
	 */
	isString(value) &&
	!isNaN(Number(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroup.major)
		: true);
