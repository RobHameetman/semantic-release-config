import type { BranchObject } from 'semantic-release';
import { faker } from '@faker-js/faker';
import { fakePrBranchRule } from '@/utils/types/branches/PrBranchRule/__test__';
import type { Mutable } from '@/utils/types/misc/Mutable';
import { Branches } from '../Branches';

const fakeBranchObject = ({
	...overrideProps
}: Record<string, unknown> = {}) => {
	const branch = {
		name: faker.git.branch(),
		prerelease: faker.datatype.boolean(),
		channel: faker.git.branch(),
	} as Mutable<BranchObject>;

	faker.helpers.maybe(() => {
		branch.prerelease = faker.helpers.arrayElement([
			branch.name,
			faker.datatype.boolean(),
			'rc',
			'next',
			'beta',
			'alpha',
		]);
	});

	faker.helpers.maybe(() => {
		branch.channel = faker.helpers.arrayElement([
			branch.prerelease,
			'latest',
			'next',
			'beta',
			'alpha',
		]);
	});

	return {
		...branch,
		...overrideProps,
	} as BranchObject;
};

export const fakeBranches = ({
	prBranches = true,
	includes = [],
	...overrideProps
}: Record<string, unknown> = {}) => {
	const branches = Array.from<unknown, object>(
		{ length: faker.number.int({ min: 1, max: 10 }) },
		() => fakeBranchObject({ ...overrideProps }),
	);

	faker.helpers.maybe(() => {
		branches.push(fakePrBranchRule({ ...overrideProps }));
	}, { probability: prBranches ? 0.5 : 0 });

	return [
		...branches,
		...(includes as Array<Record<string, unknown>>),
	] as Branches;
};
