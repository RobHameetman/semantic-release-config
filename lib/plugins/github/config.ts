import type { PluginSpec } from 'semantic-release';

export const publishGithubRelease = () => ([
	'@semantic-release/github',
	{}
] as PluginSpec);
