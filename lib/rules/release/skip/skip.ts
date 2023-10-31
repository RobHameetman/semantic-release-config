export const SKIP_RELEASE_RULES = [
	/**
	 * @example
	 * "skip: Errata [PROJ-1234]"
	 */
	{ type: 'skip', release: false },
	/**
	 * @example
	 * "release(skip): Errata [PROJ-1234]"
	 */
	{ type: 'release', scope: 'skip|none', release: false },
	/**
	 * @example
	 * "feat(skip-release): Errata [PROJ-1234]"
	 */
	{ scope: 'skip-release', release: false },
	/**
	 * @example
	 * "docs: Update API documentation [PROJ-1234]"
	 */
	{ type: 'docs', release: false },
	/**
	 * @example
	 * "infra: Add options to CI/CD pipeline [PROJ-1234]"
	 */
	{ type: 'infra|ci', release: false },
	/**
	 * @example
	 * "chore: Add clarity to some of our inline documentation [PROJ-1234]"
	 */
	{ type: 'chore', release: false },
];
