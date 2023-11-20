import { ReleaseRules } from '@utils/types/ReleaseRules';

export const MAJOR_RELEASE_RULES: ReleaseRules = [
	/**
	 * Defaults
	 */
	{ breaking: true, release: 'major' },
	{ tag: 'Breaking', release: 'major' },
	/**
	 * @example
	 * "major: Overhaul auth implementation [PROJ-1234]"
	 */
	{ type: 'major', release: 'major' },
	/**
	 * @example
	 * "feat(major): Overhaul auth implementation [PROJ-1234]"
	 */
	{ scope: 'major', release: 'major' },
	/**
	 * @example
	 * "breaking: Overhaul auth implementation [PROJ-1234]"
	 */
	{ type: 'breaking', release: 'major' },
	/**
	 * @example
	 * "feat(breaking): Overhaul auth implementation [PROJ-1234]"
	 */
	{ scope: 'breaking', release: 'major' },
	/**
	 * @example
	 * "release(2.0.0): Overhaul auth implementation [PROJ-1234]"
	 */
	{ type: 'release', scope: '+([1-9])*([0-9]).0.0', release: 'major' },
	/**
	 * @example
	 * "release: 2.0.0 - Overhaul auth implementation [PROJ-1234]"
	 */
	{ type: 'release', subject: '+([1-9])*([0-9]).0.0?( - *)', release: 'major' },
];
