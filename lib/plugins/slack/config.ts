import type { PluginSpec } from 'semantic-release';
import { env } from '@utils/functions/env';

/**
 * Destructured arguments provided to the {@link notifySlackChannel()} function.
 */
export interface NotifySlackChannelInput {
	/**
	 * The shell command to execute during the analyze commits step.
	 * @defaultValue - `'./CHANGELOG.md'`
	 */
	readonly file?: string;


	/**
	 * The title of the changelog file (first line of the file).
	 */
	readonly title?: string;
}

/**
 * Create or update a changelog file.
 *
 * @param input - A {@link NotifySlackChannelInput} object used for destructuring.
 *
 * @returns A configuration for the `semantic-release-slack-bot` plugin.
 */
export const notifySlackChannel = ({
	file = env('RELEASE_CHANGELOG_FILE') || './CHANGELOG.md',
	title = env('RELEASE_CHANGELOG_TITLE'),
}: NotifySlackChannelInput = {}) => ([
	'semantic-release-slack-bot', {
		notifyOnSuccess: file,
		changelogTitle: title,
	},
] as PluginSpec);
