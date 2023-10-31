import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

describe('CURRENT_BRANCH', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let CI_SHA: string | null = null;
	let CI_COMMIT_BRANCH: string | null = null;
	let GITHUB_HEAD_REF: string | null = null;
	let GIT_BRANCH: string | null = null;
	let CI_MERGE_REQUEST_SOURCE_BRANCH_NAME: string | null = null;
	let CIRCLE_BRANCH: string | null = null;
	let TRAVIS_BRANCH: string | null = null;
	let BITBUCKET_BRANCH: string | null = null;
	let BUILD_SOURCEBRANCH: string | null = null;
	let CURRENT_BRANCH: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		CI_COMMIT_BRANCH = faker.git.branch();
		GITHUB_HEAD_REF = faker.git.branch();
		GIT_BRANCH = faker.git.branch();
		CI_MERGE_REQUEST_SOURCE_BRANCH_NAME = faker.git.branch();
		CIRCLE_BRANCH = faker.git.branch();
		TRAVIS_BRANCH = faker.git.branch();
		BITBUCKET_BRANCH = faker.git.branch();
		BUILD_SOURCEBRANCH = faker.git.branch();

		mockEnv('CI_COMMIT_BRANCH')
			.mockReturnValueOnce(CI_COMMIT_BRANCH)
			.mockReturnValueOnce(CI_COMMIT_BRANCH)
			.mockReturnValue(undefined);

		mockEnv('GITHUB_HEAD_REF')
			.mockReturnValueOnce(GITHUB_HEAD_REF)
			.mockReturnValue(undefined);

		mockEnv('GIT_BRANCH')
			.mockReturnValueOnce(GIT_BRANCH)
			.mockReturnValue(undefined);

		mockEnv('CI_MERGE_REQUEST_SOURCE_BRANCH_NAME')
			.mockReturnValueOnce(CI_MERGE_REQUEST_SOURCE_BRANCH_NAME)
			.mockReturnValue(undefined);

		mockEnv('CIRCLE_BRANCH')
			.mockReturnValueOnce(CIRCLE_BRANCH)
			.mockReturnValue(undefined);

		mockEnv('TRAVIS_BRANCH')
			.mockReturnValueOnce(TRAVIS_BRANCH)
			.mockReturnValue(undefined);

		mockEnv('BITBUCKET_BRANCH')
			.mockReturnValueOnce(BITBUCKET_BRANCH)
			.mockReturnValue(undefined);

			mockEnv('BUILD_SOURCEBRANCH')
				.mockReturnValueOnce(BUILD_SOURCEBRANCH)
				.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ CURRENT_BRANCH } = await import('./CURRENT_BRANCH'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		CI_SHA = null;
		CI_COMMIT_BRANCH = null;
		CURRENT_BRANCH = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof CURRENT_BRANCH).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "CI_COMMIT_BRANCH" environment variable is provided', () => {
		expect(CURRENT_BRANCH).toBe(CI_COMMIT_BRANCH);
	});

	it('should also check for the "GITHUB_HEAD_REF" environment variable', () => {
		expect(CURRENT_BRANCH).toBe(GITHUB_HEAD_REF);
	});

	it('should also check for the "GIT_BRANCH" environment variable', () => {
		expect(CURRENT_BRANCH).toBe(GIT_BRANCH);
	});

	it('should also check for the "CI_MERGE_REQUEST_SOURCE_BRANCH_NAME" environment variable', () => {
		expect(CURRENT_BRANCH).toBe(CI_MERGE_REQUEST_SOURCE_BRANCH_NAME);
	});

	it('should also check for the "CIRCLE_BRANCH" environment variable', () => {
		expect(CURRENT_BRANCH).toBe(CIRCLE_BRANCH);
	});

	it('should also check for the "TRAVIS_BRANCH" environment variable', () => {
		expect(CURRENT_BRANCH).toBe(TRAVIS_BRANCH);
	});

	it('should also check for the "BITBUCKET_BRANCH" environment variable', () => {
		expect(CURRENT_BRANCH).toBe(BITBUCKET_BRANCH);
	});

	it('should also check for the "BUILD_SOURCEBRANCH" environment variable', () => {
		expect(CURRENT_BRANCH).toBe(BUILD_SOURCEBRANCH);
	});

	it('should be undefined when none of these environment variables are provided', () => {
		expect(CURRENT_BRANCH).toBeUndefined();
	});
});
