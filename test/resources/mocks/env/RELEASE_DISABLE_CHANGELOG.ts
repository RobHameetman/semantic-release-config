import { mockEnv } from '@@/utils/mockEnv';

/**
 * Mocks the "RELEASE_DISABLE_CHANGELOG" environment variable.
 *
 * @example
 * ```ts
 * RELEASE_DISABLE_CHANGELOG
 *   .mockReturnValueOnce('true')
 *   .mockReturnValueOnce('true')
 *   .mockReturnValue(undefined);
 * ```
 */
export const RELEASE_DISABLE_CHANGELOG = mockEnv('RELEASE_DISABLE_CHANGELOG');
