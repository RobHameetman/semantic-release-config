import { readFileSync as _readFileSync } from 'fs';
import { isString } from '@rob.hameetman/type-guards';

/**
 * Functional dependencies used in the {@link getRepositoryUrl()} function. This
 * object is provided in tests for mocking and spying.
 */
export interface GetRepositoryUrlDependencies {
	/**
	 * [Optional] Synchronously reads the entire contents of a file.
	 */
	readonly readFileSync?: typeof _readFileSync;
}

/**
 * Get the repository URL from the `package.json` file. If the
 * `npm_package_repository_url` environment variable is set, it will be used
 * instead.
 *
 * @param _dependencies - [Optional] Used in tests for mocking and spying.
 * Defaults to `{}`.
 *
 * @returns The repository URL.
 *
 * @privateRemarks This function uses `readFileSync()` instead of `import()`
 * because of an issue with TypeScript in which an error that the import must be
 * explicitly typed as JSON is thrown even when the import is typed as JSON via
 * `import(path, { assert: { type: 'json' }})`.
 */
export const getRepositoryUrl = (_dependencies: GetRepositoryUrlDependencies = {}) => {
	const { readFileSync = _readFileSync } = _dependencies;

	const { npm_package_json, npm_package_repository_url } = process.env;

	if (npm_package_repository_url) {
		return npm_package_repository_url;
	}

	const pkg = readFileSync(npm_package_json || `${process.cwd()}/package.json`, 'utf8');
	const { repository } = JSON.parse(pkg);

	return isString(repository)
		? repository
		: repository.url;
};
