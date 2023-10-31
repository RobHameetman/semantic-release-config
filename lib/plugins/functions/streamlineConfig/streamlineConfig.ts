import type { PluginSpec } from 'semantic-release';
import { isUndefined } from '@rob.hameetman/type-guards';

export const streamlineConfig = <T extends object = object, U extends [string, T] = [string, T]>([
	name,
	options,
]: U) => {
	const config = Object.fromEntries(
		Object.entries(options)
			.filter(([_, value]) => !isUndefined(value) && value !== '')
		);

	return (Boolean(Object.keys(config).length)
		? [name, config] as PluginSpec
		: name) as PluginSpec;
};
