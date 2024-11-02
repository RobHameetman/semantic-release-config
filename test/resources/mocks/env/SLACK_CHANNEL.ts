import { mockEnv } from '@@/utils/mockEnv';

/**
 * Mocks the "SLACK_CHANNEL" environment variable.
 *
 * @example
 * ```ts
 * SLACK_CHANNEL
 *   .mockReturnValueOnce('team-channel')
 *   .mockReturnValueOnce('team-channel')
 *   .mockReturnValue(undefined);
 * ```
 */
export const SLACK_CHANNEL = mockEnv('SLACK_CHANNEL');
