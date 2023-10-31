import { faker } from '@faker-js/faker';
import { ReleaseRule } from '../ReleaseRule';

export const fakeReleaseRule = ({
	...overrideProps
}: Record<string, unknown> = {}) => {
	const releaseRule = {
		release: faker.helpers.arrayElement([
			'major',
			'premajor',
			'minor',
			'preminor',
			'patch',
			'prepatch',
			'prerelease',
			false,
		]),
	} as Record<keyof ReleaseRule, string>;

	faker.helpers.maybe(() => {
		releaseRule.scope = faker.lorem.words().toLowerCase().replace(' ', '-');
	});

	faker.helpers.maybe(() => {
		releaseRule.subject = `${faker.lorem.sentence()} [PROJ-1234]`;
	});

	faker.helpers.maybe(() => {
		releaseRule.type = faker.lorem.word();
	});

	return {
		...releaseRule,
		...overrideProps,
	} as ReleaseRule;
};
