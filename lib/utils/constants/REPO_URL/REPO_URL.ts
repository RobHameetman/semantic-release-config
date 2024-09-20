import { readFile as _readFile } from 'fs';
import { promisify } from 'util';
import { isString, isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@/utils/functions/environment/env';

let __REPO_URL__ = env('RELEASE_REPOSITORY_URL');

if (isUndefined(__REPO_URL__)) {
	const { npm_package_homepage, npm_package_json, npm_package_repository_url } = process.env;

	if (npm_package_repository_url || npm_package_homepage) {
		__REPO_URL__ = npm_package_repository_url
			? npm_package_repository_url
			: npm_package_homepage;
	} else {
		const readFile = promisify(_readFile);

		try {
			const pkg = await readFile(npm_package_json || `${process.cwd()}/package.json`, 'utf8');
			const { name, homepage = `https://www.npmjs.com/package/${name}`, repository } = JSON.parse(pkg || '{}');

			__REPO_URL__ = isString(repository) && repository.length
				? repository
				: isString(repository?.url) && repository.url.length
					? repository.url
					: homepage;
		} catch (err) {
			__REPO_URL__ = 'https://www.npmjs.com/';
		}
	}
}

/**
 * The URL of the repository where the release is being published from.
 *
 * @defaultValue - The repository URL from the `package.json` file. If the
 * `npm_package_repository_url` environment variable is set, it will be used
 * instead.
 *
 * @example
 * ```yaml
 * # .github/workflows/publish.yml file
 * RELEASE_REPOSITORY_URL=https://github.com/owner/repo
 * ```
 */
export const REPO_URL = __REPO_URL__;
