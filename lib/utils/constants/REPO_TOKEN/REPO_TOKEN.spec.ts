import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

describe('REPO_TOKEN', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let CI_TOKEN: string | null = null;
	let GITHUB_TOKEN: string | null = null;
	let GH_TOKEN: string | null = null;
	let GITLAB_TOKEN: string | null = null;
	let BITBUCKET_TOKEN: string | null = null;
	let REPO_TOKEN: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		CI_TOKEN = faker.company.name();
		GITHUB_TOKEN = faker.company.name();
		GH_TOKEN = faker.company.name();
		GITLAB_TOKEN = faker.company.name();
		BITBUCKET_TOKEN = faker.company.name();

		mockEnv('CI_TOKEN')
			.mockReturnValueOnce(CI_TOKEN)
			.mockReturnValueOnce(CI_TOKEN)
			.mockReturnValue(undefined);

		mockEnv('GITHUB_TOKEN')
			.mockReturnValueOnce(GITHUB_TOKEN)
			.mockReturnValue(undefined);

		mockEnv('GH_TOKEN')
			.mockReturnValueOnce(GH_TOKEN)
			.mockReturnValue(undefined);

		mockEnv('GITLAB_TOKEN')
			.mockReturnValueOnce(GITLAB_TOKEN)
			.mockReturnValue(undefined);

		mockEnv('BITBUCKET_TOKEN')
			.mockReturnValueOnce(BITBUCKET_TOKEN)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ REPO_TOKEN } = await import('./REPO_TOKEN'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		CI_TOKEN = null;
		GITHUB_TOKEN = null;
		GH_TOKEN = null;
		GITLAB_TOKEN = null;
		BITBUCKET_TOKEN = null;
		REPO_TOKEN = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof REPO_TOKEN).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "CI_TOKEN" environment variable is provided', () => {
		expect(REPO_TOKEN).toBe(CI_TOKEN);
	});

	it('should also check for the "GITHUB_TOKEN" environment variable', () => {
		expect(REPO_TOKEN).toBe(GITHUB_TOKEN);
	});

	it('should also check for the "GH_TOKEN" environment variable', () => {
		expect(REPO_TOKEN).toBe(GH_TOKEN);
	});

	it('should also check for the "GITLAB_TOKEN" environment variable', () => {
		expect(REPO_TOKEN).toBe(GITLAB_TOKEN);
	});

	it('should also check for the "BITBUCKET_TOKEN" environment variable', () => {
		expect(REPO_TOKEN).toBe(BITBUCKET_TOKEN);
	});

	it('should be undefined when none of these environment variables are provided', () => {
		expect(REPO_TOKEN).toBeUndefined();
	});
});
