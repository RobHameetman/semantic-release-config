import { faker } from '@faker-js/faker';
import type { Mutable } from '@utils/types/misc/Mutable';
import { PrBranchRule } from '../PrBranchRule';

export const fakePrBranchRule = ({
	...overrideProps
}: Record<string, unknown> = {}) => {
	const prBranchRule = {
		name: '@(!(main|master|next-major|next|beta|alpha|[1-9]*([0-9]).X.X))',
	} as Mutable<PrBranchRule>;

	const prNumber = faker.number.int({ min: 1, max: 10000 });
	const commit = faker.git.commitSha({ length: 8 });
	const date = faker.date.past().toISOString().split('T')[0];

	prBranchRule.prerelease = Promise.resolve(`pr.${prNumber}.${commit}.${date}.1`);
	prBranchRule.channel = Promise.resolve(`pr-${prNumber}`);

	return {
		...prBranchRule,
		...overrideProps,
	} as PrBranchRule;
};
