import { faker } from '@faker-js/faker';
import { CommitMatchGroups } from '../CommitMatchGroups';

const capitalize = (string: string) =>
	`${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const fakeCommitMatchGroups = <T extends string>({
	...overrideProps
}: Record<string, unknown> = {}) => {
	const commitMatchGroups = {
		subject: capitalize(`${faker.git.commitMessage()} [PROJ-1234]`),
		type: undefined,
		scope: undefined,
	} as Partial<CommitMatchGroups<T>>;

	let hasType = false;
	let hasScope = false;

	faker.helpers.maybe(() => {
		const type = faker.lorem.word();

		Object.assign(commitMatchGroups, {
			type,
		});

		hasType = true;
	});

	faker.helpers.maybe(() => {
		const scope = faker.lorem.word();

		Object.assign(commitMatchGroups, {
			scope,
		});

		hasScope = true;
	});

	const commit = `${hasType ? commitMatchGroups.type : ''}${hasScope ? `(${commitMatchGroups.scope})` : ''}${hasType || hasScope ? ': ' : ''}${commitMatchGroups.subject}`;

	return [{
		...commitMatchGroups,
		...overrideProps,
	} as CommitMatchGroups<T>, commit] as const;
};
