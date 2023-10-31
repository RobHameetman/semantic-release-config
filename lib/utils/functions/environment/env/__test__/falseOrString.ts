import { faker } from '@faker-js/faker';

export const falseOrString = () =>
	faker.datatype.boolean()
		? faker.lorem.word()
		: 'false';
