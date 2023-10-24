import type { PluginSpec } from 'semantic-release';
import { env } from '@utils/functions/env';
import { isEnvTrue } from '@utils/functions/isEnvTrue';

export const updateVersionAndPublishToRegistry = (
	pkgRoot = env('RELEASE_PUBLISH_FROM_DIST', isEnvTrue) ? 'dist' : '.',
) => ([
	'@semantic-release/npm', {
		pkgRoot,
	},
] as PluginSpec);
