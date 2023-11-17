import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { VersionMatchGroupNames } from '@utils/enums/VersionMatchGroupNames';
import { SEMVER_REGEX } from '@utils/regex/SEMVER_REGEX';

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
 * const build: BuildOf<'1.3.5-pr.2.abcd1234.20131111.7+build.34'> = 'build.34';
 *
 * // Error: Type '"34"' is not assignable to type 'BuildOf<"1.3.5-pr.2.abcd1234.20131111.7+build.34">'.
 * const build: BuildOf<'1.3.5-pr.2.abcd1234.20131111.7+build.34'> = '34';
 * ```
 */
export type BuildOf<T extends string> =
	| BuildOfPrPrereleaseWithBuild<T>
	| BuildOfPrereleaseWithBuild<T>
	| BuildOfReleaseWithBuild<T>;

/**
 * Checks that an `unknown` value is a {@link BuildOf<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link BuildOf<T>}.
 */
export const isBuildOf = <T extends string>(
	value: unknown,
	version?: string,
): value is BuildOf<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroupNames.build)
		: true);
