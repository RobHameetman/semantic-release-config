export const SKIP_RELEASE_RULES = [
	/**
	 * @example
	 * "skip: Errata [PROJ-1234]"
	 */
	{ type: 'skip', release: false },
	/**
	 * @example
	 * "release(skip): Errata [PROJ-1234]"
	 * "release(none): Errata [PROJ-1234]"
	 */
	{ type: 'release', scope: 'skip|none', release: false },
	/**
	 * @example
	 * "release: Update package.json to new version [SKIP RELEASE]"
	 * "feat: Update package.json to new version [ci skip]"
	 */
	{ subject: '* \\[@(@(SKIP|skip) @(RELEASE|CI|ACTION|VERSION|release|ci|action|version)|@(RELEASE|CI|ACTION|VERSION|release|ci|action|version) @(SKIP|skip))\\]', release: false },
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
	 * "ci: Add options to infra pipeline [PROJ-1234]"
	 */
	{ type: '@(infra|ci)', release: false },
	/**
	 * @example
	 * "chore: Add clarity to some of our inline documentation [PROJ-1234]"
	 */
	{ type: 'chore', release: false },
	/**
	 * @example
	 * "test: Add missing unit tests [PROJ-1234]"
	 */
	{ type: 'test', release: false },
];
