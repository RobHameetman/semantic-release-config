import { isString } from '@rob.hameetman/type-guards';
import { VersionMatchGroup } from '@/utils/enums/VersionMatchGroup';
import { SEMVER_REGEX } from '@/utils/regex/SEMVER_REGEX';

/**
 * Infer the patch version number of a semantic version string for a PR
 * prerelease version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PatchOfPrPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${infer U}-${string}.${number}.${string}.${number}.${number}+${string}`
		? U
		: never;

/**
 * Infer the patch version number of a semantic version string for a PR
 * prerelease version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PatchOfPrPrerelease<T extends string> =
	T extends `${number}.${number}.${infer U}-${string}.${number}.${string}.${number}.${number}`
		? U
		: never;

/**
 * Infer the patch version number of a semantic version string for a prerelease
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PatchOfPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${infer U}-${string}.${number}+${string}`
		? U
		: never;

/**
 * Infer the patch version number of a semantic version string for a prerelease
 * version without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PatchOfPrerelease<T extends string> =
	T extends `${number}.${number}.${infer U}-${string}.${number}`
		? U
		: never;

/**
 * Infer the patch version number of a semantic version string for a release
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PatchOfReleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${infer U}+${string}`
		? U
		: never;

/**
 * Infer the patch version number of a semantic version string for a release
 * version without build metadata.
 */
type PatchOfRelease<T extends string> =
	T extends `${number}.${number}.${infer U}+${string}`
		? U
		: never;

/**
 * Represents the patch version number of a semantic version string.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const patch: PatchOfVersion<'1.3.5-alpha.7'> = '5';
 *
 * // Error: Type '"3"' is not assignable to type '"5"'.
 * const patch: PatchOfVersion<'1.3.5-alpha.7'> = '3';
 * ```
 */
export type PatchOfVersion<T extends string> =
	| PatchOfPrPrereleaseWithBuild<T>
	| PatchOfPrPrerelease<T>
	| PatchOfPrereleaseWithBuild<T>
	| PatchOfPrerelease<T>
	| PatchOfReleaseWithBuild<T>
	| PatchOfRelease<T>;

/**
 * Checks that an `unknown` value is a {@link PatchOfVersion<T>}.
 *
 * Requirements:
 *   - `value` must be a numerical string.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link PatchOfVersion<T>}.
 */
export const isPatchOfVersion = <T extends string>(
	value: unknown,
	version?: string,
): value is PatchOfVersion<T> =>
	/**
	 * value
	 */
	isString(value) &&
	!isNaN(Number(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroup.patch)
		: true);
