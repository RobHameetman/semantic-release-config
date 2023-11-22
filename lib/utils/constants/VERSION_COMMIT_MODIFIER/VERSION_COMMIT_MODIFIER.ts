import { env } from '@utils/functions/environment/env';

/**
 * The default message modifier for the version update commit. This is the
 * bracketed pragma in the title which indicates that this commit should be
 * skipped as a release because it's being made by semantic-release. You can
 * override the default value with the `RELEASE_COMMIT_MODIFIER` environment
 * variable.
 *
 * @defaultValue - `'skip ci'`
 */
export const VERSION_COMMIT_MODIFIER =
	env('RELEASE_COMMIT_MODIFIER') || 'skip ci';
