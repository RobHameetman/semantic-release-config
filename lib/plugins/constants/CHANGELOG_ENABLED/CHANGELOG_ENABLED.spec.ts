import { isBoolean } from '@rob.hameetman/type-guards';
import { mockEnv } from '@@/utils/mockEnv';

describe('CHANGELOG_ENABLED', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let CHANGELOG_ENABLED: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		mockEnv('RELEASE_DISABLE_CHANGELOG')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ CHANGELOG_ENABLED } = await import('./CHANGELOG_ENABLED'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;
	});

	it('should be a boolean', () => {
		expect(process.env.RELEASE_DISABLE_CHANGELOG).not.toBeUndefined();
		expect(isBoolean(CHANGELOG_ENABLED)).toBe(true);
	});

	it('should be false when explicitly disabled', () => {
		expect(process.env.RELEASE_DISABLE_CHANGELOG).not.toBeUndefined();
		expect(CHANGELOG_ENABLED).toBe(false);
	});

	it('should be true by default', () => {
		expect(process.env.RELEASE_DISABLE_CHANGELOG).toBeUndefined();
		expect(CHANGELOG_ENABLED).toBe(true);
	});
});
