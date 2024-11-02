import { mockEnv } from '@@/utils/mockEnv';

/**
 * Mocks the "RELEASE_NOTIFICATION_SLACK_TOKEN" environment variable.
 *
 * @example
 * ```ts
 * RELEASE_NOTIFICATION_SLACK_TOKEN
 *   .mockReturnValueOnce('xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9')
 *   .mockReturnValueOnce('xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9')
 *   .mockReturnValue(undefined);
 * ```
 */
export const RELEASE_NOTIFICATION_SLACK_TOKEN = mockEnv('RELEASE_NOTIFICATION_SLACK_TOKEN');
