import { isEnumKey } from '@rob.hameetman/type-guards';
import type { PR_PRERELEASE_STRATEGY } from '@/utils/constants/PR_PRERELEASE_STRATEGY';

/**
 * Various strategies for generating a pre-release identifier. These are used as
 * the value of the `RELEASE_PR_PRERELEASE_STRATEGY` environment variable.
 */
export enum PrPrereleaseStrategy {
	/**
	 * Uses the branch name as the prerelease identifier by default.
	 *
	 * @example
	 * `1.0.0-ex-1234.1`
	 * `1.6.8-hotfix-buy-now-button.7`
	 */
	branch,

	/**
	 * Uses the branch name as the prerelease identifier by default.
	 *
	 * @example
	 * `1.0.0-ex-1234.1`
	 * `1.6.8-hotfix-buy-now-button.7`
	 */
	['branch.date'],

	/**
	 * Uses the short commit hash as the prerelease identifier by default.
	 */
	commit,

	/**
	 * Uses the entire commit hash as the prerelease identifier by default.
	 */
	commitfull,

	/**
	 * Uses the date hash as the prerelease identifier by default.
	 */
	date,

	/**
	 * Uses the datetime hash as the prerelease identifier by default.
	 */
	datetime,

	/**
	 * Uses the PR number as the prerelease identifier by default.
	 */
	default,

	/**
	 * Uses the PR number and a date hash as the prerelease identifier by default.
	 */
	['default.date'],
}

/**
 * An array of all {@link PrPrereleaseStrategy} values.
 */
export const PR_PRERELEASE_STRATEGIES = Object.freeze(
	Object.keys(PrPrereleaseStrategy).filter<PR_PRERELEASE_STRATEGY>(isEnumKey),
);
