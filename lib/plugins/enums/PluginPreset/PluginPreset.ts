/**
 * Preset values for semantic-release plugins. The `default` preset is the
 * preset used by this package by default, but can be overridden with the
 * `RELEASE_PLUGIN_PRESET` environment variable.
 *
 * @defaultValue `'conventionalcommits'`
 */
export enum PluginPreset {
	/**
	 * @see https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit
	 */
	angular = 'angular',

	/**
	 * @see https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages
	 */
	atom = 'atom',

	/**
	 * @see https://github.com/codemirror/codemirror5/blob/master/CONTRIBUTING.md#coding-standards
	 */
	codemirror = 'codemirror',

	/**
	 * @see https://github.com/emberjs/ember.js/blob/main/CONTRIBUTING.md
	 */
	ember = 'ember',

	/**
	 * @see https://eslint.org/docs/latest/contribute/pull-requests#step2
	 */
	eslint = 'eslint',

	/**
	 * @see https://standardjs.com/
	 */
	express = 'express',

	/**
	 * @see https://github.com/jquery/contribute.jquery.org/blob/main/pages/commits-and-pull-requests.md#commit-guidelines
	 */
	jquery = 'jquery',

	/**
	 * @see https://github.com/jshint/jshint/blob/main/CONTRIBUTING.md#commit-message-guidelines
	 */
	jshint = 'jshint',

	/**
	 * @see https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.2.0/README.md
	 */
	conventionalcommits = 'conventionalcommits',

	/**
	 * The default preset value used by this package if the
	 * `RELEASE_PLUGIN_PRESET` environment variable is not explicitly defined.
	 */
	default = conventionalcommits,
}

/**
 * An array of all {@link PluginPreset} values.
 */
export const PLUGIN_PRESETS = Object.freeze(
	Array.from(new Set(Object.values<PluginPreset>(PluginPreset))),
);
