import type { PluginSpec } from 'semantic-release';
import { isArray } from '@rob.hameetman/type-guards';
import { CHANGELOG_ENABLED } from '@plugins/constants/CHANGELOG_ENABLED';
import { SLACK_ENABLED } from '@plugins/constants/SLACK_ENABLED';
import { streamlineConfig } from '@plugins/functions/streamlineConfig';
import { Branch } from '@utils/types/Branch';

/**
 * This function is used in standardized configs for each plugin configuration to
 * provide abstractions for additional validation of plugin conditions.
 *
 * @typeParam `T` - [Optional] The plugin configuration options included in the
 * array passed to the `plugin()` function. This is inferred from the `options`
 * parameter by default.
 * @typeParam `U` - [Optional] The plugin name and configuration options passed
 * to the `plugin()` function. This is inferred from the `options` parameter by
 * default.
 *
 * @param options - The plugin name and configuration options
 *
 * @returns A streamlined configuration if the plugin is enabled or `null`
 * otherwise.
 */
export const plugin = <
	T extends object = object,
	U extends [string, T] = [string, T]
>(options: U) => {
	const config = streamlineConfig<T, U>(options);
	const hasOptions = isArray(config);
	const name = hasOptions ? config[0] : config;

	const changelogEnabled =
		Branch.isSet()
			? CHANGELOG_ENABLED && !Branch.isPrerelease()
			: CHANGELOG_ENABLED;

	const enabled = ({
		'@semantic-release/commit-analyzer': () => true,
		'@semantic-release/changelog': () => changelogEnabled,
		'@semantic-release/release-notes-generator': () => true,
		'@semantic-release/npm': () => true,
		'semantic-release-npm-deprecate': () => true,
		'@semantic-release/git': () => true,
		'@semantic-release/github': () => true,
		'@semantic-release/exec': () => hasOptions,
		'semantic-release-slack-bot': () => SLACK_ENABLED,
	}[name] ?? (() => true))();

	if (hasOptions) {
		({
			'@semantic-release/git': () => {
				if (!changelogEnabled && (config[1]['assets'] as Array<string>)?.includes('CHANGELOG.md')) {
					config[1]['assets'] = (config[1]['assets'] as Array<string>).filter((asset: string) => asset !== 'CHANGELOG.md');
				}
			},
		}[name] ?? (() => {}))();
	}

	return enabled
		? config as PluginSpec
		: null;
};
