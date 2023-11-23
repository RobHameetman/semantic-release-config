import { faker } from '@faker-js/faker';
import { ReleaseRules } from '../ReleaseRules';
import { fakeReleaseRule } from '../../ReleaseRule/__test__/fakeReleaseRule';

export const fakeReleaseRules = ({
	...overrideProps
}: Record<string, unknown> = {}) =>
	Array.from(
		{ length: faker.number.int({ min: 1, max: 20 }) },
		() => fakeReleaseRule({ ...overrideProps })
	) as ReleaseRules;
