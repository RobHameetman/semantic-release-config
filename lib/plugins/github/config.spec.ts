import { PLUGIN_GITHUB } from './config';
import { releaseRules } from '@rules/index';
import { env } from '@utils/functions/env';

jest.mock('@utils/functions/env', () => ({
	__esModule: true,
	env: jest.fn(),
}));

describe('PLUGIN_GITHUB', () => {
	it('should be an array with a plugin name and a config object', () => {
		expect(PLUGIN_GITHUB).toBeInstanceOf(Array);
	});

	it('should be used for the commit analyzer plugin', () => {
		expect(PLUGIN_GITHUB).toContain('@semantic-release/github');
	});

	it('should be configured to include the release rules from this package', () => {
		expect(PLUGIN_GITHUB).toContainEqual(expect.objectContaining({
			releaseRules,
		}));
	});

	it('should be able to accept a custom preset through an environment variable', () => {
		expect(env).toBeCalledWith('RELEASE_PLUGIN_PRESET', expect.any(Function));
		expect(PLUGIN_GITHUB[1]?.preset).not.toBeUndefined();
	});
});

