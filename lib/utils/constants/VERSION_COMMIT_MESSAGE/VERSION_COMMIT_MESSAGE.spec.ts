import { mockEnv } from '@@/utils/mockEnv';

describe('VERSION_COMMIT_MESSAGE', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_COMMIT_MESSAGE: string | null = null;
	let DEFAULT_VERSION_COMMIT_MESSAGE: unknown = null;
	let VERSION_COMMIT_MESSAGE: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_COMMIT_MESSAGE = 'test';

		mockEnv('RELEASE_COMMIT_MESSAGE')
			.mockReturnValueOnce(RELEASE_COMMIT_MESSAGE)
			.mockReturnValueOnce(RELEASE_COMMIT_MESSAGE)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ DEFAULT_VERSION_COMMIT_MESSAGE, VERSION_COMMIT_MESSAGE } = await import('./VERSION_COMMIT_MESSAGE'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_COMMIT_MESSAGE = null;
		DEFAULT_VERSION_COMMIT_MESSAGE = null;
		VERSION_COMMIT_MESSAGE = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof VERSION_COMMIT_MESSAGE).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_COMMIT_MESSAGE" environment variable is provided', () => {
		expect(VERSION_COMMIT_MESSAGE).toBe(RELEASE_COMMIT_MESSAGE);
	});

	it(`should be "dist" by default when the "RELEASE_COMMIT_MESSAGE" environment variable is not provided`, () => {
		expect(VERSION_COMMIT_MESSAGE).toBe(DEFAULT_VERSION_COMMIT_MESSAGE);
	});
});
