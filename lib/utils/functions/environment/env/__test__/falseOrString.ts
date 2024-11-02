import { faker } from '@faker-js/faker';

export const falseOrString = () =>
	faker.helpers.arrayElement([faker.lorem.word(), 'false']);
