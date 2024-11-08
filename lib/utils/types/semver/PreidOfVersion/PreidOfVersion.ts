import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { VersionMatchGroup } from '@/utils/enums/VersionMatchGroup';
import { SEMVER_REGEX } from '@/utils/regex/SEMVER_REGEX';

/**
 * Infer the preid of a semantic version string for a PR prerelease version with
 * build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PreidOfPrPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${infer U}.${infer V}.${infer W}.${infer X}.${infer Y}+${string}`
		? `${U}.${V}.${W}.${X}.${Y}`
		: undefined;

/**
 * Infer the preid of a semantic version string for a PR prerelease version
 * without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PreidOfPrPrerelease<T extends string> =
	T extends `${number}.${number}.${number}-${infer U}.${infer V}.${infer W}.${infer X}.${infer Y}`
		? `${U}.${V}.${W}.${X}.${Y}`
		: undefined;

/**
 * Infer the preid of a semantic version string for a prerelease version with
 * build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PreidOfPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${infer C}+${string}`
		? C
		: undefined;

/**
 * Infer the preid of a semantic version string for a prerelease version without
 * build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type PreidOfPrerelease<T extends string> =
	T extends `${number}.${number}.${number}-${infer C}`
		? C
		: undefined;

/**
 * Represents the preid of a semantic version string for prerelease versions.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const preid: PreidOfVersion<'1.3.5-alpha.7'> = 'alpha.7';
 *
 * // Error: Type '"6"' is not assignable to type 'PreidOfVersion<"1.3.5-alpha.7">'.
 * const preid: PreidOfVersion<'1.3.5-alpha.7'> = '7';
 * ```
 */
export type PreidOfVersion<T extends string> =
	| PreidOfPrPrereleaseWithBuild<T>
	| PreidOfPrPrerelease<T>
	| PreidOfPrereleaseWithBuild<T>
	| PreidOfPrerelease<T>;

/**
 * Checks that an `unknown` value is a {@link PreidOfVersion<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link PreidOfVersion<T>}.
 */
export const isPreidOfVersion = <T extends string>(
	value: unknown,
	version?: string,
): value is PreidOfVersion<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroup.preid)
		: true);
