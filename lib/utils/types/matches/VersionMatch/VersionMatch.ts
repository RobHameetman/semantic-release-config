import { isArray, isString } from '@rob.hameetman/type-guards';
import { VersionMatchGroupNames } from '@utils/enums/VersionMatchGroupNames';
import { BuildOfVersion, isBuildOfVersion } from '@utils/types/semver/BuildOfVersion';
import { CommitOfVersion, isCommitOfVersion } from '@utils/types/semver/CommitOfVersion';
import { DateOfVersion, isDateOfVersion } from '@utils/types/semver/DateOfVersion';
import { MajorOfVersion, isMajorOfVersion } from '@utils/types/semver/MajorOfVersion';
import { MinorOfVersion, isMinorOfVersion } from '@utils/types/semver/MinorOfVersion';
import { PatchOfVersion, isPatchOfVersion } from '@utils/types/semver/PatchOfVersion';
import { PreidOfVersion, isPreidOfVersion } from '@utils/types/semver/PreidOfVersion';
import { PrOfVersion, isPrOfVersion } from '@utils/types/semver/PrOfVersion';
import { TypeOfVersion, isTypeOfVersion } from '@utils/types/semver/TypeOfVersion';
import { PrereleaseOfVersion, isPrereleaseOfVersion } from '@utils/types/semver/PrereleaseOfVersion';
import { VersionMatchGroups, isVersionMatchGroups } from '@utils/types/matches/VersionMatchGroups';

/**
 * Represents a {@link RegExpMatch} array for a semantic version string.
 *
 * @typeParam `T` - A semantic version string literal type.
 */
export type VersionMatch<T extends string> =
	RegExpMatchArray &
	[
		T,
		MajorOfVersion<T>,
		MinorOfVersion<T>,
		PatchOfVersion<T>,
		PreidOfVersion<T>,
		TypeOfVersion<T>,
		PrOfVersion<T>,
		CommitOfVersion<T>,
		DateOfVersion<T>,
		PrereleaseOfVersion<T>,
		BuildOfVersion<T>,
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
	isMajorOfVersion(value.at(VersionMatchGroupNames.major), version) &&
	isMinorOfVersion(value.at(VersionMatchGroupNames.minor), version) &&
	isPatchOfVersion(value.at(VersionMatchGroupNames.patch), version) &&
	isPreidOfVersion(value.at(VersionMatchGroupNames.preid), version) &&
	isTypeOfVersion(value.at(VersionMatchGroupNames.type), version) &&
	isPrOfVersion(value.at(VersionMatchGroupNames.pr), version) &&
	isCommitOfVersion(value.at(VersionMatchGroupNames.commit), version) &&
	isDateOfVersion(value.at(VersionMatchGroupNames.date), version) &&
	isPrereleaseOfVersion(value.at(VersionMatchGroupNames.prerelease), version) &&
	isBuildOfVersion(value.at(VersionMatchGroupNames.build), version) &&
	/**
	 * value.groups
	 */
	'groups' in value &&
	isVersionMatchGroups(value.groups, version);
