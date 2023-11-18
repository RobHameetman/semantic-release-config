export const MINOR_RELEASE_RULES = [
	/**
	 * Defaults
	 */
	{ type: 'feat', release: 'minor' },
	{ tag: 'FEATURE', release: 'minor' },
	{ tag: 'Update', release: 'minor' },
	{ tag: 'New', release: 'minor' },
	{ type: 'FEAT', release: 'minor' },
	/**
	 * @example
	 * "minor(auth): Add auth feature [PROJ-1234]"
	 */
	{ type: 'minor', release: 'minor' },
	/**
	 * @example
	 * "feat(minor): Add auth feature [PROJ-1234]"
	 */
	{ scope: 'minor', release: 'minor' },
	/**
	 * @example
	 * "release(1.2.0): Add auth feature [PROJ-1234]"
	 */
	{ type: 'release', scope: '?([1-9])+([0-9]).+([1-9])*([0-9]).0', release: 'minor' },
	/**
	 * @example
	 * "release: 1.2.0 - Add auth feature [PROJ-1234]"
	 */
	{ type: 'release', subject: '?([1-9])+([0-9]).+([1-9])*([0-9]).0?( - *)', release: 'minor' },
];
