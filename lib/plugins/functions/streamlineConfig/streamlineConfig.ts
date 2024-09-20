import type { PluginSpec } from 'semantic-release';
import { isUndefined } from '@rob.hameetman/type-guards';

/**
 * Remove undefined and empty fields from plugin configuration objects.
 *
 * @typeParam `T` - [Optional] The plugin configuration options included in the
 * array passed to the `plugin()` function. This is inferred from the `options`
 * parameter by default.
 * @typeParam `U` - [Optional] The plugin name and configuration options passed
 * to the `plugin()` function. This is inferred from the `options` parameter by
 * default.
 *
 * @param input - The plugin name and configuration options to streamline.
 *
 * @returns The plugin name and configuration options without any undefined or
 * empty values or just the plugin name if there are no configuration options
 * which are not undefined or empty.
 */
export const streamlineConfig = <
	T extends object = object,
	U extends [string, T] = [string, T]
>([
	name,
	options,
]: U) => {
	const config = Object.fromEntries(
		Object.entries(options)
			.filter(([_, value]) => !isUndefined(value) && value !== '')
		) as T;

	return (Boolean(Object.keys(config).length)
		? [name, config]
		: name) as PluginSpec;
};
