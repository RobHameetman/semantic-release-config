import { faker } from '@faker-js/faker';
import { isString } from '@rob.hameetman/type-guards';

export const fakeRule = ({
	name = faker.lorem.word(),
	release = faker.helpers.arrayElement(['major', 'minor', 'patch', false]),
	scope = '',
	subject = '',
	type = '',
	...overrideProps
}: Record<string, unknown> = {}) => {
	const rule = {
		name,
		release,
	} as Record<string, unknown>;

	faker.helpers.maybe(() => {
    rule.type = isString(type) && type.length ? type : faker.lorem.word();
  }, { probability: type ? 1 : 0.5 });

	faker.helpers.maybe(() => {
    rule.scope = isString(scope) && scope.length ? scope : faker.lorem.word();
  }, { probability: scope ? 1 : 0.5 });

	faker.helpers.maybe(() => {
    rule.subject = isString(subject) && subject.length ? subject : faker.lorem.words();
  }, { probability: subject ? 1 : 0.5 });

	return {
		...rule,
		...overrideProps,
	};
};
