import { isBoolean } from '@rob.hameetman/type-guards';
import { mockEnv } from '#$/utils/mockEnv';

describe('PROVENANCE_ENABLED', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let PROVENANCE_ENABLED: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		mockEnv('RELEASE_DISABLE_PROVENANCE')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ PROVENANCE_ENABLED } = await import('./PROVENANCE_ENABLED'));
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
		expect(process.env.RELEASE_DISABLE_PROVENANCE).not.toBeUndefined();
		expect(isBoolean(PROVENANCE_ENABLED)).toBe(true);
	});

	it('should be false when explicitly disabled', () => {
		expect(process.env.RELEASE_DISABLE_PROVENANCE).not.toBeUndefined();
		expect(PROVENANCE_ENABLED).toBe(false);
	});

	it('should be true by default', () => {
		expect(process.env.RELEASE_DISABLE_PROVENANCE).toBeUndefined();
		expect(PROVENANCE_ENABLED).toBe(true);
	});
});
