import { faker } from '@faker-js/faker';
import { SEMVER_REGEX } from '@utils/regex/SEMVER_REGEX';

export const fakeVersionMatch = (version = faker.system.semver()) =>
	version.match(SEMVER_REGEX);
