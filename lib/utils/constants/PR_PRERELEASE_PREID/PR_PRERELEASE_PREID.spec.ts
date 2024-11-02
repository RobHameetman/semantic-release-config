import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';
import { PrPrereleaseLabel } from '@/utils/enums/PrPrereleaseLabel';
import { randomPrPrereleaseLabel } from '@/utils/enums/PrPrereleaseLabel/__test__';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth();
const CURRENT_DAY = new Date().getDate();
const CURRENT_HOUR = new Date().getHours();
const CURRENT_MINUTE = new Date().getMinutes();

jest.unstable_mockModule('@/utils/constants/DATE', () => ({
	DATE: new Date(CURRENT_YEAR, CURRENT_MONTH - 1, CURRENT_DAY, CURRENT_HOUR, CURRENT_MINUTE, CURRENT_MINUTE),
}));

describe('PR_PRERELEASE_PREID', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_PR_PRERELEASE_PREID: string | undefined | null = null;
	let RELEASE_PR_PRERELEASE_LABEL: string | undefined | null = null;
	let CI_PR_NUMBER: number | undefined | null = null;
	let CI_SHA: string | undefined | null = null;
	let CI_SHA_SHORT: string | undefined | null = null;
	let CURRENT_BRANCH: string | undefined | null = null;
	let DATE: Date | null = null;
	let DATE_HASH: string | undefined | null = null;
	let DATETIME_HASH: string | undefined | null = null;
	let PR_PRERELEASE_PREID: unknown = null;

	beforeAll(async () => {
		processEnv = process.env;

		RELEASE_PR_PRERELEASE_PREID = faker.word.noun();
		RELEASE_PR_PRERELEASE_LABEL = faker.helpers.arrayElement([RELEASE_PR_PRERELEASE_PREID, 'omit', randomPrPrereleaseLabel()]);
		CI_PR_NUMBER = faker.number.int({ min: 1, max: 100});
		CI_SHA = faker.git.commitSha();
		CI_SHA_SHORT = faker.git.commitSha().slice(0, 8);
		CURRENT_BRANCH = faker.git.branch();

		({ DATE } = await import('@/utils/constants/DATE'));
		({ DATE_HASH } = await import('@/utils/constants/DATE_HASH'));
		({ DATETIME_HASH } = await import('@/utils/constants/DATETIME_HASH'));

		mockEnv('RELEASE_PR_PRERELEASE_PREID')
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_PREID)
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_PREID)
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
		({ PR_PRERELEASE_PREID } = await import('./PR_PRERELEASE_PREID'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_PR_PRERELEASE_PREID = null;
		RELEASE_PR_PRERELEASE_LABEL = null;
		CI_PR_NUMBER = null;
		CI_SHA = null;
		CI_SHA_SHORT = null;
		DATE = null;
		DATE_HASH = null;
		DATETIME_HASH = null;
		PR_PRERELEASE_PREID = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof PR_PRERELEASE_PREID).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should use the provided preid given RELEASE_PR_PRERELEASE_PREID', () => {
    expect(PR_PRERELEASE_PREID).toBe(RELEASE_PR_PRERELEASE_PREID);
  });

	it('should use CURRENT_BRANCH when RELEASE_PR_PRERELEASE_STRATEGY is "branch"', () => {
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(CURRENT_BRANCH ?? ''));
  });

	it('should use CURRENT_BRANCH and DATE_HASH when RELEASE_PR_PRERELEASE_STRATEGY is "branch.date"', () => {
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(`${CURRENT_BRANCH}.${DATE_HASH}`));
  });

	it('should use COMMIT_SHA_SHORT when RELEASE_PR_PRERELEASE_STRATEGY is "commit"', () => {
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(CI_SHA_SHORT ?? ''));
  });

  it('should use COMMIT_SHA when RELEASE_PR_PRERELEASE_STRATEGY is "commitfull"', () => {
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(CI_SHA ?? ''));
  });

  it('should use DATETIME_HASH when RELEASE_PR_PRERELEASE_STRATEGY is "datetime"', () => {
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(DATETIME_HASH ?? ''));
  });

	it('should use DATE_HASH when RELEASE_PR_PRERELEASE_STRATEGY is "date"', () => {
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(DATE_HASH ?? ''));
  });

  it('should use RELEASE_PR_PRERELEASE_LABEL, PR_NUMBER, and DATE_HASH when RELEASE_PR_PRERELEASE_STRATEGY is "default.date"', () => {
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(`${PrPrereleaseLabel.default}.${String(CI_PR_NUMBER) ?? ''}.${DATE_HASH ?? ''}`));
  });

  it('should use RELEASE_PR_PRERELEASE_LABEL and PR_NUMBER when RELEASE_PR_PRERELEASE_STRATEGY is "default"', () => {
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(`${PrPrereleaseLabel.default}.${String(CI_PR_NUMBER) ?? ''}`));
  });

  it('should use RELEASE_PR_PRERELEASE_LABEL and PR_NUMBER when no relevant environment variables are set', () => {
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(`${PrPrereleaseLabel.default}.${String(CI_PR_NUMBER) ?? ''}`));
  });

  it('should never omit the label when the strategy is a default strategy', () => {
    expect(PR_PRERELEASE_PREID).not.toBe('');
    expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(PrPrereleaseLabel.default));
  });
});
