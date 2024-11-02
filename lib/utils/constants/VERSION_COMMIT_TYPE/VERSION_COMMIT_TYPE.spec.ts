import { mockEnv } from '@@/utils/mockEnv';

describe('VERSION_COMMIT_TYPE', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_COMMIT_TYPE: string | null = null;
	let DEFAULT_VERSION_COMMIT_TYPE: unknown = null;
	let VERSION_COMMIT_TYPE: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_COMMIT_TYPE = 'testing';

		mockEnv('RELEASE_COMMIT_TYPE')
			.mockReturnValueOnce(RELEASE_COMMIT_TYPE)
			.mockReturnValueOnce(RELEASE_COMMIT_TYPE)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ DEFAULT_VERSION_COMMIT_TYPE, VERSION_COMMIT_TYPE } = await import('./VERSION_COMMIT_TYPE'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_COMMIT_TYPE = null;
		DEFAULT_VERSION_COMMIT_TYPE = null;
		VERSION_COMMIT_TYPE = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof VERSION_COMMIT_TYPE).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_COMMIT_TYPE" environment variable is provided', () => {
		expect(VERSION_COMMIT_TYPE).toBe(RELEASE_COMMIT_TYPE);
	});

	it(`should be "version" by default when the "RELEASE_COMMIT_TYPE" environment variable is not provided`, () => {
		expect(VERSION_COMMIT_TYPE).toBe(DEFAULT_VERSION_COMMIT_TYPE);
	});
});
