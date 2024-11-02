import { mockEnv } from '@@/utils/mockEnv';

/**
 * Mocks the "RELEASE_PLUGIN_PRESET" environment variable.
 *
 * @example
 * ```ts
 * RELEASE_PLUGIN_PRESET
 *   .mockReturnValueOnce('express')
 *   .mockReturnValueOnce('angular')
 *   .mockReturnValue(undefined);
 * ```
 */
export const RELEASE_PLUGIN_PRESET = mockEnv('RELEASE_PLUGIN_PRESET');
