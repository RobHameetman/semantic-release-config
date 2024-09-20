import { env } from '@/utils/functions/environment/env';
import { isEnvTrue } from '@/utils/functions/environment/isEnvTrue';
import { ReleaseRules } from '@/utils/types/misc/ReleaseRules';

export const CONDITIONAL_RELEASE_RULES: ReleaseRules = [
	/**
	 * @example
	 * "docs(README): Add missing environment variable [PROJ-1234]"
	 * "docs(readme): Add missing environment variable [PROJ-1234]"
	 */
	{ type: 'docs', scope: 'README|readme', release: env('RELEASE_SKIP_README_UPDATES', isEnvTrue) ? false : 'patch' },
	/**
	 * @example
	 * "deprecate(css): Mark previous design tokens for future removal [PROJ-1234]"
	 */
	{ type: 'deprecate', release: env('RELEASE_DEPRECATE_AS_MINOR_VERSION', isEnvTrue) ? 'minor' : 'patch' },
	/**
	 * @example
	 * "chore(css): Deprecate unused styles [PROJ-1234]"
	 */
	{ subject: 'Deprecate *', release: env('RELEASE_DEPRECATE_AS_MINOR_VERSION', isEnvTrue) ? 'minor' : 'patch' },
	/**
	 * @example
	 * "2.0.0: Overhaul auth implementation [PROJ-1234]"
	 * "2.0.0(release): Overhaul auth implementation [PROJ-1234]"
	 */
	{ type: '+([1-9])*([0-9]).0.0', scope: '?(release)', release: env('RELEASE_VERSION_AS_TYPE', isEnvTrue) ? 'major' : false },
	/**
	 * @example
	 * "1.2.0: Add auth feature [PROJ-1234]"
	 * "1.2.0(release): Add auth feature [PROJ-1234]"
	 */
	{ type: '[0-9]*([0-9]).+([1-9])*([0-9]).0', scope: '?(release)', release: env('RELEASE_VERSION_AS_TYPE', isEnvTrue) ? 'minor' : false },
	/**
	 * @example
	 * "1.2.1: Fix auth error [PROJ-1234]"
	 * "1.2.1(release): Fix auth error [PROJ-1234]"
	 */
	{ type: '[0-9]*([0-9]).[0-9]*([0-9]).+([1-9])*([0-9])', scope: '?(release)', release: env('RELEASE_VERSION_AS_TYPE', isEnvTrue) ? 'patch' : false },
];
