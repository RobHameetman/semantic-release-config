import { isBoolean } from '@rob.hameetman/type-guards';
import { mockEnv } from '@@/utils/mockEnv';

describe('PUBLISH_FROM_DIST', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let PUBLISH_FROM_DIST: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		mockEnv('RELEASE_PUBLISH_FROM_DIST')
			.mockReturnValueOnce('true')
			.mockReturnValueOnce('true')
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ PUBLISH_FROM_DIST } = await import('./PUBLISH_FROM_DIST'));
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
		expect(isBoolean(PUBLISH_FROM_DIST)).toBe(true);
	});

	it('should be true when the "RELEASE_PUBLISH_FROM_DIST" environment variable is true', () => {
		expect(PUBLISH_FROM_DIST).toBe(true);
	});

	it('should default to false when the "RELEASE_PUBLISH_FROM_DIST" environment variable is not defined', () => {
		expect(PUBLISH_FROM_DIST).toBe(false);
	});
});
