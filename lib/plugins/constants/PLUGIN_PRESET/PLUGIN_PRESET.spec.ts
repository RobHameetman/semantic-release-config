import { isString } from '@rob.hameetman/type-guards';
import { PluginPresets } from '@plugins/enums/PluginPresets';
import { env } from '@utils/functions/environment/env';
import { PLUGIN_PRESET } from './PLUGIN_PRESET';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(() => {}),
}));

describe('PLUGIN_PRESET', () => {
	it('should be a string', () => {
		expect(isString(PLUGIN_PRESET)).toBe(true);
	});

	it('should override the default value when the "RELEASE_PLUGIN_PRESET" environment variable is defined', () => {
		expect(env).toBeCalledWith('RELEASE_PLUGIN_PRESET');
	});

	it('should default to `PluginPresets.default` when the "RELEASE_PLUGIN_PRESET" environment variable is not defined', () => {
		expect(PLUGIN_PRESET).toBe(PluginPresets.default);
	});
});
