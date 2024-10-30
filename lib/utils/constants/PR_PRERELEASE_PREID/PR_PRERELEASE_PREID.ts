import template from 'lodash/template';
import { COMMIT_SHA } from '@/utils/constants/COMMIT_SHA';
import { COMMIT_SHA_SHORT } from '@/utils/constants/COMMIT_SHA_SHORT';
import { CURRENT_BRANCH } from '@/utils/constants/CURRENT_BRANCH';
import { DATE_HASH } from '@/utils/constants/DATE_HASH';
import { DATETIME_HASH } from '@/utils/constants/DATETIME_HASH';
import { PR_NUMBER } from '@/utils/constants/PR_NUMBER';
import { PR_PRERELEASE_STRATEGY } from '@/utils/constants/PR_PRERELEASE_STRATEGY';
import { PR_PRERELEASE_LABEL } from '@/utils/constants/PR_PRERELEASE_LABEL';
import { PrPrereleaseStrategy } from '@/utils/enums/PrPrereleaseStrategy';
import { env } from '@/utils/functions/environment/env';

const dictionary = {
	label: PR_PRERELEASE_LABEL,
	commitfull: (COMMIT_SHA || '').toLowerCase(),
	commit: (COMMIT_SHA_SHORT || '').toLowerCase(),
	branch: (CURRENT_BRANCH || '').toLowerCase(),
	date: DATE_HASH,
	datetime: DATETIME_HASH,
	pr: PR_NUMBER,
};

/**
 * The strategy used to determine the prerelease version of a branch or pull
 * request.
 */
const byStrategy = {
	/**
	 * Uses a string provided by the `RELEASE_PR_PRERELEASE_PREID` environment
	 * variable as the preid. This allows for a custom preid.
	 *
	 * @example
	 * RELEASE_PR_PRERELEASE_LABEL=ex
	 * RELEASE_PR_PRERELEASE_PREID="${label}--${commitfull}"
	 *
	 * `12.5.9-ex--f73dc97d01d31ca7fad272d80a25b651bab81990.1`
	 */
	custom: template(env('RELEASE_PR_PRERELEASE_PREID')),

	/**
	 * Uses the short commit hash as the preid. This results in a unique preid for
	 * each branch.
	 *
	 * @example
	 * `X.X.X-branch.[CURRENT_BRANCH].X`
	 * `X.X.X-[CURRENT_BRANCH].X`
	 *
	 * `1.0.0-branch.ex-1234.1`
	 * `1.6.8-hotfix-buy-now-button.7`
	 */
	[PrPrereleaseStrategy.branch]: template('${label}${branch}'),

	/**
	 * Uses the short commit hash as the preid. This results in a unique preid for
	 * each branch's first prerelease version of the day; the rightmost version
	 * number will always start at 1.
	 *
	 * @example
	 * `X.X.X-branch.[CURRENT_BRANCH].[DATE_HASH].X`
	 * `X.X.X-[CURRENT_BRANCH].[DATE_HASH].X`
	 *
	 * `1.0.0-branch.ex-1234.20241022.1`
	 * `1.6.8-hotfix-buy-now-button.20240613.7`
	 */
	[PrPrereleaseStrategy['branch.date']]: template('${label}.${branch}.${date}'),

	/**
	 * Uses the short commit hash as the preid. This results in a unique preid for
	 * each prerelease version; the rightmost version number will always be 1.
	 *
	 * @example
	 * `X.X.X-commit.[COMMIT_SHA_SHORT].1`
	 * `X.X.X-[COMMIT_SHA_SHORT].1`
	 *
	 * `1.0.0-commit.f73dc97d.1`
	 * `1.6.8-c8ad9085.1`
	 */
	[PrPrereleaseStrategy.commit]: template('${label}.${commit}'),

	/**
	 * Uses the entire commit hash as the preid. This results in a unique preid
	 * for each prerelease version; the rightmost version number will always be 1.
	 *
	 * @example
	 * `X.X.X-commit.[COMMIT_SHA].1`
	 * `X.X.X-[COMMIT_SHA].1`
	 *
	 * `1.0.0-commit.f73dc97d01d31ca7fad272d80a25b651bab81990.1`
	 * `1.6.8-c8ad90851dbd625442130af3afd36b28885f21ce.1`
	 */
	[PrPrereleaseStrategy.commitfull]: template('${label}.${commitfull}'),

	/**
	 * Uses the date hash as the preid. This results in a unique preid for the
	 * first prerelease version of the day; the rightmost version number will
	 * always start at 1.
	 *
	 * @example
	 * `X.X.X-date.[DATE_HASH].X`
	 * `X.X.X-[DATE_HASH].X`
	 *
	 * `1.0.0-date.20241022.1`
	 * `1.6.8-20240613.4`
	 */
	[PrPrereleaseStrategy.date]: template('${label}.${date}'),

	/**
	 * Uses the datetime hash as the preid. This results in a unique preid for
	 * each prerelease version; the rightmost version number will always be 1.
	 *
	 * @example
	 * `X.X.X-[DATETIME_HASH].1`
	 *
	 * `1.0.0-20241022180246.1`
	 * `1.6.8-20240613000001.1`
	 */
	[PrPrereleaseStrategy.datetime]: template('${label}.${datetime}'),

	/**
	 * Uses the prerelease type and PR number as the preid. This results in
	 *  unique preid for each PR. The default `RELEASE_PR_PRERELEASE_LABEL` is
	 * `'pr'`.
	 *
	 * @example
	 * `X.X.X-[RELEASE_PR_PRERELEASE_LABEL].[PR_NUMBER].X`
	 *
	 * `1.0.0-pr.1022.1`
	 * `1.6.8-pr.613.7`
	 */
	[PrPrereleaseStrategy.default]: template('${label}.${pr}'),

	/**
	 * Uses the prerelease type, PR number, and date hash as the preid. This results in a unique preid for the
	 * first prerelease version of the day; the rightmost version number will
	 * always start at 1. The default `RELEASE_PR_PRERELEASE_LABEL` is
	 * `'pr'`.
	 *
	 * @example
	 * `X.X.X-[RELEASE_PR_PRERELEASE_LABEL].[PR_NUMBER].[DATE_HASH].X`
	 *
	 * `1.0.0-pr.1022.20241022.1`
	 * `1.6.8-pr.613.20240613.7`
	 */
	[PrPrereleaseStrategy['default.date']]: template('${label}.${pr}.${date}'),
};

/**
 * The preid used for PR prerelease versions. You can override the default value
 * with the `RELEASE_PR_PRERELEASE_PREID` environment variable or by setting the
 * `RELEASE_PR_PRERELEASE_STRATEGY` environment variable to one of the following
 * values:
 * - `"commit"`: Uses the short commit hash as the preid
 * - `"datetime"`: Uses the datetime hash as the preid
 * - `"date"`: Uses the date hash as the preid
 * - `"default"`: Uses the prerelease type and PR number as the preid
 * - `"defaultbydate"`: Uses the prerelease type, PR number, and date hash as the preid
 *
 * @defaultValue - `${PR_PRERELEASE_LABEL}.${PR_NUMBER}`
 */
export const PR_PRERELEASE_PREID =
	byStrategy['custom'](dictionary) ||
	byStrategy[PrPrereleaseStrategy[PR_PRERELEASE_STRATEGY]](dictionary) ||
	byStrategy[PrPrereleaseStrategy.default](dictionary);
