import { env } from '@/utils/functions/environment/env';

export const DEFAULT_VERSION_COMMIT_MESSAGE = 'Update package.json to new version';

/**
 * The default message for the version update commit. This is the content of the
 * message itself, not the subject. You can override the default value with the
 * `RELEASE_COMMIT_MESSAGE` environment variable.
 *
 * @defaultValue - `'Update package.json to new version'`
 */
export const VERSION_COMMIT_MESSAGE =
	env('RELEASE_COMMIT_MESSAGE') || DEFAULT_VERSION_COMMIT_MESSAGE;
