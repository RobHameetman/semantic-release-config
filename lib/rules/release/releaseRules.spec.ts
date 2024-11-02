import { releaseRules } from './releaseRules';
import { commitWithReleaseRules } from '@@/utils/commitWithReleaseRules';

const commit = commitWithReleaseRules(releaseRules);

describe('releaseRules', () => {
	it('should be an array', () => {
		expect(releaseRules).toBeInstanceOf(Array);
	});

	it('should skip the release when there are any such matching release rules', () => {
		expect(commit('skip(patch): Update package.json to new version')).not.toBeReleased();
		expect(commit('release(1.0.0-pr.1.ff38cb921d.201311111.1): Update package.json to new version [SKIP CI]')).not.toBeReleased();
		expect(commit('release(skip): 2.0.0 - Errata [PROJ-1234]')).not.toBeReleased();
	});

	it('should prefer major release rules over minor or patch release rules', () => {
		expect(commit('feat(major): Overhaul auth implementation [PROJ-1234]')).toBeAMajorRelease();
		expect(commit('fix(breaking): Remove broken method [PROJ-1234]')).toBeAMajorRelease();
	});

	it('should prefer minor release rules over patch release rules', () => {
		expect(commit('vuln(minor): Add auth vuln workaround classes [PROJ-1234]')).toBeAMinorRelease();
	});

	it('should use patch release rules when there are no other matching types', () => {
		expect(commit('vuln: Remediate remote procedure call information disclosures [PROJ-1234]')).toBeAPatchRelease();
	});
});
