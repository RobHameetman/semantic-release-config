
/**
 * Various strategies for generating a pre-release identifier. These are used as
 * the value of the `RELEASE_PR_PRERELEASE_STRATEGY` environment variable.
 */
export enum PrPrereleaseLabel {
	branch = 'branch',
	commit = 'commit',
	date = 'date',
	default = 'pr',
	omit = '',
};

/**
 * An array of all {@link PrPrereleaseLabel} values.
 */
export const PR_PRERELEASE_LABELS = Object.freeze(
	Object.values<`${PrPrereleaseLabel}`>(PrPrereleaseLabel).filter(Boolean),
);
