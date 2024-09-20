import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

describe('PR_PRERELEASE_CHANNEL', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_PR_PRERELEASE_CHANNEL: string | undefined | null = null;
	let RELEASE_PR_PRERELEASE_TYPE: string | undefined | null = null;
	let CI_PR_NUMBER: number | undefined | null = null;
	let PR_PRERELEASE_CHANNEL: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_PR_PRERELEASE_CHANNEL = faker.word.noun();
		RELEASE_PR_PRERELEASE_TYPE = faker.word.noun();
		CI_PR_NUMBER = faker.number.int({ min: 1, max: 100});

		mockEnv('RELEASE_PR_PRERELEASE_CHANNEL')
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_CHANNEL)
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_CHANNEL)
			.mockReturnValue(undefined);

		mockEnv('RELEASE_PR_PRERELEASE_TYPE')
			.mockReturnValue(RELEASE_PR_PRERELEASE_TYPE);

		mockEnv('CI_PR_NUMBER')
			.mockReturnValue(String(CI_PR_NUMBER));
	});

	beforeEach(async () => {
		({ PR_PRERELEASE_CHANNEL } = await import('./PR_PRERELEASE_CHANNEL'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_PR_PRERELEASE_CHANNEL = null;
		RELEASE_PR_PRERELEASE_TYPE = null;
		CI_PR_NUMBER = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_PR_PRERELEASE_CHANNEL" environment variable is provided', () => {
		expect(PR_PRERELEASE_CHANNEL).toBe(RELEASE_PR_PRERELEASE_CHANNEL);
	});

	it('should use the PR prerelease type by default when the "RELEASE_PR_PRERELEASE_CHANNEL" environment variable is not provided', () => {
		expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(RELEASE_PR_PRERELEASE_TYPE ?? ''));
	});

	it('should use the PR number by default when the "RELEASE_PR_PRERELEASE_CHANNEL" environment variable is not provided', () => {
		expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(String(CI_PR_NUMBER) ?? ''));
	});
});
