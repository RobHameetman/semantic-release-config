import { isObject, isString } from '@rob.hameetman/type-guards';
import { onTest } from '@test/utils/onTest';
import { getRepositoryUrl } from './getRepositoryUrl';

describe('getRepositoryUrl()', () => {
	let mockReadFileSync: jest.Mock | null = null;
	let error: Error | null = null;
	let repository: Record<string, string> | string | null = null;
	let result: unknown = null;
	let index = 1;

	beforeEach(() => {
		try {
			repository = 'https://github.com/Test/url-from-package-json';

			onTest(index, {
				1: () => {
					process.env.npm_package_repository_url = 'https://github.com/Test/url-from-env-variable';
					process.env.npm_package_json = '/path/to/package.json';
				},
				2: () => {
					process.env.npm_package_json = '/path/to/package.json';
				},
				3: () => {},
				4: () => {
					repository = `${repository}-repository-string`;
				},
				5: () => {
					repository = {
						url: `${repository}-repository-object`,
					};
				},
			});

			mockReadFileSync = jest.fn(() =>
				JSON.stringify({ repository }),
			);

			result = getRepositoryUrl({ readFileSync: mockReadFileSync });
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		delete process.env.npm_package_repository_url;
		delete process.env.npm_package_json;

		error = null;
		result = null;
		repository = null;

		index++;
	});

	it('should return the url set by the "npm_package_repository_url" environment variable when this environment variable is defined', () => {
		expect(index).toBe(1);
		expect(error).toBeNull();

		expect(result).toBe(process.env.npm_package_repository_url);
		expect(mockReadFileSync).not.toBeCalled();
	});

	it('should use the "npm_package_json" environment variable when this environment variable is defined', () => {
		expect(index).toBe(2);
		expect(error).toBeNull();

		expect(mockReadFileSync).toBeCalledWith(process.env.npm_package_json, 'utf8');
	});

	it('should use `${process.cwd()}/package.json` by default when the "npm_package_json" environment variable is not defined', () => {
		expect(index).toBe(3);
		expect(error).toBeNull();

		expect(mockReadFileSync).toBeCalledWith(`${process.cwd()}/package.json`, 'utf8');
	});

	it('should return the url in package.json correctly when the "repository" field is a string', () => {
		expect(index).toBe(4);
		expect(error).toBeNull();

		expect(isString(repository)).toBe(true);
		expect(isString(result)).toBe(true);
		expect(result).toBe(repository);
	});

	it('should return the url in package.json correctly when the "repository" field is an object with a "url" field', () => {
		expect(index).toBe(5);
		expect(error).toBeNull();

		expect(isObject(repository)).toBe(true);
		expect(isString(result)).toBe(true);
		expect(result).toBe((repository as Record<string, string>).url);
	});
});
