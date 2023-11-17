import { isArray, isString } from '@rob.hameetman/type-guards';
import { VersionMatchGroupNames } from '@utils/enums/VersionMatchGroupNames';
import { BuildOf, isBuildOf } from '@utils/types/BuildOf';
import { CommitOf, isCommitOf } from '@utils/types/CommitOf';
import { DateOf, isDateOf } from '@utils/types/DateOf';
import { MajorOf, isMajorOf } from '@utils/types/MajorOf';
import { MinorOf, isMinorOf } from '@utils/types/MinorOf';
import { PatchOf, isPatchOf } from '@utils/types/PatchOf';
import { PreidOf, isPreidOf } from '@utils/types/PreidOf';
import { PrOf, isPrOf } from '@utils/types/PrOf';
import { TypeOf, isTypeOf } from '@utils/types/TypeOf';
import { PrereleaseOf, isPrereleaseOf } from '@utils/types/PrereleaseOf';
import { VersionMatchGroups, isVersionMatchGroups } from '@utils/types/VersionMatchGroups';

/**
 * Represents a {@link RegExpMatch} array for a semantic version string.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
export type VersionMatch<T extends string> =
	RegExpMatchArray &
	[
		T,
		MajorOf<T>,
		MinorOf<T>,
		PatchOf<T>,
		PreidOf<T>,
		TypeOf<T>,
		PrOf<T>,
		CommitOf<T>,
		DateOf<T>,
		PrereleaseOf<T>,
		BuildOf<T>,
		index: 0,
		input: T,
		groups: VersionMatchGroups<T>,
	];

/**
 * Checks that an `unknown` value is a {@link VersionMatch<T>}.
 *
 * Requirements:
 *   - `value` must be a string or undefined.
 *
 * @typeParam `T` - A semantic version string literal type.
 *
 * @param value - An `unknown` value.
 * @param version - [Optional] A semantic version string to check against.
 *
 * @returns The determination that `value` is or is not a {@link VersionMatch<T>}.
 */
export const isVersionMatch = <T extends string>(
	value: unknown,
	version?: string,
): value is VersionMatch<T> =>
	/**
	 * value
	 */
	isArray(value) &&
	(version
		? value.at(0) === version
		: isString(value.at(0))) &&
	isMajorOf(value.at(VersionMatchGroupNames.major), version) &&
	isMinorOf(value.at(VersionMatchGroupNames.minor), version) &&
	isPatchOf(value.at(VersionMatchGroupNames.patch), version) &&
	isPreidOf(value.at(VersionMatchGroupNames.preid), version) &&
	isTypeOf(value.at(VersionMatchGroupNames.type), version) &&
	isPrOf(value.at(VersionMatchGroupNames.pr), version) &&
	isCommitOf(value.at(VersionMatchGroupNames.commit), version) &&
	isDateOf(value.at(VersionMatchGroupNames.date), version) &&
	isPrereleaseOf(value.at(VersionMatchGroupNames.prerelease), version) &&
	isBuildOf(value.at(VersionMatchGroupNames.build), version) &&
	/**
	 * value.groups
	 */
	'groups' in value &&
	isVersionMatchGroups(value.groups, version);
