import { isString } from '@rob.hameetman/type-guards';

/**
 * Names of groups in conventional commit messages by their index. This means that "type" is
 * 1 because a commit match array like `['fix(docs): Update README [PROJ-1234]', 'fix', 'docs', 'Update README [PROJ-1234]' ]`
 * has the commit type (`'fix'`) at index `1`.
 */
export enum CommitMatchGroup {
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
 * An array of all {@link CommitMatchGroup} values.
 */
export const COMMIT_MATCH_GROUPS = Object.freeze(
	Array.from(new Set(Object.keys(CommitMatchGroup))),
);

/**
 * Checks that an `unknown` value is a {@link CommitMatchGroup}.
 *
 * Requirements:
 *   - `value` must be a non-empty string and must be included as a value of `COMMIT_MATCH_GROUPS`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link CommitMatchGroup}.
 */
export const isCommitMatchGroup = (
	value: unknown,
): value is CommitMatchGroup =>
	/**
	 * value
	 */
	isString(value) &&
	(COMMIT_MATCH_GROUPS as ReadonlyArray<string>).includes(value);
