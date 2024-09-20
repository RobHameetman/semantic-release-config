import { readFile as _readFile } from 'fs';
import { promisify } from 'util';
import { isString, isUndefined } from '@rob.hameetman/type-guards';
import { env } from '@/utils/functions/environment/env';

export let REPO_URL = env('RELEASE_REPOSITORY_URL');

if (isUndefined(REPO_URL)) {
	const { npm_package_json, npm_package_repository_url } = process.env;

	if (npm_package_repository_url) {
		REPO_URL = npm_package_repository_url;
	} else {
		const readFile = promisify(_readFile);

		const pkg = await readFile(npm_package_json || `${process.cwd()}/package.json`, 'utf8');
		const { repository } = JSON.parse(pkg);

		REPO_URL = isString(repository)
			? repository
			: repository?.url;
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
export default REPO_URL;
