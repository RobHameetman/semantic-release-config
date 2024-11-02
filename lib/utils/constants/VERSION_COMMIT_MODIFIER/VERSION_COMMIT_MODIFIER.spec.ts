import { mockEnv } from '@@/utils/mockEnv';

describe('VERSION_COMMIT_MODIFIER', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_COMMIT_MODIFIER: string | null = null;
	let DEFAULT_VERSION_COMMIT_MODIFIER: unknown = null;
	let VERSION_COMMIT_MODIFIER: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_COMMIT_MODIFIER = 'skip test';

		mockEnv('RELEASE_COMMIT_MODIFIER')
			.mockReturnValueOnce(RELEASE_COMMIT_MODIFIER)
			.mockReturnValueOnce(RELEASE_COMMIT_MODIFIER)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ DEFAULT_VERSION_COMMIT_MODIFIER, VERSION_COMMIT_MODIFIER } = await import('./VERSION_COMMIT_MODIFIER'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_COMMIT_MODIFIER = null;
		DEFAULT_VERSION_COMMIT_MODIFIER = null;
		VERSION_COMMIT_MODIFIER = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof VERSION_COMMIT_MODIFIER).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_COMMIT_MODIFIER" environment variable is provided', () => {
		expect(VERSION_COMMIT_MODIFIER).toBe(RELEASE_COMMIT_MODIFIER);
	});

	it(`should be "skip ci" by default when the "RELEASE_COMMIT_MODIFIER" environment variable is not provided`, () => {
		expect(VERSION_COMMIT_MODIFIER).toBe(DEFAULT_VERSION_COMMIT_MODIFIER);
	});
});
