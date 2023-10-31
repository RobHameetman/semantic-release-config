import { PluginPresets } from '@plugins/enums/PluginPresets';
import { env } from '@utils/functions/environment/env';

export const PLUGIN_PRESET = env('RELEASE_PLUGIN_PRESET') || PluginPresets.default;
