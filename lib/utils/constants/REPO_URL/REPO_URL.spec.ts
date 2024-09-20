import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

const { PACKAGE_JSON_HOMEPAGE, PACKAGE_JSON_REPOSITORY_URL, getMockPromisify } = (() => {
	const PACKAGE_JSON_REPOSITORY_URL = faker.internet.url();
	const PACKAGE_JSON_HOMEPAGE = faker.internet.url();

	const MOCK_PACKAGE_JSON_WITH_REPOSITORY_URL = JSON.stringify({
		name: '@test/package',
		version: '1.0.0',
		repository: {
			type: 'git',
			url: PACKAGE_JSON_REPOSITORY_URL,
		}
	});

	const MOCK_PACKAGE_JSON_WITH_REPOSITORY = JSON.stringify({
		name: '@test/package',
		version: '1.0.0',
		repository: PACKAGE_JSON_REPOSITORY_URL
	});

	const MOCK_PACKAGE_JSON_WITH_HOMEPAGE = JSON.stringify({
		name: '@test/package',
		version: '1.0.0',
		homepage: PACKAGE_JSON_HOMEPAGE,
	});

	const MOCK_PACKAGE_JSON_WITHOUT_REPOSITORY_URL = JSON.stringify({
		name: '@test/package',
		version: '1.0.0',
	});

	const mockPromisify = jest.fn()
		.mockResolvedValueOnce(MOCK_PACKAGE_JSON_WITH_REPOSITORY_URL)
		.mockRejectedValueOnce('ENOENT: no such file or directory')
		.mockResolvedValueOnce({ stdout: 'git@github.com:TestOrg/test.git' })
		.mockResolvedValueOnce(MOCK_PACKAGE_JSON_WITH_REPOSITORY_URL)
		.mockResolvedValueOnce(MOCK_PACKAGE_JSON_WITH_REPOSITORY)
		.mockResolvedValueOnce(MOCK_PACKAGE_JSON_WITH_HOMEPAGE)
		.mockResolvedValue(MOCK_PACKAGE_JSON_WITHOUT_REPOSITORY_URL);

	return {
		PACKAGE_JSON_HOMEPAGE,
		PACKAGE_JSON_REPOSITORY_URL,
		getMockPromisify: () => mockPromisify,
	};
})();

jest.unstable_mockModule('util', () => ({
  promisify: jest.fn().mockReturnValue(getMockPromisify()),
}));

describe('REPO_URL', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let npm_package_homepage: string | undefined | null = null;
	let npm_package_repository_url: string | undefined | null = null;
	let RELEASE_REPOSITORY_URL: string | undefined | null = null;
	let REPO_URL: string | undefined | null = null;

	beforeAll(() => {
		processEnv = process.env;

		npm_package_homepage = faker.internet.url();
		npm_package_repository_url = faker.internet.url();
		RELEASE_REPOSITORY_URL = faker.internet.url();

		mockEnv('RELEASE_REPOSITORY_URL')
			.mockReturnValueOnce(RELEASE_REPOSITORY_URL)
			.mockReturnValueOnce(RELEASE_REPOSITORY_URL)
			.mockReturnValue(undefined);

		mockEnv('npm_package_repository_url')
			.mockReturnValueOnce(npm_package_repository_url)
			.mockReturnValue(undefined);

		mockEnv('npm_package_homepage')
			.mockReturnValueOnce(undefined)
			.mockReturnValueOnce(npm_package_homepage)
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

		npm_package_homepage = null;
		npm_package_repository_url = null;
		RELEASE_REPOSITORY_URL = null;
		REPO_URL = null;
	});

	it('should be a non-empty string', () => {
		expect(typeof REPO_URL).toBe('string');
		expect(REPO_URL?.length).toBeGreaterThan(0);
	});

	it('should be defined when the "RELEASE_REPOSITORY_URL" environment variable is provided', () => {
		expect(REPO_URL).toBe(RELEASE_REPOSITORY_URL);
	});

	it('should also check for the "npm_package_repository_url" environment variable', () => {
		expect(REPO_URL).toBe(npm_package_repository_url);
	});

	it('should also check for the "npm_package_homepage" environment variable', () => {
		expect(REPO_URL).toBe(npm_package_homepage);
	});

	it('should check package.json when none of these environment variables are defined', () => {
		expect(getMockPromisify()).toBeCalledWith(expect.stringContaining('package.json'), 'utf8');
	});

	it('should use the NPM registry homepage url by default when no package.json file is found', () => {
		expect(getMockPromisify()).toBeCalledWith('git ls-remote --get-url origin')
		expect(REPO_URL).toBe('git@github.com:TestOrg/test.git');
	});

	it('should use "repository.url" in package.json when the "repository" field is an object with a non-empty "url" field', () => {
		expect(REPO_URL).toBe(PACKAGE_JSON_REPOSITORY_URL);
	});

	it('should use "repository" in package.json when the "repository" field is not an object with a non-empty "url" field', () => {
		expect(REPO_URL).toBe(PACKAGE_JSON_REPOSITORY_URL);
	});

	it('should use "homepage" in package.json when the "repository" field is not defined', () => {
		expect(REPO_URL).toBe(PACKAGE_JSON_HOMEPAGE);
	});

	it('should default to the relevant NPM registry url when the "repository" and "homepage" fields are not defined', () => {
		expect(REPO_URL).toBe('https://www.npmjs.com/package/@test/package');
	});
});
