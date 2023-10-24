import { BranchObject } from 'semantic-release';
import { faker } from '@faker-js/faker';
import { fakeBranch } from './fakeBranch';

export const fakeBranches = (overrideProps = {}) =>
	Array.from({
		length: faker.number.int({ min: 1, max: 9 })
	}, () => fakeBranch(overrideProps)) as ReadonlyArray<BranchObject>;
