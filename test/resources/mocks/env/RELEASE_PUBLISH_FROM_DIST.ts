import { mockEnv } from '@@/utils/mockEnv';

/**
 * Mocks the "RELEASE_PUBLISH_FROM_DIST" environment variable.
 *
 * @example
 * ```ts
 * RELEASE_PUBLISH_FROM_DIST
 *   .mockReturnValueOnce('true')
 *   .mockReturnValueOnce('true')
 *   .mockReturnValue(undefined);
 * ```
 */
export const RELEASE_PUBLISH_FROM_DIST = mockEnv('RELEASE_PUBLISH_FROM_DIST');
