import { mockEnv } from '@@/utils/mockEnv';

describe('PR_PRERELEASE_STRATEGY', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_PR_PRERELEASE_STRATEGY: string | null = null;
	let PR_PRERELEASE_STRATEGY: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_PR_PRERELEASE_STRATEGY = 'test';

		mockEnv('RELEASE_PR_PRERELEASE_STRATEGY')
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_STRATEGY)
			.mockReturnValueOnce(RELEASE_PR_PRERELEASE_STRATEGY)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ PR_PRERELEASE_STRATEGY } = await import('./PR_PRERELEASE_STRATEGY'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_PR_PRERELEASE_STRATEGY = null;
		PR_PRERELEASE_STRATEGY = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof PR_PRERELEASE_STRATEGY).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_PR_PRERELEASE_STRATEGY" environment variable is provided', () => {
		expect(PR_PRERELEASE_STRATEGY).toBe(RELEASE_PR_PRERELEASE_STRATEGY);
	});

	it(`should be "default" when the "RELEASE_PR_PRERELEASE_STRATEGY" environment variable is not provided`, () => {
		expect(PR_PRERELEASE_STRATEGY).toBe('default');
	});
});
