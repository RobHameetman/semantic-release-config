import { isString } from '@rob.hameetman/type-guards';

/**
 * Names of groups in version matches by their index. This means that "major" is
 * 1 because a version match array like `['10.2.3', '10', '2', '3' ]` has the
 * major version number (`'10'`) at index `1`.
 */
export enum VersionMatchGroupNames {
	/**
	 * @example
	 *                           index === 1
	 *                               ↓
	 * ['10.2.3-alpha.9+build.34', '10', '2', '3', 'alpha.9', 'alpha', undefined, undefined, undefined, '9', 'build.34' ]
	 */
	major = 1,

	/**
	 * @example
	 *                                index === 2
	 *                                     ↓
	 * ['10.2.3-alpha.9+build.34', '10', '2', '3', 'alpha.9', 'alpha', undefined, undefined, undefined, '9', 'build.34' ]
	 */
	minor = 2,

	/**
	 * @example
	 *                                    index === 3
	 *                                         ↓
	 * ['10.2.3-alpha.9+build.34', '10', '2', '3', 'alpha.9', 'alpha', undefined, undefined, undefined, '9', 'build.34' ]
	 */
	patch = 3,

	/**
	 * @example
	 *                                             index === 4
	 *                                                 ↓
	 * ['10.2.3-alpha.9+build.34', '10', '2', '3', 'alpha.9', 'alpha', undefined, undefined, undefined, '9', 'build.34' ]
	 */
	preid = 4,

	/**
	 * @example
	 *                                                      index === 5
	 *                                                           ↓
	 * ['10.2.3-alpha.9+build.34', '10', '2', '3', 'alpha.9', 'alpha', undefined, undefined, undefined, '9', 'build.34' ]
	 */
	type = 5,

	/**
	 * @example
	 *                                                                                               index === 6
	 *                                                                                                    ↓
	 * ['10.2.3-pr.13.abcd1234.20131111.9+build.34', '10', '2', '3', 'pr.13.abcd1234.20131111.9', 'pr', '13', 'abcd1234', '20131111', '9', 'build.34' ]
	 */
	pr = 6,

	/**
	 * @example
	 *                                                                                                         index === 7
	 *                                                                                                             ↓
	 * ['10.2.3-pr.13.abcd1234.20131111.9+build.34', '10', '2', '3', 'pr.13.abcd1234.20131111.9', 'pr', '13', 'abcd1234', '20131111', '9', 'build.34' ]
	 */
	commit = 7,

	/**
	 * @example
	 *                                                                                                                   index === 8
	 *                                                                                                                        ↓
	 * ['10.2.3-pr.13.abcd1234.20131111.9+build.34', '10', '2', '3', 'pr.13.abcd1234.20131111.9', 'pr', '13', 'abcd1234', '20131111', '9', 'build.34' ]
	 */
	date = 8,

	/**
	 * @example
	 *                                                                                            index === 9
	 *                                                                                                ↓
	 * ['10.2.3-alpha.9+build.34', '10', '2', '3', 'alpha.9', 'alpha', undefined, undefined, undefined, '9', 'build.34' ]
	 */
	prerelease = 9,

	/**
	 * @example
	 *                                                                                                    index === 10
	 *                                                                                                         ↓
	 * ['10.2.3-alpha.9+build.34', '10', '2', '3', 'alpha.9', 'alpha', undefined, undefined, undefined, '9', 'build.34' ]
	 */
	build = 10,
}

/**
 * Any one of the given version match group names.
 */
export type VersionMatchGroupName = keyof typeof VersionMatchGroupNames;

/**
 * An array of all {@link VersionMatchGroupName} values.
 */
export const VERSION_MATCH_GROUPS = Object.freeze(
	Array.from(new Set(Object.keys(VersionMatchGroupNames))),
);

/**
 * Checks that an `unknown` value is a {@link VersionMatchGroupName}.
 *
 * Requirements:
 *   - `value` must be a non-empty string and must be included as a value of `VersionMatchGroupNames`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link VersionMatchGroupName}.
 */
export const isVersionMatchGroupName = (
	value: unknown,
): value is VersionMatchGroupName =>
	/**
	 * value
	 */
	isString(value) &&
	(VERSION_MATCH_GROUPS as ReadonlyArray<string>).includes(value);
