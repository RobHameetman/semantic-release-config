import { PLUGIN_PRESETS } from './PluginPreset';

describe('PLUGIN_PRESETS', () => {
	it('should include the string value "angular"', () => {
		expect(PLUGIN_PRESETS).toContain('angular');
	});

	it('should include the string value "atom"', () => {
		expect(PLUGIN_PRESETS).toContain('atom');
	});

	it('should include the string value "codemirror"', () => {
		expect(PLUGIN_PRESETS).toContain('codemirror');
	});

	it('should include the string value "ember"', () => {
		expect(PLUGIN_PRESETS).toContain('ember');
	});

	it('should include the string value "eslint"', () => {
		expect(PLUGIN_PRESETS).toContain('eslint');
	});

	it('should include the string value "express"', () => {
		expect(PLUGIN_PRESETS).toContain('express');
	});

	it('should include the string value "jquery"', () => {
		expect(PLUGIN_PRESETS).toContain('jquery');
	});

	it('should include the string value "jshint"', () => {
		expect(PLUGIN_PRESETS).toContain('jshint');
	});

	it('should include the string value "conventionalcommits"', () => {
		expect(PLUGIN_PRESETS).toContain('conventionalcommits');
	});
});

