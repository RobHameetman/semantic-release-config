import { mockEnv } from '@@/utils/mockEnv';

/**
 * Mocks the "SLACK_WEBHOOK" environment variable.
 *
 * @example
 * ```ts
 * SLACK_WEBHOOK
 *   .mockReturnValueOnce('https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7')
 *   .mockReturnValueOnce('https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7')
 *   .mockReturnValue(undefined);
 * ```
 */
export const SLACK_WEBHOOK = mockEnv('SLACK_WEBHOOK');
