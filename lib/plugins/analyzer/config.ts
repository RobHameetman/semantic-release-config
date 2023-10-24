import type { PluginSpec } from 'semantic-release';
import { releaseRules as defaultReleaseRules } from '@rules/index';
import { PluginPresets, PluginPreset } from '@utils/enums/PluginPresets';
import { env } from '@utils/functions/env';

/**
 * Destructured arguments provided to the {@link analyzeCommits()} function.
 */
export interface AnalyzeCommitsInput {
	/**
	 * The shell command to execute during the analyze commits step.
	 * @defaultValue - `'conventionalcommits'`
	 */
	readonly preset?: PluginPreset;


	/**
	 * Release rules are used when deciding if the commits since the last release
	 * warrant a new release.
	 * @defaultValue - {@link defaultReleaseRules}
	 */
	readonly releaseRules?: typeof defaultReleaseRules;
}

/**
 * Analyze commits to determine the proper release version.
 *
 * @param input - A {@link AnalyzeCommitsInput} object used for destructuring.
 *
 * @returns A configuration for the `@semantic-release/commit-analyzer` plugin.
 */
export const analyzeCommits = ({
	preset = env('RELEASE_PLUGIN_PRESET') || PluginPresets.default,
	releaseRules = defaultReleaseRules,
}: AnalyzeCommitsInput = {}) => ([
	'@semantic-release/commit-analyzer', {
		preset,
		releaseRules,
	},
] as PluginSpec);
