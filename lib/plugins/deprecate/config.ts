import type { PluginSpec } from 'semantic-release';
import { env } from '@utils/functions/env';

/**
 * Destructured arguments provided to the {@link deprecatePreviousVersions()}
 * function.
 */
export interface DeprecatePreviousVersionsInput {
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
 * @param input - A {@link DeprecatePreviousVersionsInput} object used for destructuring.
 *
 * @returns A configuration for the `@semantic-release/changelog` plugin.
 */
export const deprecatePreviousVersions = ({
	file = env('RELEASE_CHANGELOG_FILE') || './CHANGELOG.md',
	title = env('RELEASE_CHANGELOG_TITLE'),
}: DeprecatePreviousVersionsInput = {}) => ([
	'@semantic-release/changelog', {
		changelogFile: file,
		changelogTitle: title,
	},
] as PluginSpec);
