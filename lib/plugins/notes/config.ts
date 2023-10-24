import type { PluginSpec } from 'semantic-release';
import { PluginPresets } from '@utils/enums/PluginPresets';
import { env } from '@utils/functions/env';

export const generateReleaseNotes = (
	preset = env('RELEASE_PLUGIN_PRESET') || PluginPresets.default,
) => ([
	'@semantic-release/release-notes-generator', {
		preset,
	},
] as PluginSpec);
