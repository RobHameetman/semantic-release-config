import { ReleaseRules } from '@/utils/types/misc/ReleaseRules';

describe('CONDITIONAL_RELEASE_RULES', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let CONDITIONAL_RELEASE_RULES: unknown = null;
	let releaseTypesWithEnvValues: ReadonlyArray<unknown> | null = null;
	let releaseTypesWithoutEnvValues: ReadonlyArray<unknown> | null = null;
	let versionIncrementTypesAreConditional: boolean | null = null;

	beforeAll(() => {
		processEnv = process.env;

		Object.defineProperties(process.env, {
			RELEASE_DEPRECATE_AS_MINOR_VERSION: {
				get: jest.fn()
					.mockReturnValueOnce('true')
					.mockReturnValueOnce('true')
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce('true')
					.mockReturnValueOnce('true')
					.mockReturnValue(undefined)
			},
			RELEASE_SKIP_README_UPDATES: {
				get: jest.fn()
					.mockReturnValueOnce('true')
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce('true')
					.mockReturnValue(undefined)
			},
			RELEASE_VERSION_AS_TYPE: {
				get: jest.fn()
					.mockReturnValueOnce('true')
					.mockReturnValueOnce('true')
					.mockReturnValueOnce('true')
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce('true')
					.mockReturnValueOnce('true')
					.mockReturnValueOnce('true')
					.mockReturnValue(undefined)
			},
		});
	});

	beforeEach(async () => {
		({ CONDITIONAL_RELEASE_RULES } = await import('./conditional'));

		releaseTypesWithEnvValues = (CONDITIONAL_RELEASE_RULES as ReleaseRules).map(({ release }) => release) as ReadonlyArray<unknown>;
		jest.resetModules();

		({ CONDITIONAL_RELEASE_RULES } = await import('./conditional'));
		releaseTypesWithoutEnvValues = (CONDITIONAL_RELEASE_RULES as ReleaseRules).map(({ release }) => release) as ReadonlyArray<unknown>;

		versionIncrementTypesAreConditional = releaseTypesWithoutEnvValues.every((value, index) => value !== releaseTypesWithEnvValues?.[index]);
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();

		releaseTypesWithEnvValues = null;
		releaseTypesWithoutEnvValues = null;
		versionIncrementTypesAreConditional = null;
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;
	});

	it('should be an array', () => {
		expect(CONDITIONAL_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should set a version increment type conditionally in each rule', () => {
		expect(versionIncrementTypesAreConditional).toBe(true);
	});
});
