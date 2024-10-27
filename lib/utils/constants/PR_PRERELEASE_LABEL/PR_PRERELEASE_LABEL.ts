import { PR_PRERELEASE_STRATEGY } from '@/utils/constants/PR_PRERELEASE_STRATEGY';
import { PrPrereleaseLabel } from '@/utils/enums/PrPrereleaseLabel';
import { PrPrereleaseStrategy } from '@/utils/enums/PrPrereleaseStrategy';
import { env } from '@/utils/functions/environment/env';

const value = env('RELEASE_PR_PRERELEASE_LABEL');
const label = PrPrereleaseLabel[(value || 'default') as keyof typeof PrPrereleaseLabel];

const isDefault = value !== 'default' && label === PrPrereleaseLabel.default;
const isOmitted = label === '';
const isUnknown = label === undefined;

/**
 * The strategy used to determine the prerelease version of a branch or pull
 * request.
 */
const byStrategy = {
	[PrPrereleaseStrategy.branch]: PrPrereleaseLabel.branch,
	[PrPrereleaseStrategy['branch.date']]: PrPrereleaseLabel.branch,
	[PrPrereleaseStrategy.commit]: PrPrereleaseLabel.commit,
	[PrPrereleaseStrategy.commitfull]: PrPrereleaseLabel.commit,
	[PrPrereleaseStrategy.date]: PrPrereleaseLabel.date,
	[PrPrereleaseStrategy.datetime]: PrPrereleaseLabel.date,
	[PrPrereleaseStrategy.default]: PrPrereleaseLabel.default,
	[PrPrereleaseStrategy['default.date']]: PrPrereleaseLabel.default,
};

/**
 * The preid type used for PR prerelease versions. You can override the default
 * value directly with the `RELEASE_PR_PRERELEASE_LABEL` environment variable or
 * influence the default value by setting the `RELEASE_PR_PRERELEASE_STRATEGY`
 * environment variable to one of the following values:
 * - `"branch"`: Uses the branch name as the prerelease identifier
 * - `"branch.date"`: Uses the branch name and a date hash as the prerelease identifier
 * - `"commit"`: Uses the short commit hash as the prerelease identifier
 * - `"commitfull"`: Uses the entire commit hash as the prerelease identifier
 * - `"date"`: Uses the date hash as the prerelease identifier
 * - `"datetime"`: Uses the datetime hash as the prerelease identifier
 * - `"default"`: Uses the PR number as the prerelease identifier
 * - `"default.date"`: Uses the PR number and a date hash as the prerelease identifier
 *
 * You can also set the `RELEASE_PR_PRERELEASE_LABEL` environment variable to
 * "omit" to remove the prerelease identifier from the version when not using the
 * default strategy.
 */
export const PR_PRERELEASE_LABEL =
	((isOmitted && PR_PRERELEASE_STRATEGY.includes('default')) || (!isOmitted && !isUnknown)) || isDefault
		? byStrategy[PrPrereleaseStrategy[PR_PRERELEASE_STRATEGY]] ||
			byStrategy[PrPrereleaseStrategy.default]
		: isOmitted
			? label
			: value;
