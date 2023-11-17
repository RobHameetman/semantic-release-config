import { env } from '@utils/functions/environment/env';
import { isEnvDefinedOr } from '@utils/functions/environment/isEnvDefinedOr';

/**
 * Whether or not to use the Slack plugin. This package assumes you do not need
 * to use the Slack plugin unless you provide a Slack channel, token, and
 * webhook. Specifically, this value is `true` if all of these three criteria are met:
 * - the `RELEASE_NOTIFICATION_SLACK_CHANNEL` or `SLACK_CHANNEL` environment variable is defined
 * - the `RELEASE_NOTIFICATION_SLACK_TOKEN` or `SLACK_TOKEN` environment variable is defined
 * - the `RELEASE_NOTIFICATION_SLACK_WEBHOOK` or `SLACK_WEBHOOK` environment variable is defined
 *
 * @defaultValue - `false`
 *
 * @example
 * ```sh
 * # .env file
 * SLACK_CHANNEL=team-channel
 * SLACK_TOKEN=xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9
 * SLACK_WEBHOOK=https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7
 * ```
 */
export const SLACK_ENABLED =
	env('RELEASE_NOTIFICATION_SLACK_CHANNEL', isEnvDefinedOr('SLACK_CHANNEL')) &&
	env('RELEASE_NOTIFICATION_SLACK_TOKEN', isEnvDefinedOr('SLACK_TOKEN')) &&
	env('RELEASE_NOTIFICATION_SLACK_WEBHOOK', isEnvDefinedOr('SLACK_WEBHOOK'));
