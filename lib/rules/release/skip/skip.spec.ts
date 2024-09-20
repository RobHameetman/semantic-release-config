import { commitWithReleaseRules } from '@@/utils/commitWithReleaseRules';
import { SKIP_RELEASE_RULES } from './skip';

const commit = commitWithReleaseRules(SKIP_RELEASE_RULES);

describe('SKIP_RELEASE_RULES', () => {
	it('should be an array', () => {
		expect(SKIP_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should only have rules for skipping releases', () => {
		expect(SKIP_RELEASE_RULES).toContainEqual(expect.objectContaining({
			release: false,
		}));
	});

	it('should match conventional commits correctly', () => {
		expect(commit('skip: Errata [PROJ-1234]')).not.toBeReleased();
		expect(commit('release(skip): Errata [PROJ-1234]')).not.toBeReleased();
		expect(commit('release(none): Errata [PROJ-1234]')).not.toBeReleased();
		expect(commit('release: Update package.json to new version [SKIP RELEASE]')).not.toBeReleased();
		expect(commit('feat: Update package.json to new version [ci skip]')).not.toBeReleased();
		expect(commit('feat(skip-release): Errata [PROJ-1234]')).not.toBeReleased();
		expect(commit('docs: Update API documentation [PROJ-1234]')).not.toBeReleased();
		expect(commit('infra: Add options to CI/CD pipeline [PROJ-1234]')).not.toBeReleased();
		expect(commit('ci: Add options to infra pipeline [PROJ-1234]')).not.toBeReleased();
		expect(commit('chore: Add clarity to some of our inline documentation [PROJ-1234]')).not.toBeReleased();
		expect(commit('test: Add missing unit tests [PROJ-1234]')).not.toBeReleased();
	});
});

