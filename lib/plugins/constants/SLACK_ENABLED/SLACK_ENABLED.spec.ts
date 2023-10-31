import { isBoolean } from '@rob.hameetman/type-guards';
import { mockEnv } from '@@/utils/mockEnv';

describe('SLACK_ENABLED', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let SLACK_ENABLED: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		mockEnv('RELEASE_NOTIFICATION_SLACK_CHANNEL')
			.mockReturnValueOnce('team-channel')
			.mockReturnValueOnce('team-channel')
			.mockReturnValue(undefined);

		mockEnv('RELEASE_NOTIFICATION_SLACK_TOKEN')
			.mockReturnValueOnce('xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9')
			.mockReturnValueOnce('xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9')
			.mockReturnValue(undefined);

		mockEnv('RELEASE_NOTIFICATION_SLACK_WEBHOOK')
			.mockReturnValueOnce('https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7')
			.mockReturnValueOnce('https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7')
			.mockReturnValue(undefined);

		mockEnv('SLACK_CHANNEL')
			.mockReturnValueOnce('team-channel');

		mockEnv('SLACK_TOKEN')
			.mockReturnValueOnce('xoxb-255729041476-9198614783177-XR8VelWmtbZ54dPNvg2QPAi9');

		mockEnv('SLACK_WEBHOOK')
			.mockReturnValueOnce('https://hooks.slack.com/services/MILDI8C44/D4933K04P5F/UxFrePaswNGOe772LIbVz5W7');
	});

	beforeEach(async () => {
		({ SLACK_ENABLED } = await import('./SLACK_ENABLED'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;
	});

	it('should be a boolean', () => {
		expect(isBoolean(SLACK_ENABLED)).toBe(true);
	});

	it('should be true when the environment variables for the webhook, token, and channel are all defined', () => {
		expect(SLACK_ENABLED).toBe(true);
	});

	it('should also check environment variable aliases for the webhook, token, and channel', () => {
		expect(SLACK_ENABLED).toBe(true);
	});
});
