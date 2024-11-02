import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

describe('PR_PRERELEASE_CHANNEL', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_PR_PRERELEASE_CHANNEL: string | undefined | null = null;
	let RELEASE_PR_PRERELEASE_LABEL: string | undefined | null = null;
	let CI_PR_NUMBER: number | undefined | null = null;
	let CI_SHA: string | undefined | null = null;
	let CI_SHA_SHORT: string | undefined | null = null;
	let CURRENT_BRANCH: string | undefined | null = null;
	let DATE: Date | null = null;
	let DATE_HASH: string | undefined | null = null;
	let PR_PRERELEASE_CHANNEL: unknown = null;

	beforeAll(async () => {
		processEnv = process.env;

		RELEASE_PR_PRERELEASE_CHANNEL = faker.word.noun();
		RELEASE_PR_PRERELEASE_LABEL = faker.word.noun();
		CI_PR_NUMBER = faker.number.int({ min: 1, max: 100});
		CI_SHA = faker.git.commitSha();
		CI_SHA_SHORT = faker.git.commitSha().slice(0, 8);
		CURRENT_BRANCH = faker.git.branch();

		({ DATE } = await import('@/utils/constants/DATE'));
		({ DATE_HASH } = await import('@/utils/constants/DATE_HASH'));

		mockEnv('RELEASE_PR_PRERELEASE_CHANNEL')
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_CHANNEL)
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_CHANNEL)
			.mockReturnValue(undefined);

		mockEnv('RELEASE_PR_PRERELEASE_STRATEGY')
			.mockReturnValueOnce('branch')
			.mockReturnValueOnce('branch')
			.mockReturnValueOnce('branch')
			.mockReturnValueOnce('branch.date')
			.mockReturnValueOnce('commit')
			.mockReturnValueOnce('commitfull')
			.mockReturnValueOnce('datetime')
			.mockReturnValueOnce('date')
			.mockReturnValueOnce('default.date')
			.mockReturnValueOnce('default')
			.mockReturnValue(undefined);

		mockEnv('RELEASE_PR_PRERELEASE_LABEL')
			.mockReturnValue(RELEASE_PR_PRERELEASE_LABEL);

		mockEnv('CI_PR_NUMBER')
			.mockReturnValue(String(CI_PR_NUMBER));

		mockEnv('CI_SHA_SHORT')
			.mockReturnValue(CI_SHA_SHORT);

		mockEnv('CI_COMMIT_SHA')
			.mockReturnValue(CI_SHA);

		mockEnv('CI_COMMIT_BRANCH')
			.mockReturnValue(CURRENT_BRANCH);
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
		RELEASE_PR_PRERELEASE_LABEL = null;
		CI_PR_NUMBER = null;
		CI_SHA = null;
		CI_SHA_SHORT = null;
		DATE = null;
		DATE_HASH = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_PR_PRERELEASE_CHANNEL" environment variable is provided', () => {
		expect(PR_PRERELEASE_CHANNEL).toBe(RELEASE_PR_PRERELEASE_CHANNEL);
	});

	// it('should use the PR prerelease type by default when the "RELEASE_PR_PRERELEASE_CHANNEL" environment variable is not provided', () => {
	// 	expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(RELEASE_PR_PRERELEASE_LABEL ?? ''));
	// });

	// it('should use the PR number by default when the "RELEASE_PR_PRERELEASE_CHANNEL" environment variable is not provided', () => {
	// 	expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(String(CI_PR_NUMBER) ?? ''));
	// });

	it('should use CURRENT_BRANCH by default when RELEASE_PR_PRERELEASE_STRATEGY is "branch"', () => {
    expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(CURRENT_BRANCH ?? ''));
  });

	it('should use CURRENT_BRANCH by default when RELEASE_PR_PRERELEASE_STRATEGY is "branch.date"', () => {
    expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(CURRENT_BRANCH ?? ''));
  });

	it('should use CURRENT_BRANCH by default when RELEASE_PR_PRERELEASE_STRATEGY is "commit"', () => {
    expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(CURRENT_BRANCH ?? ''));
  });

  it('should use CURRENT_BRANCH by default when RELEASE_PR_PRERELEASE_STRATEGY is "commitfull"', () => {
    expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(CURRENT_BRANCH ?? ''));
  });

  it('should use DATE_HASH by default when RELEASE_PR_PRERELEASE_STRATEGY is "datetime"', () => {
    expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(DATE_HASH ?? ''));
  });

	it('should use DATE_HASH by default when RELEASE_PR_PRERELEASE_STRATEGY is "date"', () => {
    expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(DATE_HASH ?? ''));
  });

  it('should use PR_NUMBER by default when RELEASE_PR_PRERELEASE_STRATEGY is "default.date"', () => {
    expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(`pr-${String(CI_PR_NUMBER) ?? ''}`));
  });

  it('should use PR_NUMBER by default when RELEASE_PR_PRERELEASE_STRATEGY is "default"', () => {
    expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(`pr-${String(CI_PR_NUMBER) ?? ''}`));
  });

  it('should use PR_NUMBER by default when no relevant environment variables are set', () => {
    expect(PR_PRERELEASE_CHANNEL).toStrictEqual(expect.stringContaining(`pr-${String(CI_PR_NUMBER) ?? ''}`));
  });
});
