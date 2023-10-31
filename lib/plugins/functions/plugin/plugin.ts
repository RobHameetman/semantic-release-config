import type { PluginSpec } from 'semantic-release';
import { isArray } from '@rob.hameetman/type-guards';
import { CHANGELOG_ENABLED } from '@plugins/constants/CHANGELOG_ENABLED';
import { SLACK_ENABLED } from '@plugins/constants/SLACK_ENABLED';
import { streamlineConfig } from '@plugins/functions/streamlineConfig';

export const plugin = <T extends object = object, U extends [string, T] = [string, T]>(options: U) => {
	const config = streamlineConfig(options);
	const name = isArray(config) ? config[0] : config;

	const enabled = ({
		'@semantic-release/commit-analyzer': () => true,
		'@semantic-release/changelog': () => CHANGELOG_ENABLED,
		'@semantic-release/release-notes-generator': () => true,
		'@semantic-release/npm': () => true,
		'semantic-release-npm-deprecate': () => true,
		'@semantic-release/git': () => true,
		'@semantic-release/github': () => true,
		'@semantic-release/exec': () => isArray(config),
		'semantic-release-slack-bot': () => SLACK_ENABLED,
	}[name] ?? (() => true))();

	return enabled
		? config as PluginSpec
		: null;
};
