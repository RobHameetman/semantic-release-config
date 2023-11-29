import { isObject } from '@rob.hameetman/type-guards';
import { VersionMatchGroupName } from '@utils/enums/VersionMatchGroupNames';
import { BuildOfVersion, isBuildOfVersion } from '@utils/types/semver/BuildOfVersion';
import { MajorOfVersion, isMajorOfVersion } from '@utils/types/semver/MajorOfVersion';
import { MinorOfVersion, isMinorOfVersion } from '@utils/types/semver/MinorOfVersion';
import { PatchOfVersion, isPatchOfVersion } from '@utils/types/semver/PatchOfVersion';
import { PreidOfVersion, isPreidOfVersion } from '@utils/types/semver/PreidOfVersion';
import { TypeOfVersion, isTypeOfVersion } from '@utils/types/semver/TypeOfVersion';
import { PrOfVersion, isPrOfVersion } from '@utils/types/semver/PrOfVersion';
import { CommitOfVersion, isCommitOfVersion } from '@utils/types/semver/CommitOfVersion';
import { DateOfVersion, isDateOfVersion } from '@utils/types/semver/DateOfVersion';
import { PrereleaseOfVersion, isPrereleaseOfVersion } from '@utils/types/semver/PrereleaseOfVersion';

/**
 * A type alias used to avoid a break on line `33`.
 */
type Groups = Readonly<Record<VersionMatchGroupName, unknown>>;

/**
 * A semantic versioning match by capturing group in key/value pairs. This is
 * the type used by `VersionMatch['groups']`. This interface extends a `Record`
 * with {@link VersionMatchGroupName} strings as keys and `string | undefined`
 * values and defines specific types for each key.
 *
 * @example
 * ```TypeScript
 * const groups: VersionMatchGroups = {
 *   major: '1',
 *   minor: '2',
 *   patch: '3',
 *   preid: 'beta.4',
 *   type: 'beta',
 *   pr: undefined,
 *   commit: undefined,
 *   date: undefined,
 *   prerelease: '4',
 *   build: undefined,
 * };
 * ```
 *
 * @typeParam `T` - A semantic version string literal type.
 */
export interface VersionMatchGroups<T extends string> extends Groups {
	readonly major: MajorOfVersion<T>;
	readonly minor: MinorOfVersion<T>;
	readonly patch: PatchOfVersion<T>;
	readonly preid: PreidOfVersion<T>;
	readonly type: TypeOfVersion<T>;
	readonly pr: PrOfVersion<T>;
	readonly commit: CommitOfVersion<T>;
	readonly date: DateOfVersion<T>;
	readonly prerelease: PrereleaseOfVersion<T>;

	/**
	 * This will always be `undefined` because NPM does not support build metadata
	 * in the version even though it's part of the semantic versioning spec.
	 *
	 * @deprecated
	 */
	readonly build: BuildOfVersion<T>;
}

/**
 * Checks that an `unknown` value is a {@link VersionMatchGroups}.
 *
 * Requirements:
 *   - `value` must be an object.
 *   - `value.major` is required and must be a numerical string.
 *   - `value.minor` is required and must be a numerical string.
 *   - `value.patch` is required and must be a numerical string.
 *   - `value.preid` is required and must be a string or `undefined`.
 *   - `value.type` is required and must be a string or `undefined`.
 *   - `value.pr` is required and must be a numerical string or `undefined`.
 *   - `value.commit` is required and must be a string with 8 alphanumerical characters or `undefined`.
 *   - `value.date` is required and must be a string with 8 numerical characters or `undefined`.
 *   - `value.prerelease` is required and must be a numerical string or `undefined`.
 *   - `value.build` is required and must be `undefined`.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link VersionMatchGroups}.
 */
export const isVersionMatchGroups = <T extends string>(
	value: unknown,
	version?: string,
): value is VersionMatchGroups<T> =>
	/**
	 * value
	 */
	isObject(value) &&
	/**
	 * value.major
	 */
	'major' in value &&
	isMajorOfVersion(value.major, version) &&
	/**
	 * value.minor
	 */
	'minor' in value &&
	isMinorOfVersion(value.minor, version) &&
	/**
	 * value.patch
	 */
	'patch' in value &&
	isPatchOfVersion(value.patch, version) &&
	/**
	 * value.preid
	 */
	'preid' in value &&
	isPreidOfVersion(value.preid, version) &&
	/**
	 * value.type
	 */
	'type' in value &&
	isTypeOfVersion(value.type, version) &&
	/**
	 * value.pr
	 */
	'pr' in value &&
	isPrOfVersion(value.pr, version) &&
	/**
	 * value.commit
	 */
	'commit' in value &&
	isCommitOfVersion(value.commit, version) &&
	/**
	 * value.date
	 */
	'date' in value &&
	isDateOfVersion(value.date, version) &&
	/**
	 * value.prerelease
	 */
	'prerelease' in value &&
	isPrereleaseOfVersion(value.prerelease, version) &&
	/**
	 * value.build
	 */
	'build' in value &&
	isBuildOfVersion(value.build);
