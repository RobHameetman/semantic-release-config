import { PLUGIN_COMMIT_ANALYZER } from './config';
import { releaseRules } from '@rules/index';
import { env } from '@utils/functions/env';

jest.mock('@utils/functions/env', () => ({
	__esModule: true,
	env: jest.fn(),
}));

describe('PLUGIN_COMMIT_ANALYZER', () => {
	it('should be an array with a plugin name and a config object', () => {
		expect(PLUGIN_COMMIT_ANALYZER).toBeInstanceOf(Array);
		expect(PLUGIN_COMMIT_ANALYZER).toHaveLength(2);
	});

	it('should be used for the commit analyzer plugin', () => {
		expect(PLUGIN_COMMIT_ANALYZER).toContain('@semantic-release/commit-analyzer');
	});

	it('should be configured to include the release rules from this package', () => {
		expect(PLUGIN_COMMIT_ANALYZER).toContainEqual(expect.objectContaining({
			releaseRules,
		}));
	});

	it('should be able to accept a custom preset through an environment variable', () => {
		expect(env).toBeCalledWith('RELEASE_PLUGIN_PRESET', expect.any(Function));
		expect(PLUGIN_COMMIT_ANALYZER[1]?.preset).not.toBeUndefined();
	});
});

