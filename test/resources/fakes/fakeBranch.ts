import { faker } from '@faker-js/faker';
import type { BranchObject } from 'semantic-release';

export const fakeBranch = ({
	channel = faker.helpers.arrayElement(['stable', 'beta', 'alpha']),
	name = faker.lorem.word(),
	range = false,
	prerelease = false,
	...overrideProps
}: Record<string, unknown> = {}) => {
	const branch = {
		name,
		channel,
	} as Partial<BranchObject>;

	faker.helpers.maybe(() => {
    branch.range = `${faker.number.int({ min: 1, max: 200 })}.x.x`;
  }, { probability: range ? 1 : 0.5 });

	faker.helpers.maybe(() => {
    branch.prerelease = prerelease as string | true;
  }, { probability: prerelease ? 1 : 0.5 });

	return {
		...branch,
		...overrideProps,
	} as BranchObject;
};
