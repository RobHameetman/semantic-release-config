import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';

export const REPO_TOKEN = env('CI_TOKEN', envOr([
	'GITHUB_TOKEN',
	'GH_TOKEN',
	'GITLAB_TOKEN',
	'BITBUCKET_TOKEN',
]));
