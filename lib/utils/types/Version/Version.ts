import { VersionMatchGroupNames } from '@utils/enums/VersionMatchGroupNames';
import { SEMVER_REGEX } from '@utils/regex/SEMVER_REGEX';
import { VersionMatch } from '@utils/types/VersionMatch';

/**
 * A semantic version object representing "nextRelease.version" with methods
 * used to determine what type of version (e.g. release, prerelease, PR
 * prerelease, etc) the release will be.
 *
 * @typeParam `T` - A semantic version string literal type. This is inferred
 * from the `value` parameter passed to the constructor.
 *
 * @privateRemarks
 * This class is using `private` keywords in TypeScript rather than JavaScript
 * private identifiers because the latter requires the addition of "target":
 * "es2015" in the tsconfig.json file, which is causing an issue where
 * semantic-release is unable to recognize the standardized configs as modules.
 */
export class Version<T extends string> {
	/**
	 * @private
	 * The semantic version as a match array.
	 */
	private _parsed: VersionMatch<T> | null = null;

	/**
	 * @private
	 * The semantic version as a string.
	 */
	private _value: T;

	/**
	 * The major version number. For example, if the version is `'1.2.4-alpha.8'`,
	 * the major is `'1'`.
	 */
	get major() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.major);
	}

	/**
	 * The minor version number. For example, if the version is `'1.2.4-alpha.8'`,
	 * the minor is `'2'`.
	 */
	get minor() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.minor);
	}

	/**
	 * The patch version number. For example, if the version is `'1.2.4-alpha.8'`,
	 * the patch is `'4'`.
	 */
	get patch() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.patch);
	}

	/**
	 * The version preid. For example, if the version is `'1.2.4-alpha.8'`, the
	 * preid is `'alpha.8'`.
	 */
	get preid() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.preid);
	}

	/**
	 * The prerelease preid type. For example, if the version is
	 * `'1.2.4-alpha.8'`, the prerelease preid type is `'alpha'`.
	 */
	get type() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.type);
	}

	/**
	 * The PR number if available. For example, if the version is
	 * `'1.2.4-pr.10.abcd1234.20131111.8'`, the PR is `'10'`.
	 */
	get pr() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.pr);
	}

	/**
	 * The commit sha if available. For example, if the version is
	 * `'1.2.4-pr.10.abcd1234.20131111.8'`, the commit sha is `'abcd1234'`.
	 */
	get commit() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.commit);
	}

	/**
	 * The date hash if available. For example, if the version is
	 * `'1.2.4-pr.10.abcd1234.20131111.8'`, the date hash is `'20131111'`.
	 */
	get date() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.date);
	}

	/**
	 * The prerelease version number. For example, if the version is
	 * `'1.2.4-alpha.8'`, the prerelease version number is `'8'`.
	 */
	get prerelease() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.prerelease);
	}

	/**
	 * @deprecated
	 * The version build metadata. For example, if the version is
	 * `'1.2.4-alpha.8+build.34'`, the build metadata is `'build.34'`. This is
	 * deprecated because NPM does not support build metadata in semantic versions
	 * so this will always be `undefined`.
	 */
	get build() {
		return (this._parsed ?? []).at(VersionMatchGroupNames.build);
	}

	/**
	 * Instantiate a new {@link Version<T>}. Type `T` will be inferred from the
	 * `value` parameter.
	 *
	 * @example
	 * ```TypeScript
	 * const version = new Version('1.2.4-alpha.8');
	 * ```
	 *
	 * @param value - The semantic version as a string (e.g. `'1.2.4-alpha.8'`).
	 */
	constructor(value: T) {
		this._value = value;

		this._parse();
	}

	/**
	 * Determines whether the version is a release version. If this is true, the
	 * version is not a prerelease version or a PR prerelease version.
	 *
	 * @returns A boolean indicating whether the version is a release version.
	 */
	isRelease = () => {
		return this.preid === undefined &&
			this.prerelease === undefined;
	};

	/**
	 * Determines whether the version is a prerelease version. If this is true,
	 * the version is not a release version or a PR prerelease version.
	 *
	 * @returns A boolean indicating whether the version is a prerelease version.
	 */
	isPrerelease = () => {
		return this.preid !== undefined;
	};

	/**
	 * Determines whether the version is a PR prerelease version. If this is
	 * true, the version is not a release version or a prerelease version.
	 *
	 * @returns A boolean indicating whether the version is a PR prerelease
	 * version.
	 */
	isPrPrerelease = () => {
		return this.preid !== undefined &&
			String(this.preid).startsWith('pr');
	}

	/**
	 * @private
	 * Matches the semantic version against the {@link SEMVER_REGEX} and returns
	 * the {@link VersionMatch<T>} array. This array is used to determine the
	 * version type.
	 *
	 * @param value - [Optional] The semantic version as a string. Defaults to
	 * the value passed to the constructor.
	 *
	 * @returns The {@link VersionMatch<T>} array for the semantic version or null
	 * if the version is not valid.
	 */
	private _match(value = this._value) {
		const result = value.match(SEMVER_REGEX);

		return result === null
			? null
			: Array.from(result) as VersionMatch<T>;
	}

	/**
	 * @private
	 * Parses the semantic version and sets the {@link VersionMatch<T>} array.
	 * This array is used to determine the version type.
	 *
	 * @param value - [Optional] The semantic version as a string. Defaults to
	 * the value passed to the constructor.
	 */
	private _parse = (value = this._value) => {
		this._parsed = this._match(value);
	}
}

/**
 * Checks that an `unknown` value is a {@link Version}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Version}.
 *
 * @typeParam `T` - A semantic version string literal type. This is inferred
 * from the `value` parameter passed to the constructor.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Version}.
 */
export const isVersion = <T extends string>(
	value: unknown
): value is Version<T> =>
	/**
	 * value
	 */
	value instanceof Version;
