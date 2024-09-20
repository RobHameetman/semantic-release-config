import { mockEnv } from '@@/utils/mockEnv';

describe('BUILD_DIRECTORY', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_BUILD_DIRECTORY: string | null = null;
	let DEFAULT_BUILD_DIRECTORY: unknown = null;
	let BUILD_DIRECTORY: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_BUILD_DIRECTORY = 'test';

		mockEnv('RELEASE_BUILD_DIRECTORY')
			.mockReturnValueOnce(RELEASE_BUILD_DIRECTORY)
			.mockReturnValueOnce(RELEASE_BUILD_DIRECTORY)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ DEFAULT_BUILD_DIRECTORY, BUILD_DIRECTORY } = await import('./BUILD_DIRECTORY'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_BUILD_DIRECTORY = null;
		DEFAULT_BUILD_DIRECTORY = null;
		BUILD_DIRECTORY = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof BUILD_DIRECTORY).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_BUILD_DIRECTORY" environment variable is provided', () => {
		expect(BUILD_DIRECTORY).toBe(RELEASE_BUILD_DIRECTORY);
	});

	it(`should be "dist" by default when the "RELEASE_BUILD_DIRECTORY" environment variable is not provided`, () => {
		expect(BUILD_DIRECTORY).toBe(DEFAULT_BUILD_DIRECTORY);
	});
});
