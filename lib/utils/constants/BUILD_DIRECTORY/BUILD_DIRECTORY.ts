import { env } from '@/utils/functions/environment/env';

export const DEFAULT_BUILD_DIRECTORY = 'dist';

/**
 * The default build directory used when publishing a package from somewhere
 * other than the root directory. You can override this value by setting the
 * `RELEASE_BUILD_DIRECTORY` environment variable in your CI/CD pipeline
 * configuration.
 *
 * @defaultValue - `'dist'`
 *
 * @example
 * ```yaml
 * # .github/workflows/publish.yml file
 * RELEASE_BUILD_DIRECTORY: './bin'
 * ```
 */
export const BUILD_DIRECTORY = env('RELEASE_BUILD_DIRECTORY') || DEFAULT_BUILD_DIRECTORY;
