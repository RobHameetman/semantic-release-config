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
	custom: template(env('RELEASE_PR_PRERELEASE_CHANNEL')),
	[PrPrereleaseStrategy.branch]: template('${branch}'),
	[PrPrereleaseStrategy['branch.date']]: template('${branch}'),
	[PrPrereleaseStrategy.commit]: template('${branch}'),
	[PrPrereleaseStrategy.commitfull]: template('${branch}'),
	[PrPrereleaseStrategy.date]: template('${date}'),
	[PrPrereleaseStrategy.datetime]: template('${date}'),
	[PrPrereleaseStrategy.default]: template('pr-${pr}'),
	[PrPrereleaseStrategy['default.date']]: template('$pr-${pr}'),
};

/**
 * The dist channel used for PR prerelease versions. You can override the
 * default value with the `RELEASE_PR_PRERELEASE_CHANNEL` environment variable.
 *
 * @defaultValue - `${PR_PRERELEASE_LABEL}-${PR_NUMBER}`
 */
// export const PR_PRERELEASE_CHANNEL = env('RELEASE_PR_PRERELEASE_CHANNEL') || `${PR_PRERELEASE_LABEL}-${PR_NUMBER}`;
export const PR_PRERELEASE_CHANNEL =
	byStrategy['custom'](dictionary) ||
	byStrategy[PrPrereleaseStrategy[PR_PRERELEASE_STRATEGY]](dictionary) ||
	byStrategy[PrPrereleaseStrategy.default](dictionary);
