import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';

export const COMMIT_SHA = env('CI_SHA', envOr([
	'CI_COMMIT_SHA',
	'GITHUB_SHA',
	'GIT_COMMIT',
	'CIRCLE_SHA1',
	'TRAVIS_COMMIT',
	'BITBUCKET_COMMIT',
	'BUILD_SOURCEVERSION',
]));
