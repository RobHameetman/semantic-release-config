import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

describe('COMMIT_SHA', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let CI_SHA: string | null = null;
	let CI_COMMIT_SHA: string | null = null;
	let GITHUB_SHA: string | null = null;
	let GIT_COMMIT: string | null = null;
	let CIRCLE_SHA1: string | null = null;
	let TRAVIS_COMMIT: string | null = null;
	let BITBUCKET_COMMIT: string | null = null;
	let BUILD_SOURCEVERSION: string | null = null;
	let COMMIT_SHA: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		CI_SHA = faker.git.commitSha();
		CI_COMMIT_SHA = faker.git.commitSha();
		GITHUB_SHA = faker.git.commitSha();
		GIT_COMMIT = faker.git.commitSha();
		CIRCLE_SHA1 = faker.git.commitSha();
		TRAVIS_COMMIT = faker.git.commitSha();
		BITBUCKET_COMMIT = faker.git.commitSha();
		BUILD_SOURCEVERSION = faker.git.commitSha();

		mockEnv('CI_SHA')
			.mockReturnValueOnce(CI_SHA)
			.mockReturnValueOnce(CI_SHA)
			.mockReturnValue(undefined);

		mockEnv('CI_COMMIT_SHA')
			.mockReturnValueOnce(CI_COMMIT_SHA)
			.mockReturnValue(undefined);

		mockEnv('GITHUB_SHA')
			.mockReturnValueOnce(GITHUB_SHA)
			.mockReturnValue(undefined);

		mockEnv('GIT_COMMIT')
			.mockReturnValueOnce(GIT_COMMIT)
			.mockReturnValue(undefined);

		mockEnv('CIRCLE_SHA1')
			.mockReturnValueOnce(CIRCLE_SHA1)
			.mockReturnValue(undefined);

		mockEnv('TRAVIS_COMMIT')
			.mockReturnValueOnce(TRAVIS_COMMIT)
			.mockReturnValue(undefined);

		mockEnv('BITBUCKET_COMMIT')
			.mockReturnValueOnce(BITBUCKET_COMMIT)
			.mockReturnValue(undefined);

		mockEnv('BUILD_SOURCEVERSION')
			.mockReturnValueOnce(BUILD_SOURCEVERSION)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ COMMIT_SHA } = await import('./COMMIT_SHA'));
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
		CI_COMMIT_SHA = null;
		GITHUB_SHA = null;
		GIT_COMMIT = null;
		CIRCLE_SHA1 = null;
		TRAVIS_COMMIT = null;
		BITBUCKET_COMMIT = null;
		BUILD_SOURCEVERSION = null;
		COMMIT_SHA = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof COMMIT_SHA).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "CI_SHA" environment variable is provided', () => {
		expect(COMMIT_SHA).toBe(CI_SHA);
	});

	it('should also check for the "CI_COMMIT_SHA" environment variable', () => {
		expect(COMMIT_SHA).toBe(CI_COMMIT_SHA);
	});

	it('should also check for the "GITHUB_SHA" environment variable', () => {
		expect(COMMIT_SHA).toBe(GITHUB_SHA);
	});

	it('should also check for the "GIT_COMMIT" environment variable', () => {
		expect(COMMIT_SHA).toBe(GIT_COMMIT);
	});

	it('should also check for the "CIRCLE_SHA1" environment variable', () => {
		expect(COMMIT_SHA).toBe(CIRCLE_SHA1);
	});

	it('should also check for the "TRAVIS_COMMIT" environment variable', () => {
		expect(COMMIT_SHA).toBe(TRAVIS_COMMIT);
	});

	it('should also check for the "BITBUCKET_COMMIT" environment variable', () => {
		expect(COMMIT_SHA).toBe(BITBUCKET_COMMIT);
	});

	it('should also check for the "BUILD_SOURCEVERSION" environment variable', () => {
		expect(COMMIT_SHA).toBe(BUILD_SOURCEVERSION);
	});

	it('should be undefined when none of these environment variables are provided', () => {
		expect(COMMIT_SHA).toBeUndefined();
	});
});
