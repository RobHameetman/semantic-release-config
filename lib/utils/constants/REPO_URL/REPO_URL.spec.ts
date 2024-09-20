import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

const { PACKAGE_JSON_REPOSITORY_URL, getMockReadFile } = (() => {
	const PACKAGE_JSON_REPOSITORY_URL = faker.internet.url();

	const MOCK_PACKAGE_JSON_WITH_REPOSITORY = JSON.stringify({
		name: '@test/package',
		version: '1.0.0',
		repository: {
			type: 'git',
			url: PACKAGE_JSON_REPOSITORY_URL,
		}
	});

	const MOCK_PACKAGE_JSON_WITHOUT_REPOSITORY = JSON.stringify({
		name: '@test/package',
		version: '1.0.0',
	});

	const mockReadFile = jest.fn()
		.mockResolvedValueOnce(MOCK_PACKAGE_JSON_WITH_REPOSITORY)
		.mockResolvedValueOnce(MOCK_PACKAGE_JSON_WITH_REPOSITORY)
		.mockResolvedValue(MOCK_PACKAGE_JSON_WITHOUT_REPOSITORY)

	return {
		PACKAGE_JSON_REPOSITORY_URL,
		getMockReadFile: () => mockReadFile,
	};
})();

jest.unstable_mockModule('util', () => ({
  promisify: jest.fn().mockReturnValue(getMockReadFile()),
}));

describe('REPO_URL', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let RELEASE_REPOSITORY_URL: string | undefined | null = null;
	let REPO_URL: unknown = null;

	beforeAll(() => {
		processEnv = process.env;

		RELEASE_REPOSITORY_URL = faker.internet.url();

		mockEnv('RELEASE_REPOSITORY_URL')
			.mockReturnValueOnce(RELEASE_REPOSITORY_URL)
			.mockReturnValueOnce(RELEASE_REPOSITORY_URL)
			.mockReturnValue(undefined);
	});

	beforeEach(async () => {
		({ REPO_URL } = await import('./REPO_URL'));
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;

		RELEASE_REPOSITORY_URL = null;
		REPO_URL = null;
	});

	it('should be a string or undefined', () => {
		expect(typeof REPO_URL).toStrictEqual(expect.stringMatching(/string|undefined/));
	});

	it('should be defined when the "RELEASE_REPOSITORY_URL" environment variable is provided', () => {
		expect(REPO_URL).toBe(RELEASE_REPOSITORY_URL);
	});

	it('should check the project\'s package.json file when none of these environment variables are defined', () => {
		expect(getMockReadFile()).toBeCalledWith(expect.stringContaining('package.json'), 'utf8');
	});

	it('should be defined when the package.json file has a defined "repository"', () => {
		expect(REPO_URL).toBe(PACKAGE_JSON_REPOSITORY_URL);
	});

	it('should be undefined when the package.json file does not have a defined "repository"', () => {
		expect(REPO_URL).toBeUndefined();
	});
});
