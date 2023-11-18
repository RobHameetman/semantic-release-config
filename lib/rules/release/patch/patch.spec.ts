import { commitWithReleaseRules } from '@test/utils/commitWithReleaseRules';
import { PATCH_RELEASE_RULES } from './patch';

const commit = commitWithReleaseRules(PATCH_RELEASE_RULES);

describe('PATCH_RELEASE_RULES', () => {
	it('should be an array', () => {
		expect(PATCH_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should only have rules for semantic patch versions', () => {
		expect(PATCH_RELEASE_RULES).toContainEqual(expect.objectContaining({
			release: expect.stringMatching(/^patch$/),
		}));
	});

	it('should match conventional commits correctly', () => {
		expect(commit('fix: Email validation error on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('perf: Resolve email validation bottleneck on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('FIX: Email validation error on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('patch: Fix email validation error on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('feat(patch): Fix email validation error on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('release(1.2.1): Fix email validation error on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('release: 1.2.1 - Fix email validation error on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('bug: Fix email validation error on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('bug(auth): Fix email validation error on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('errata: Fix incorrect loop [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('hotfix: Fix email validation error on signup page [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('security: Remediate remote procedure call information disclosure vulnerabilities [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('vuln: Remediate remote procedure call information disclosures [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('vulns: Remediate remote procedure call information disclosures [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('cve(2023-36596): Remediate remote procedure call information disclosure [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('vuln(CVE-2023-36596): Remediate remote procedure call information disclosure [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('dep(infra): Update frontend infrastructure package [PROJ-1234]')).toBeAPatchRelease();
		expect(commit('deps(infra): Update frontend infrastructure package [PROJ-1234]')).toBeAPatchRelease();
	});
});

