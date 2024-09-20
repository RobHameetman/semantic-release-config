import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { VersionMatchGroup } from '@/utils/enums/VersionMatchGroup';
import { SEMVER_REGEX } from '@/utils/regex/SEMVER_REGEX';

/**
 * Infer the build metadata of a semantic version string for a PR prerelease
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type BuildOfPrPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${number}.${string}.${number}.${number}+${infer U}`
		? U
		: undefined;

/**
 * Infer the build metadata of a semantic version string for a prerelease
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type BuildOfPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${string}.${number}+${infer U}`
		? U
		: undefined;

		/**
 * Infer the build metadata of a semantic version string for a prerelease
 * version with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type BuildOfReleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}+${infer U}`
		? U
		: undefined;

/**
 * Represents the build metadata of a semantic version string.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const build: BuildOfVersion<'1.3.5-pr.2.abcd1234.20131111.7+build.34'> = 'build.34';
 *
 * // Error: Type '"34"' is not assignable to type 'BuildOfVersion<"1.3.5-pr.2.abcd1234.20131111.7+build.34">'.
 * const build: BuildOfVersion<'1.3.5-pr.2.abcd1234.20131111.7+build.34'> = '34';
 * ```
 */
export type BuildOfVersion<T extends string> =
	| BuildOfPrPrereleaseWithBuild<T>
	| BuildOfPrereleaseWithBuild<T>
	| BuildOfReleaseWithBuild<T>;

/**
 * Checks that an `unknown` value is a {@link BuildOfVersion<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link BuildOfVersion<T>}.
 */
export const isBuildOfVersion = <T extends string>(
	value: unknown,
	version?: string,
): value is BuildOfVersion<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroup.build)
		: true);
