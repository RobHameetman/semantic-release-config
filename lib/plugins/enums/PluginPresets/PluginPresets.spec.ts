import { isPluginPreset } from './PluginPresets';

describe('isPluginPreset()', () => {
	it('should return true given the string value "angular"', () => {
		expect(isPluginPreset('angular')).toBe(true);
	});

	it('should return true given the string value "atom"', () => {
		expect(isPluginPreset('atom')).toBe(true);
	});

	it('should return true given the string value "codemirror"', () => {
		expect(isPluginPreset('codemirror')).toBe(true);
	});

	it('should return true given the string value "ember"', () => {
		expect(isPluginPreset('ember')).toBe(true);
	});

	it('should return true given the string value "eslint"', () => {
		expect(isPluginPreset('eslint')).toBe(true);
	});

	it('should return true given the string value "express"', () => {
		expect(isPluginPreset('express')).toBe(true);
	});

	it('should return true given the string value "jquery"', () => {
		expect(isPluginPreset('jquery')).toBe(true);
	});

	it('should return true given the string value "jshint"', () => {
		expect(isPluginPreset('jshint')).toBe(true);
	});

	it('should return true given the string value "conventionalcommits"', () => {
		expect(isPluginPreset('conventionalcommits')).toBe(true);
	});

	it('should return false given an empty string', () => {
		expect(isPluginPreset('')).toBe(false);
	});
});

