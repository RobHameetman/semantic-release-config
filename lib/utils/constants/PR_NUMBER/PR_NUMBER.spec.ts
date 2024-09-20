import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

const { OPEN_PR_NUMBER, getMockExec } = (() => {
	const OPEN_PR_NUMBER = faker.number.int({ min: 1, max: 100});

	const mockExec = jest.fn()
		.mockResolvedValueOnce({ stdout: JSON.stringify([
			{ number: OPEN_PR_NUMBER, head: { ref: 'test-branch' } },
		]) })
		.mockResolvedValueOnce({ stdout: JSON.stringify([
			{ number: OPEN_PR_NUMBER, head: { ref: 'test-branch' } },
		]) })
		.mockResolvedValue({ stdout: JSON.stringify([]) })

	return {
		OPEN_PR_NUMBER,
		getMockExec: () => mockExec,
	};
})();

jest.unstable_mockModule('util', () => ({
	__esModule: true,
  promisify: jest.fn().mockReturnValue(getMockExec()),
}));

describe('PR_NUMBER', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let CI_PR_NUMBER: number | undefined | null = null;
	let CI_PULL_REQUEST: number | undefined | null = null;
	let PULL_REQUEST_NUMBER: number | undefined | null = null;
	let CI_MERGE_REQUEST_IID: number | undefined | null = null;
	let CIRCLE_PR_NUMBER: number | undefined | null = null;
	let TRAVIS_PULL_REQUEST: number | undefined | null = null;
	let BITBUCKET_PR_ID: number | undefined | null = null;
	let CI_REF: number | undefined | null = null;
	let CI_COMMIT_REF_NAME: number | undefined | null = null;
	let GITHUB_REF: number | undefined | null = null;
	let CI_COMMIT_BRANCH: string | undefined | null = null;
	let CI_TOKEN: string | undefined | null = null;
	let CI_REPOSITORY: string | undefined | null = null;
	let PR_NUMBER: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		CI_PR_NUMBER = faker.number.int({ min: 1, max: 100});
		CI_PULL_REQUEST = faker.number.int({ min: 1, max: 100});
		PULL_REQUEST_NUMBER = faker.number.int({ min: 1, max: 100});
		CI_MERGE_REQUEST_IID = faker.number.int({ min: 1, max: 100});
		CIRCLE_PR_NUMBER = faker.number.int({ min: 1, max: 100});
		TRAVIS_PULL_REQUEST = faker.number.int({ min: 1, max: 100});
		BITBUCKET_PR_ID = faker.number.int({ min: 1, max: 100});
		CI_REF = faker.number.int({ min: 1, max: 100});
		CI_COMMIT_REF_NAME = faker.number.int({ min: 1, max: 100});
		GITHUB_REF = faker.number.int({ min: 1, max: 100});

		CI_COMMIT_BRANCH = 'test-branch';
		CI_TOKEN = 'test-token';
		CI_REPOSITORY = 'test-repository';

		mockEnv('CI_PR_NUMBER')
			.mockReturnValueOnce(String(CI_PR_NUMBER))
			.mockReturnValueOnce(String(CI_PR_NUMBER))
			.mockReturnValue(undefined);

		mockEnv('CI_PULL_REQUEST')
			.mockReturnValueOnce(String(CI_PULL_REQUEST))
			.mockReturnValue(undefined);

		mockEnv('PULL_REQUEST_NUMBER')
			.mockReturnValueOnce(String(PULL_REQUEST_NUMBER))
			.mockReturnValue(undefined);

		mockEnv('CI_MERGE_REQUEST_IID')
			.mockReturnValueOnce(String(CI_MERGE_REQUEST_IID))
			.mockReturnValue(undefined);

		mockEnv('CIRCLE_PR_NUMBER')
			.mockReturnValueOnce(String(CIRCLE_PR_NUMBER))
			.mockReturnValue(undefined);

		mockEnv('TRAVIS_PULL_REQUEST')
			.mockReturnValueOnce(String(TRAVIS_PULL_REQUEST))
			.mockReturnValue(undefined);

		mockEnv('BITBUCKET_PR_ID')
			.mockReturnValueOnce(String(BITBUCKET_PR_ID))
			.mockReturnValue(undefined);

		mockEnv('CI_REF')
			.mockReturnValueOnce(`refs/head/${CI_REF}`)
			.mockReturnValue(undefined);

		mockEnv('CI_COMMIT_REF_NAME')
			.mockReturnValueOnce(`refs/head/${CI_COMMIT_REF_NAME}`)
			.mockReturnValue(undefined);

		mockEnv('GITHUB_REF')
			.mockReturnValueOnce(`refs/head/${GITHUB_REF}`)
			.mockReturnValue(undefined);

		mockEnv('CI_COMMIT_BRANCH')
			.mockReturnValue(CI_COMMIT_BRANCH);

		mockEnv('CI_TOKEN')
			.mockReturnValue(CI_TOKEN);

		mockEnv('CI_REPOSITORY')
			.mockReturnValue(CI_REPOSITORY);
	});

	beforeEach(async () => {
		({ PR_NUMBER } = await import('./PR_NUMBER'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		CI_PR_NUMBER = null;
		CI_PULL_REQUEST = null;
		PULL_REQUEST_NUMBER = null;
		CI_MERGE_REQUEST_IID = null;
		CIRCLE_PR_NUMBER = null;
		TRAVIS_PULL_REQUEST = null;
		BITBUCKET_PR_ID = null;
		CI_REF = null;
		CI_COMMIT_REF_NAME = null;
		GITHUB_REF = null;
		CI_COMMIT_BRANCH = null;
		CI_TOKEN = null;
		CI_REPOSITORY = null;
	});

	it('should be a number or undefined', () => {
		expect(typeof PR_NUMBER).toStrictEqual(expect.stringMatching(/number|undefined/));
	});

	it('should be defined when the "CI_PR_NUMBER" environment variable is provided', () => {
		expect(PR_NUMBER).toBe(CI_PR_NUMBER);
	});

	it('should also check for the "CI_PULL_REQUEST" environment variable', () => {
		expect(PR_NUMBER).toBe(CI_PULL_REQUEST);
	});

	it('should also check for the "PULL_REQUEST_NUMBER" environment variable', () => {
		expect(PR_NUMBER).toBe(PULL_REQUEST_NUMBER);
	});

	it('should also check for the "CI_MERGE_REQUEST_IID" environment variable', () => {
		expect(PR_NUMBER).toBe(CI_MERGE_REQUEST_IID);
	});

	it('should also check for the "CIRCLE_PR_NUMBER" environment variable', () => {
		expect(PR_NUMBER).toBe(CIRCLE_PR_NUMBER);
	});

	it('should also check for the "TRAVIS_PULL_REQUEST" environment variable', () => {
		expect(PR_NUMBER).toBe(TRAVIS_PULL_REQUEST);
	});

	it('should also check for the "BITBUCKET_PR_ID" environment variable', () => {
		expect(PR_NUMBER).toBe(BITBUCKET_PR_ID);
	});

	it('should also check for the "CI_REF" environment variable', () => {
		expect(PR_NUMBER).toBe(CI_REF);
	});

	it('should also check for the "CI_COMMIT_REF_NAME" environment variable', () => {
		expect(PR_NUMBER).toBe(CI_COMMIT_REF_NAME);
	});

	it('should also check for the "GITHUB_REF" environment variable', () => {
		expect(PR_NUMBER).toBe(GITHUB_REF);
	});

	it('should request a PR number for the current branch when none of these environment variables are defined', () => {
		expect(getMockExec()).toBeCalledWith(`curl -s -H "Authorization: token ${CI_TOKEN}" "https://api.github.com/repos/${CI_REPOSITORY}/pulls?state=open"`);
	});

	it('should be defined when the current branch has an open PR', () => {
		expect(PR_NUMBER).toBe(OPEN_PR_NUMBER);
	});

	it('should be undefined when the current branch does not have an open PR', () => {
		expect(PR_NUMBER).toBeUndefined();
	});
});
