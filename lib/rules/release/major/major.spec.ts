import { commitWithReleaseRules } from '@@/utils/commitWithReleaseRules';
import { MAJOR_RELEASE_RULES } from './major';

const commit = commitWithReleaseRules(MAJOR_RELEASE_RULES);

describe('MAJOR_RELEASE_RULES', () => {
	it('should be an array', () => {
		expect(MAJOR_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should only have rules for semantic major versions', () => {
		expect(MAJOR_RELEASE_RULES).toContainEqual(expect.objectContaining({
			release: expect.stringMatching(/^major$/),
		}));
	});

	it('should match conventional commits correctly', () => {
		expect(commit('major: Overhaul auth implementation [PROJ-1234]')).toBeAMajorRelease();
		expect(commit('feat(major): Overhaul auth implementation [PROJ-1234]')).toBeAMajorRelease();
		expect(commit('breaking: Overhaul auth implementation [PROJ-1234]')).toBeAMajorRelease();
		expect(commit('feat(breaking): Overhaul auth implementation [PROJ-1234]')).toBeAMajorRelease();
		expect(commit('release(2.0.0): Overhaul auth implementation [PROJ-1234]')).toBeAMajorRelease();
		expect(commit('release: 2.0.0 - Overhaul auth implementation [PROJ-1234]')).toBeAMajorRelease();
	});
});

