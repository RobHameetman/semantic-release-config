import { PLUGIN_RELEASE_NOTES } from './config';
import { releaseRules } from '@rules/index';
import { env } from '@utils/functions/env';

jest.mock('@utils/functions/env', () => ({
	__esModule: true,
	env: jest.fn(),
}));

describe('PLUGIN_RELEASE_NOTES', () => {
	it('should be an array with a plugin name and a config object', () => {
		expect(PLUGIN_RELEASE_NOTES).toBeInstanceOf(Array);
		expect(PLUGIN_RELEASE_NOTES).toHaveLength(2);
	});

	it('should be used for the NPM plugin', () => {
		expect(PLUGIN_RELEASE_NOTES).toContain('@semantic-release/npm');
	});

	it('should be configured to include the release rules from this package', () => {
		expect(PLUGIN_RELEASE_NOTES).toContainEqual(expect.objectContaining({
			releaseRules,
		}));
	});

	it('should be able to accept a custom preset through an environment variable', () => {
		expect(env).toBeCalledWith('RELEASE_PLUGIN_PRESET', expect.any(Function));
		expect(PLUGIN_RELEASE_NOTES[1]?.preset).not.toBeUndefined();
	});
});

