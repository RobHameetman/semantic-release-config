import { faker } from '@faker-js/faker';
import { COMMIT_REGEX } from '@utils/regex/COMMIT_REGEX';

const randomCommitMessage = () => `${faker.datatype.boolean()
	? `${faker.lorem.word()}${faker.datatype.boolean() ? `(${faker.lorem.word()})` : ''}: `
	: ''}${faker.git.commitMessage()} [PROJ-1234]`;

export const fakeCommitMatch = (commit = randomCommitMessage()) =>
	commit.match(COMMIT_REGEX);
