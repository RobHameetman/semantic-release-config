import { mockEnv } from '@@/utils/mockEnv';

/**
 * Mocks the "RELEASE_NOTIFICATION_SLACK_CHANNEL" environment variable.
 *
 * @example
 * ```ts
 * RELEASE_NOTIFICATION_SLACK_CHANNEL
 *   .mockReturnValueOnce('team-channel')
 *   .mockReturnValueOnce('team-channel')
 *   .mockReturnValue(undefined);
 * ```
 */
export const RELEASE_NOTIFICATION_SLACK_CHANNEL = mockEnv('RELEASE_NOTIFICATION_SLACK_CHANNEL');
