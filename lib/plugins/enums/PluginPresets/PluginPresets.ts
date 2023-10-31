import { isString } from '@rob.hameetman/type-guards';

export enum PluginPresets {
	angular = 'angular',
	atom = 'atom',
	codemirror = 'codemirror',
	ember = 'ember',
	eslint = 'eslint',
	express = 'express',
	jquery = 'jquery',
	jshint = 'jshint',
	conventionalcommits = 'conventionalcommits',
	default = conventionalcommits,
}

export type PluginPreset = `${PluginPresets}`;

export const RELEASE_STRATEGIES = Object.freeze(
	Array.from(new Set(Object.values<PluginPreset>(PluginPresets))),
);

export const isPluginPreset = (value: unknown): value is PluginPreset =>
	isString(value) && (RELEASE_STRATEGIES as ReadonlyArray<string>).includes(value);
