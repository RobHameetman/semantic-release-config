import type { PluginSpec } from 'semantic-release';

export const commitUpdatesAndPush = () => ([
	'@semantic-release/git',
	{}
] as PluginSpec);
