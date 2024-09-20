import { RELEASE_NOTIFICATION_SLACK_CHANNEL } from '@@/mocks/env/RELEASE_NOTIFICATION_SLACK_CHANNEL';
import { RELEASE_NOTIFICATION_SLACK_TOKEN } from '@@/mocks/env/RELEASE_NOTIFICATION_SLACK_TOKEN';
import { RELEASE_NOTIFICATION_SLACK_WEBHOOK } from '@@/mocks/env/RELEASE_NOTIFICATION_SLACK_WEBHOOK';
import { SLACK_CHANNEL } from '@@/mocks/env/SLACK_CHANNEL'
import { SLACK_TOKEN } from '@@/mocks/env/SLACK_TOKEN';
import { SLACK_WEBHOOK } from '@@/mocks/env/SLACK_WEBHOOK';

export const enableSlack = () => {
	RELEASE_NOTIFICATION_SLACK_CHANNEL.mockReturnValue('team-channel');
	SLACK_CHANNEL.mockReturnValue('team-channel');

	RELEASE_NOTIFICATION_SLACK_TOKEN.mockReturnValue('xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9');
	SLACK_TOKEN.mockReturnValue('xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9');

	RELEASE_NOTIFICATION_SLACK_WEBHOOK.mockReturnValue('https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7');
	SLACK_WEBHOOK.mockReturnValue('https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7');
}
