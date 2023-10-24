import { readFileSync } from 'fs';
import type { Options } from 'semantic-release';
import { env } from '@utils/functions/env';
import { isEnvTrue } from '@utils/functions/isEnvTrue';

type PartialConfig = Pick<Options, 'branches' | 'plugins'>;

// console.log(Object.entries(process.env).filter(([key]) => key.startsWith('RELEASE_') || key.startsWith('npm_')).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}));

const getRepositoryUrl = () => {
	const { npm_package_json, npm_package_repository_url } = process.env;

	if (npm_package_repository_url) {
		return npm_package_repository_url;
	}

	const pkg = readFileSync(npm_package_json || '', 'utf8');
	const { repository } = JSON.parse(pkg);

	if (typeof repository === 'string') {
		return repository;
	}

	console.log(repository.url);

	return repository.url;
}

export const createConfig = (config: PartialConfig) => ({
	...config,
	debug: env('RELEASE_DEBUG', isEnvTrue),
	repositoryUrl: env('RELEASE_REPOSITORY_URL') || getRepositoryUrl(),
	tagFormat: '${version}',
	dryRun: env('RELEASE_DRY_RUN', isEnvTrue),
	ci: !env('RELEASE_LOCALLY', isEnvTrue),
});
