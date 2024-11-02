import { isNonEmptyString, isUndefined } from '@rob.hameetman/type-guards';
import { VersionMatchGroup } from '@/utils/enums/VersionMatchGroup';
import { SEMVER_REGEX } from '@/utils/regex/SEMVER_REGEX';

/**
 * Infer the preid type of a semantic version string for a PR prerelease version
 * with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type TypeOfPrPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${infer U}.${number}.${string}.${number}.${number}+${string}`
		? U
		: undefined;

/**
 * Infer the preid type of a semantic version string for a PR prerelease version
 * without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type TypeOfPrPrerelease<T extends string> =
	T extends `${number}.${number}.${number}-${infer U}.${number}.${string}.${number}.${number}`
		? U
		: undefined;

/**
 * Infer the preid type of a semantic version string for a prerelease version
 * with build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type TypeOfPrereleaseWithBuild<T extends string> =
	T extends `${number}.${number}.${number}-${infer U}.${number}+${string}`
		? U
		: undefined;

/**
 * Infer the preid type of a semantic version string for a prerelease version
 * without build metadata.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
type TypeOfPrerelease<T extends string> =
	T extends `${number}.${number}.${number}-${infer U}.${number}`
		? U
		: undefined;

/**
 * Represents the preid type of a semantic version string for prerelease
 * versions.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @example
 * ```TypeScript
 * const type: TypeOfVersion<'1.3.5-alpha.7'> = 'alpha';
 *
 * // Error: Type '"alpha.7"' is not assignable to type 'TypeOfVersion<"1.3.5-alpha.7">'. Did you mean '"alpha"'?
 * const type: TypeOfVersion<'1.3.5-alpha.7'> = 'alpha.7';
 * ```
 */
export type TypeOfVersion<T extends string> =
	| TypeOfPrPrereleaseWithBuild<T>
	| TypeOfPrPrerelease<T>
	| TypeOfPrereleaseWithBuild<T>
	| TypeOfPrerelease<T>;

/**
 * Checks that an `unknown` value is a {@link TypeOfVersion<T>}.
 *
 * Requirements:
 *   - `value` must be a non-empty string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link TypeOfVersion<T>}.
 */
export const isTypeOfVersion = <T extends string>(
	value: unknown,
	version?: string,
): value is TypeOfVersion<T> =>
	/**
	 * value
	 */
	(isNonEmptyString(value) || isUndefined(value)) &&
	(version
		? value === (version.match(SEMVER_REGEX) ?? []).at(VersionMatchGroup.type)
		: true);
