import { mockEnv } from '@@/utils/mockEnv';

/**
 * Mocks the "SLACK_TOKEN" environment variable.
 *
 * @example
 * ```ts
 * SLACK_TOKEN
 *   .mockReturnValueOnce('xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9')
 *   .mockReturnValueOnce('xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9')
 *   .mockReturnValue(undefined);
 * ```
 */
export const SLACK_TOKEN = mockEnv('SLACK_TOKEN');
