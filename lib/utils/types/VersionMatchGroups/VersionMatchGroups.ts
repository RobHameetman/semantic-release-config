import { isObject } from '@rob.hameetman/type-guards';
import { VersionMatchGroupName } from '@utils/enums/VersionMatchGroupNames';
import { BuildOf, isBuildOf } from '../BuildOf';
import { MajorOf, isMajorOf } from '../MajorOf';
import { MinorOf, isMinorOf } from '../MinorOf';
import { PatchOf, isPatchOf } from '../PatchOf';
import { PreidOf, isPreidOf } from '../PreidOf';
import { TypeOf, isTypeOf } from '../TypeOf';
import { PrOf, isPrOf } from '../PrOf';
import { CommitOf, isCommitOf } from '../CommitOf';
import { DateOf, isDateOf } from '../DateOf';
import { PrereleaseOf, isPrereleaseOf } from '../PrereleaseOf';

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
	readonly major: MajorOf<T>;
	readonly minor: MinorOf<T>;
	readonly patch: PatchOf<T>;
	readonly preid: PreidOf<T>;
	readonly type: TypeOf<T>;
	readonly pr: PrOf<T>;
	readonly commit: CommitOf<T>;
	readonly date: DateOf<T>;
	readonly prerelease: PrereleaseOf<T>;

	/**
	 * This will always be `undefined` because NPM does not support build metadata
	 * in the version even though it's part of the semantic versioning spec.
	 *
	 * @deprecated
	 */
	readonly build: BuildOf<T>;
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
	isMajorOf(value.major, version) &&
	/**
	 * value.minor
	 */
	'minor' in value &&
	isMinorOf(value.minor, version) &&
	/**
	 * value.patch
	 */
	'patch' in value &&
	isPatchOf(value.patch, version) &&
	/**
	 * value.preid
	 */
	'preid' in value &&
	isPreidOf(value.preid, version) &&
	/**
	 * value.type
	 */
	'type' in value &&
	isTypeOf(value.type, version) &&
	/**
	 * value.pr
	 */
	'pr' in value &&
	isPrOf(value.pr, version) &&
	/**
	 * value.commit
	 */
	'commit' in value &&
	isCommitOf(value.commit, version) &&
	/**
	 * value.date
	 */
	'date' in value &&
	isDateOf(value.date, version) &&
	/**
	 * value.prerelease
	 */
	'prerelease' in value &&
	isPrereleaseOf(value.prerelease, version) &&
	/**
	 * value.build
	 */
	'build' in value &&
	isBuildOf(value.build);
