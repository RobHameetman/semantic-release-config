import { faker } from '@faker-js/faker';
import { randomDefaultPrPrereleaseStrategy, randomNonDefaultPrPrereleaseStrategy, randomPrPrereleaseStrategy } from '@/utils/enums/PrPrereleaseStrategy/__test__';
import { PrPrereleaseLabel } from '@/utils/enums/PrPrereleaseLabel';
import { mockEnv } from '@@/utils/mockEnv';

describe('PR_PRERELEASE_LABEL', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_PR_PRERELEASE_LABEL: string | null = null;
	let PR_PRERELEASE_LABEL: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_PR_PRERELEASE_LABEL = faker.word.noun().toLowerCase();

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
			.mockReturnValue(randomDefaultPrPrereleaseStrategy());
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
});
