import { isString } from '@rob.hameetman/type-guards';
import { PluginPreset } from '@/plugins/enums/PluginPreset';
import { mockEnv } from '@@/utils/mockEnv';

describe('PLUGIN_PRESET', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let PLUGIN_PRESET: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		mockEnv('RELEASE_PLUGIN_PRESET')
			.mockReturnValueOnce('express')
			.mockReturnValueOnce('express')
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ PLUGIN_PRESET } = await import('./PLUGIN_PRESET'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;
	});

	it('should be a string', () => {
		expect(isString(PLUGIN_PRESET)).toBe(true);
	});

	it('should override the default value when the "RELEASE_PLUGIN_PRESET" environment variable is defined', () => {
		expect(PLUGIN_PRESET).toBe('express');
	});

	it('should default to `PluginPreset.default` when the "RELEASE_PLUGIN_PRESET" environment variable is not defined', () => {
		expect(PLUGIN_PRESET).toBe(PluginPreset.default);
	});
});
