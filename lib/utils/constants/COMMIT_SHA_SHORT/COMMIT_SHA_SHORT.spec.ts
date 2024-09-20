import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

describe('COMMIT_SHA_SHORT', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let CI_SHA: string | null = null;
	let CI_SHA_SHORT: string | null = null;
	let CI_COMMIT_SHORT_SHA: string | null = null;
	let COMMIT_SHA_SHORT: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		CI_SHA = faker.git.commitSha();
		CI_SHA_SHORT = faker.git.commitSha().slice(0, 7);
		CI_COMMIT_SHORT_SHA = faker.git.commitSha().slice(0, 7);

		mockEnv('CI_SHA_SHORT')
			.mockReturnValueOnce(CI_SHA_SHORT)
			.mockReturnValueOnce(CI_SHA_SHORT)
			.mockReturnValue(undefined);

		mockEnv('CI_COMMIT_SHORT_SHA')
			.mockReturnValueOnce(CI_COMMIT_SHORT_SHA)
			.mockReturnValue(undefined);

		mockEnv('CI_SHA')
			.mockReturnValueOnce(CI_SHA)
			.mockReturnValueOnce(CI_SHA)
			.mockReturnValueOnce(CI_SHA)
			.mockReturnValueOnce(CI_SHA)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ COMMIT_SHA_SHORT } = await import('./COMMIT_SHA_SHORT'));
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
		CI_COMMIT_SHORT_SHA = null;
		COMMIT_SHA_SHORT = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof COMMIT_SHA_SHORT).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "CI_SHA_SHORT" environment variable is provided', () => {
		expect(COMMIT_SHA_SHORT).toBe(CI_SHA_SHORT);
	});

	it('should also check for the "CI_COMMIT_SHORT_SHA" environment variable', () => {
		expect(COMMIT_SHA_SHORT).toBe(CI_COMMIT_SHORT_SHA);
	});

	it('should be the shortened value of "COMMIT_SHA" by default when none of these environment variables are provided', () => {
		expect(COMMIT_SHA_SHORT).toBe(CI_SHA?.slice(0, 8));
	});

	it('should be undefined when none of these environment variables are provided and COMMIT_SHA is undefined', () => {
		expect(COMMIT_SHA_SHORT).toBeUndefined();
	});
});
