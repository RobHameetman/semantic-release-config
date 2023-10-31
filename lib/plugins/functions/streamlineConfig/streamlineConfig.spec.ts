import { PLUGIN_NPM } from './config';
import { releaseRules } from '@rules/index';
import { env } from '@utils/functions/environment/env';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(),
}));

describe('PLUGIN_NPM', () => {
	it('should be an array with a plugin name and a config object', () => {
		expect(PLUGIN_NPM).toBeInstanceOf(Array);
		expect(PLUGIN_NPM).toHaveLength(2);
	});

	it('should be used for the commit analyzer plugin', () => {
		expect(PLUGIN_NPM).toContain('@semantic-release/commit-analyzer');
	});

	it('should be configured to include the release rules from this package', () => {
		expect(PLUGIN_NPM).toContainEqual(expect.objectContaining({
			releaseRules,
		}));
	});

	it('should be able to accept a custom preset through an environment variable', () => {
		expect(env).toBeCalledWith('RELEASE_PLUGIN_PRESET', expect.any(Function));
		expect(PLUGIN_NPM[1]?.preset).not.toBeUndefined();
	});
});

