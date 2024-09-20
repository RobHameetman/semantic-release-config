import { mockEnv } from '@@/utils/mockEnv';

describe('PR_PRERELEASE_TYPE', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_PR_PRERELEASE_TYPE: string | null = null;
	let DEFAULT_PR_PRERELEASE_TYPE: unknown = null;
	let PR_PRERELEASE_TYPE: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_PR_PRERELEASE_TYPE = 'test';

		mockEnv('RELEASE_PR_PRERELEASE_TYPE')
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_TYPE)
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_TYPE)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ DEFAULT_PR_PRERELEASE_TYPE, PR_PRERELEASE_TYPE } = await import('./PR_PRERELEASE_TYPE'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_PR_PRERELEASE_TYPE = null;
		DEFAULT_PR_PRERELEASE_TYPE = null;
		PR_PRERELEASE_TYPE = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof PR_PRERELEASE_TYPE).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_PR_PRERELEASE_TYPE" environment variable is provided', () => {
		expect(PR_PRERELEASE_TYPE).toBe(RELEASE_PR_PRERELEASE_TYPE);
	});

	it(`should be "dist" by default when the "RELEASE_PR_PRERELEASE_TYPE" environment variable is not provided`, () => {
		expect(PR_PRERELEASE_TYPE).toBe(DEFAULT_PR_PRERELEASE_TYPE);
	});
});
