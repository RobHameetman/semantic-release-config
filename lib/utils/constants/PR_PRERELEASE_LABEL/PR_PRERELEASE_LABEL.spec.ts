import { faker } from '@faker-js/faker';
import { randomDefaultPrPrereleaseStrategy, randomNonDefaultPrPrereleaseStrategy } from '@/utils/enums/PrPrereleaseStrategy/__test__';
import { PrPrereleaseLabel } from '@/utils/enums/PrPrereleaseLabel';
import { mockEnv } from '@@/utils/mockEnv';

describe('PR_PRERELEASE_LABEL', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_PR_PRERELEASE_LABEL: string | null = null;
	let CI_PR_NUMBER: number | undefined | null = null;
	let CI_SHA: string | undefined | null = null;
	let CI_SHA_SHORT: string | undefined | null = null;
	let CURRENT_BRANCH: string | undefined | null = null;
	let DATE: Date | null = null;
	let DATE_HASH: string | undefined | null = null;
	let PR_PRERELEASE_LABEL: unknown = null;

	beforeAll(async () => {
		processEnv = process.env;

		RELEASE_PR_PRERELEASE_LABEL = faker.word.noun().toLowerCase();
		CI_PR_NUMBER = faker.number.int({ min: 1, max: 100});
		CI_SHA = faker.git.commitSha();
		CI_SHA_SHORT = faker.git.commitSha().slice(0, 8);
		CURRENT_BRANCH = faker.git.branch();

		({ DATE } = await import('@/utils/constants/DATE'));
		({ DATE_HASH } = await import('@/utils/constants/DATE_HASH'));

		mockEnv('RELEASE_PR_PRERELEASE_LABEL')
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_LABEL)
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_LABEL)
			.mockReturnValueOnce('omit')
			.mockReturnValueOnce('omit')
			.mockReturnValue(undefined);

		mockEnv('RELEASE_PR_PRERELEASE_STRATEGY')
			.mockReturnValueOnce(undefined)
			.mockReturnValueOnce(undefined)
			.mockReturnValueOnce(randomNonDefaultPrPrereleaseStrategy())
			.mockReturnValueOnce(randomDefaultPrPrereleaseStrategy())
			.mockReturnValueOnce('branch')
			.mockReturnValueOnce('branch.date')
			.mockReturnValueOnce('commit')
			.mockReturnValueOnce('commitfull')
			.mockReturnValueOnce('datetime')
			.mockReturnValueOnce('date')
			.mockReturnValueOnce('default.date')
			.mockReturnValueOnce('default')
			.mockReturnValue(undefined);

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
		({ PR_PRERELEASE_LABEL } = await import('./PR_PRERELEASE_LABEL'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_PR_PRERELEASE_LABEL = null;
		PR_PRERELEASE_LABEL = null;
		CI_PR_NUMBER = null;
		CI_SHA = null;
		CI_SHA_SHORT = null;
		DATE = null;
		DATE_HASH = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof PR_PRERELEASE_LABEL).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be the value of RELEASE_PR_PRERELEASE_LABEL when RELEASE_PR_PRERELEASE_LABEL is defined and is not "omit"', () => {
		expect(PR_PRERELEASE_LABEL).toBe(RELEASE_PR_PRERELEASE_LABEL);
	});

	it('should be an empty string when RELEASE_PR_PRERELEASE_LABEL is "omit" and RELEASE_PR_PRERELEASE_STRATEGY is not a default strategy', () => {
		expect(PR_PRERELEASE_LABEL).toBe('');
	});

	it('should be the default label when RELEASE_PR_PRERELEASE_LABEL is "omit" and RELEASE_PR_PRERELEASE_STRATEGY is a default strategy', () => {
		expect(PR_PRERELEASE_LABEL).toBe(PrPrereleaseLabel.default);
	});

	it('should use the "branch" label by default when RELEASE_PR_PRERELEASE_STRATEGY is "branch"', () => {
    expect(PR_PRERELEASE_LABEL).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.branch));
  });

	it('should use the "branch" label by default when RELEASE_PR_PRERELEASE_STRATEGY is "branch.date"', () => {
    expect(PR_PRERELEASE_LABEL).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.branch));
  });

	it('should use the "commit" label by default when RELEASE_PR_PRERELEASE_STRATEGY is "commit"', () => {
    expect(PR_PRERELEASE_LABEL).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.commit));
  });

  it('should use the "commit" label by default when RELEASE_PR_PRERELEASE_STRATEGY is "commitfull"', () => {
    expect(PR_PRERELEASE_LABEL).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.commit));
  });

  it('should use the "date" label by default when RELEASE_PR_PRERELEASE_STRATEGY is "datetime"', () => {
    expect(PR_PRERELEASE_LABEL).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.date));
  });

	it('should use the "date" label by default when RELEASE_PR_PRERELEASE_STRATEGY is "date"', () => {
    expect(PR_PRERELEASE_LABEL).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.date));
  });

  it('should use the "default" label by default when RELEASE_PR_PRERELEASE_STRATEGY is "default.date"', () => {
    expect(PR_PRERELEASE_LABEL).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.default));
  });

  it('should use the "default" label by default when RELEASE_PR_PRERELEASE_STRATEGY is "default"', () => {
    expect(PR_PRERELEASE_LABEL).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.default));
  });

  it('should use the "default" label by default when no relevant environment variables are set', () => {
    expect(PR_PRERELEASE_LABEL).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.default));
  });
});
