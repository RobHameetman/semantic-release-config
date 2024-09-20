import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

describe('PR_PRERELEASE_PREID', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_PR_PRERELEASE_PREID: string | undefined | null = null;
	let RELEASE_PR_PRERELEASE_TYPE: string | undefined | null = null;
	let CI_PR_NUMBER: number | undefined | null = null;
	let CI_SHA_SHORT: string | undefined | null = null;
	let PR_PRERELEASE_PREID: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_PR_PRERELEASE_PREID = faker.word.noun();
		RELEASE_PR_PRERELEASE_TYPE = faker.word.noun();
		CI_PR_NUMBER = faker.number.int({ min: 1, max: 100});
		CI_SHA_SHORT = faker.git.commitSha().slice(0, 8);

		mockEnv('RELEASE_PR_PRERELEASE_PREID')
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_PREID)
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_PREID)
			.mockReturnValue(undefined);

		mockEnv('RELEASE_PR_PRERELEASE_TYPE')
			.mockReturnValue(RELEASE_PR_PRERELEASE_TYPE);

		mockEnv('CI_PR_NUMBER')
			.mockReturnValue(String(CI_PR_NUMBER));

		mockEnv('CI_SHA_SHORT')
			.mockReturnValue(CI_SHA_SHORT);
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
		RELEASE_PR_PRERELEASE_TYPE = null;
		CI_PR_NUMBER = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof PR_PRERELEASE_PREID).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_PR_PRERELEASE_PREID" environment variable is provided', () => {
		expect(PR_PRERELEASE_PREID).toBe(RELEASE_PR_PRERELEASE_PREID);
	});

	it('should use the PR number by default when the "RELEASE_PR_PRERELEASE_PREID" environment variable is not provided', () => {
		expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(String(CI_PR_NUMBER) ?? ''));
	});

	it('should use the PR prerelease type by default when the "RELEASE_PR_PRERELEASE_PREID" environment variable is not provided', () => {
		expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(RELEASE_PR_PRERELEASE_TYPE ?? ''));
	});

	it('should use the short commit SHA by default when the "RELEASE_PR_PRERELEASE_PREID" environment variable is not provided', () => {
		expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringContaining(CI_SHA_SHORT ?? ''));
	});
});
