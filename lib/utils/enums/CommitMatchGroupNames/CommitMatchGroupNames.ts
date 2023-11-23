import { isString } from '@rob.hameetman/type-guards';

/**
 * Names of groups in conventional commit messages by their index. This means that "type" is
 * 1 because a commit match array like `['fix(docs): Update README [PROJ-1234]', 'fix', 'docs', 'Update README [PROJ-1234]' ]`
 * has the commit type (`'fix'`) at index `1`.
 */
export enum CommitMatchGroupNames {
	/**
	 * @example
	 *                                       index === 1
	 *                                           ↓
	 * ['fix(docs): Update README [PROJ-1234]', 'fix', 'docs', 'Update README [PROJ-1234]' ]
	 */
	type = 1,

	/**
	 * @example
	 *                                              index === 2
	 *                                                  ↓
	 * ['fix(docs): Update README [PROJ-1234]', 'fix', 'docs', 'Update README [PROJ-1234]' ]
	 */
	scope = 2,

	/**
	 * @example
	 *                                                               index === 3
	 *                                                                   ↓
	 * ['fix(docs): Update README [PROJ-1234]', 'fix', 'docs', 'Update README [PROJ-1234]' ]
	 */
	subject = 3,
}

/**
 * Any one of the given commit match group names.
 */
export type CommitMatchGroupName = keyof typeof CommitMatchGroupNames;

/**
 * An array of all {@link CommitMatchGroupName} values.
 */
export const COMMIT_MATCH_GROUPS = Object.freeze(
	Array.from(new Set(Object.keys(CommitMatchGroupNames))),
);

/**
 * Checks that an `unknown` value is a {@link CommitMatchGroupName}.
 *
 * Requirements:
 *   - `value` must be a non-empty string and must be included as a value of `CommitMatchGroupNames`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link CommitMatchGroupName}.
 */
export const isCommitMatchGroupName = (
	value: unknown,
): value is CommitMatchGroupName =>
	/**
	 * value
	 */
	isString(value) &&
	(COMMIT_MATCH_GROUPS as ReadonlyArray<string>).includes(value);
