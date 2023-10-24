import { faker } from '@faker-js/faker';
import { fakeRule } from './fakeRule';

export const fakeRules = (overrideProps = {}) =>
	Array.from({
		length: faker.number.int({ min: 1, max: 30 })
	}, () => fakeRule(overrideProps));
