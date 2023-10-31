import { isBoolean } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { isEnvDefinedOr } from '@utils/functions/environment/environment/isEnvDefinedOr';
import { SLACK_ENABLED } from './SLACK_ENABLED';

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn(() => true),
}));

jest.mock('@utils/functions/environment/environment/isEnvDefinedOr', () => ({
	__esModule: true,
	isEnvDefinedOr: jest.fn(() => true),
}));

describe('SLACK_ENABLED', () => {
	it('should be a boolean', () => {
		expect(isBoolean(SLACK_ENABLED)).toBe(true);
	});

	it('should be true when the environment variables for the webhook, token, and channel are all defined', () => {
		expect(env).toBeCalledWith('RELEASE_NOTIFICATION_SLACK_CHANNEL', true);
		expect(env).toBeCalledWith('RELEASE_NOTIFICATION_SLACK_TOKEN', true);
		expect(env).toBeCalledWith('RELEASE_NOTIFICATION_SLACK_WEBHOOK', true);
	});

	it('should also check environment variable aliases for the webhook, token, and channel', () => {
		expect(isEnvDefinedOr).toBeCalledWith('SLACK_CHANNEL');
		expect(isEnvDefinedOr).toBeCalledWith('SLACK_TOKEN');
		expect(isEnvDefinedOr).toBeCalledWith('SLACK_WEBHOOK');
	});
});
