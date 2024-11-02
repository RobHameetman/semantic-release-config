import { mockEnv } from '@@/utils/mockEnv';

/**
 * Mocks the "RELEASE_NOTIFICATION_SLACK_WEBHOOK" environment variable.
 *
 * @example
 * ```ts
 * RELEASE_NOTIFICATION_SLACK_WEBHOOK
 *   .mockReturnValueOnce('https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7')
 *   .mockReturnValueOnce('https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7')
 *   .mockReturnValue(undefined);
 * ```
 */
export const RELEASE_NOTIFICATION_SLACK_WEBHOOK = mockEnv('RELEASE_NOTIFICATION_SLACK_WEBHOOK');
