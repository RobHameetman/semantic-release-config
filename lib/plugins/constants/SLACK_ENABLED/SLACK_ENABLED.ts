import { env } from '@utils/functions/environment/env';
import { isEnvDefinedOr } from '@utils/functions/environment/isEnvDefinedOr';

export const SLACK_ENABLED =
	env('RELEASE_NOTIFICATION_SLACK_CHANNEL', isEnvDefinedOr('SLACK_CHANNEL')) &&
	env('RELEASE_NOTIFICATION_SLACK_TOKEN', isEnvDefinedOr('SLACK_TOKEN')) &&
	env('RELEASE_NOTIFICATION_SLACK_WEBHOOK', isEnvDefinedOr('SLACK_WEBHOOK'));
