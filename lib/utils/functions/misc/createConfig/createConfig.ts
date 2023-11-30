import type { Options, PluginSpec } from 'semantic-release';
import { env } from '@utils/functions/environment/env';
import { getRepositoryUrl } from '@utils/functions/misc/getRepositoryUrl';
import { isEnvTrue } from '@utils/functions/environment/isEnvTrue';

/**
 * A partial semantic-release configuration for branches and plugins. See the
 * example in the inline documentation for the `createConfig()` function below
 * for more information.
 */
interface PartialConfig {
	readonly branches?: Promise<Options['branches']>;

	/**
	 * A list of plugins to use for the release. The type `Options['plugins']` is
	 * not used here because a standardized configuration may provide a plugin
	 * which is disabled by an environment variable or by a lack of configuration
	 * options at runtime (i.e. the exec plugin). Disabled plugins are provided as
	 * `null` by the `plugin()` function and filtered out in `createConfig()`.
	 */
	readonly plugins?: ReadonlyArray<PluginSpec | null>;
}

/**
 * Create a full semantic-release configuration based on a partial configuration
 * for (pre)release branches and plugins. This function provides an abstraction
 * over the remaining portion of the config, which is always the same for all
 * standardized configurations. It also filters out any plugins that are disabled.
 *
 * @example
 * ```TypeScript
 * // myStandardizedConfig.ts
 *
 * module.exports = createConfig({
 * 	   branches: [
 * 		     { name: 'main' },
 * 		     { name: 'next', prerelease: true },
 * 	   ],
 * 	   plugins: [
 * 		     '@semantic-release/commit-analyzer',
 * 		     '@semantic-release/release-notes-generator',
 * 		     '@semantic-release/npm',
 * 		     '@semantic-release/git',
 * 		     '@semantic-release/github',
 * 	   ],
 * });
 * ```
 *
 * @param config - A semantic-release configuration for branches and plugins.
 *
 * @returns A full semantic-release configuration based on the provided partial
 * with default values added.
 */
export const createConfig = async (config: PartialConfig) => ({
	...config,
	branches: await config.branches,
	plugins: config.plugins?.filter(Boolean),
	debug: env('RELEASE_DEBUG', isEnvTrue),
	repositoryUrl: env('RELEASE_REPOSITORY_URL') || getRepositoryUrl(),
	tagFormat: '${version}',
	dryRun: env('RELEASE_DRY_RUN', isEnvTrue),
	ci: !env('RELEASE_LOCALLY', isEnvTrue),
});
