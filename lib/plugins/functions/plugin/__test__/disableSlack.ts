import { RELEASE_NOTIFICATION_SLACK_CHANNEL } from '@@/mocks/env/RELEASE_NOTIFICATION_SLACK_CHANNEL';
import { RELEASE_NOTIFICATION_SLACK_TOKEN } from '@@/mocks/env/RELEASE_NOTIFICATION_SLACK_TOKEN';
import { RELEASE_NOTIFICATION_SLACK_WEBHOOK } from '@@/mocks/env/RELEASE_NOTIFICATION_SLACK_WEBHOOK';
import { SLACK_CHANNEL } from '@@/mocks/env/SLACK_CHANNEL'
import { SLACK_TOKEN } from '@@/mocks/env/SLACK_TOKEN';
import { SLACK_WEBHOOK } from '@@/mocks/env/SLACK_WEBHOOK';

export const disableSlack = () => {
	RELEASE_NOTIFICATION_SLACK_CHANNEL.mockReturnValue(undefined);
	SLACK_CHANNEL.mockReturnValue(undefined);

	RELEASE_NOTIFICATION_SLACK_TOKEN.mockReturnValue(undefined);
	SLACK_TOKEN.mockReturnValue(undefined);

	RELEASE_NOTIFICATION_SLACK_WEBHOOK.mockReturnValue(undefined);
	SLACK_WEBHOOK.mockReturnValue(undefined);
}
