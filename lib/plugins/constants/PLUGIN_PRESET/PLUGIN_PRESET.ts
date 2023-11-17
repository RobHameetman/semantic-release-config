import { PluginPresets } from '@plugins/enums/PluginPresets';
import { env } from '@utils/functions/environment/env';

/**
 * The preset used by commit analyzer and release notes generator plugins. This
 * allows you to change the preset with the `RELEASE_PLUGIN_PRESET` environment
 * variable if you don't want to use the default.
 *
 * @defaultValue {@link PluginPresets.default}
 *
 * @example
 * ```sh
 * # .env file
 * RELEASE_PLUGIN_PRESET=angular
 * ```
 */
export const PLUGIN_PRESET = env('RELEASE_PLUGIN_PRESET') || PluginPresets.default;
