import { ReleaseRules } from '@utils/types/ReleaseRules';

export const PATCH_RELEASE_RULES: ReleaseRules = [
	/**
	 * Defaults
	 */
	{ revert: true, release: 'patch' },
	{ type: 'fix', release: 'patch' },
  { type: 'perf', release: 'patch' },
	{ emoji: ':racehorse:', release: 'patch' },
  { emoji: ':bug:', release: 'patch' },
  { emoji: ':penguin:', release: 'patch' },
  { emoji: ':apple:', release: 'patch' },
  { emoji: ':checkered_flag:', release: 'patch' },
	{ tag: 'BUGFIX', release: 'patch' },
	{ tag: 'SECURITY', release: 'patch' },
	{ tag: 'Fix', release: 'patch' },
	{ component: 'perf', release: 'patch' },
  { component: 'deps', release: 'patch' },
	{ type: 'FIX', release: 'patch' },
	/**
	 * @example
	 * "patch: Fix email validation error on signup page [PROJ-1234]"
	 */
	{ type: 'patch', release: 'patch' },
	/**
	 * @example
	 * "feat(patch): Fix email validation error on signup page [PROJ-1234]"
	 */
	{ scope: 'patch', release: 'patch' },
	/**
	 * @example
	 * "release(1.2.1): Fix email validation error on signup page [PROJ-1234]"
	 */
	{ type: 'release', scope: '?([1-9])+([0-9]).+([0-9]).?([1-9])+([0-9])', release: 'patch' },
	/**
	 * @example
	 * "release: 1.2.1 - Fix email validation error on signup page [PROJ-1234]"
	 */
	{ type: 'release', subject: '?([1-9])+([0-9]).+([0-9]).?([1-9])+([0-9])?( - *)', release: 'patch' },
	/**
	 * @example
	 * "bug: Fix email validation error on signup page [PROJ-1234]"
	 * "bug(auth): Fix email validation error on signup page [PROJ-1234]"
	 */
	{ type: 'bug', release: 'patch' },
	/**
	 * @example
	 * "errata: Fix incorrect loop [PROJ-1234]"
	 */
	{ type: 'errata', release: 'patch' },
	/**
	 * @example
	 * "hotfix: Fix email validation error on signup page [PROJ-1234]"
	 */
	{ type: 'hotfix', release: 'patch' },
	/**
	 * @example
	 * "security: Remediate remote procedure call information disclosure vulnerabilities [PROJ-1234]"
	 */
	{ type: 'security', release: 'patch' },
	/**
	 * @example
	 * "vuln: Remediate remote procedure call information disclosures [PROJ-1234]"
	 * "vulns: Remediate remote procedure call information disclosures [PROJ-1234]"
	 */
	{ type: 'vuln?(s)', release: 'patch' },
	/**
	 * @example
	 * "cve(2023-36596): Remediate remote procedure call information disclosure [PROJ-1234]"
	 */
	{ type: 'cve', scope: '[0-9][0-9][0-9][0-9]-+(0-9)', release: 'patch' },
	/**
	 * @example
	 * "vuln(CVE-2023-36596): Remediate remote procedure call information disclosure [PROJ-1234]"
	 */
	{ scope: 'CVE-[0-9][0-9][0-9][0-9]-+(0-9)', release: 'patch' },
	/**
	 * @example
	 * "dep(infra): Update frontend infrastructure package [PROJ-1234]"
	 * "deps(infra): Update AWS CDK packages to version 2 [PROJ-1234]"
	 */
	{ type: 'dep?(s)', release: 'patch' },
];
