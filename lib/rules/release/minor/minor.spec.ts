import { commitWithReleaseRules } from '@test/utils/commitWithReleaseRules';
import { MINOR_RELEASE_RULES } from './minor';

const commit = commitWithReleaseRules(MINOR_RELEASE_RULES);

describe('MINOR_RELEASE_RULES', () => {
	it('should be an array', () => {
		expect(MINOR_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should only have rules for semantic minor versions', () => {
		expect(MINOR_RELEASE_RULES).toContainEqual(expect.objectContaining({
			release: expect.stringMatching(/^minor$/),
		}));
	});

	it('should match conventional commits correctly', () => {
		expect(commit('feat(auth): Add auth feature [PROJ-1234]')).toBeAMinorRelease();
		expect(commit('FEAT(auth): Add auth feature [PROJ-1234]')).toBeAMinorRelease();
		expect(commit('minor(auth): Add auth feature [PROJ-1234]')).toBeAMinorRelease();
		expect(commit('feat(minor): Add auth feature [PROJ-1234]')).toBeAMinorRelease();
		expect(commit('release(1.2.0): Add auth feature [PROJ-1234]')).toBeAMinorRelease();
		expect(commit('release: 1.2.0 - Add auth feature [PROJ-1234]')).toBeAMinorRelease();
	});
});

