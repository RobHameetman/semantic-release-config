import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

describe('REPO_NAME', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let CI_REPOSITORY: string | null = null;
	let GITHUB_REPOSITORY: string | null = null;
	let GH_REPOSITORY: string | null = null;
	let GITLAB_REPOSITORY: string | null = null;
	let BITBUCKET_REPOSITORY: string | null = null;
	let REPO_NAME: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		CI_REPOSITORY = faker.company.name();
		GITHUB_REPOSITORY = faker.company.name();
		GH_REPOSITORY = faker.company.name();
		GITLAB_REPOSITORY = faker.company.name();
		BITBUCKET_REPOSITORY = faker.company.name();

		mockEnv('CI_REPOSITORY')
			.mockReturnValueOnce(CI_REPOSITORY)
			.mockReturnValueOnce(CI_REPOSITORY)
			.mockReturnValue(undefined);

		mockEnv('GITHUB_REPOSITORY')
			.mockReturnValueOnce(GITHUB_REPOSITORY)
			.mockReturnValue(undefined);

		mockEnv('GH_REPOSITORY')
			.mockReturnValueOnce(GH_REPOSITORY)
			.mockReturnValue(undefined);

		mockEnv('GITLAB_REPOSITORY')
			.mockReturnValueOnce(GITLAB_REPOSITORY)
			.mockReturnValue(undefined);

		mockEnv('BITBUCKET_REPOSITORY')
			.mockReturnValueOnce(BITBUCKET_REPOSITORY)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ REPO_NAME } = await import('./REPO_NAME'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		CI_REPOSITORY = null;
		GITHUB_REPOSITORY = null;
		GH_REPOSITORY = null;
		GITLAB_REPOSITORY = null;
		BITBUCKET_REPOSITORY = null;
		REPO_NAME = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof REPO_NAME).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "CI_REPOSITORY" environment variable is provided', () => {
		expect(REPO_NAME).toBe(CI_REPOSITORY);
	});

	it('should also check for the "GITHUB_REPOSITORY" environment variable', () => {
		expect(REPO_NAME).toBe(GITHUB_REPOSITORY);
	});

	it('should also check for the "GH_REPOSITORY" environment variable', () => {
		expect(REPO_NAME).toBe(GH_REPOSITORY);
	});

	it('should also check for the "GITLAB_REPOSITORY" environment variable', () => {
		expect(REPO_NAME).toBe(GITLAB_REPOSITORY);
	});

	it('should also check for the "BITBUCKET_REPOSITORY" environment variable', () => {
		expect(REPO_NAME).toBe(BITBUCKET_REPOSITORY);
	});

	it('should be undefined when none of these environment variables are provided', () => {
		expect(REPO_NAME).toBeUndefined();
	});
});
