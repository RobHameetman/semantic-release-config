import { faker } from '@faker-js/faker';
import { isNumber, isString } from '@rob.hameetman/type-guards';

export const fakeNextRelease = ({
	prerelease,
	channel = faker.helpers.arrayElement(['alpha', 'beta', 'next', 'latest']),
	prereleaseType = '',
	gitHead = faker.git.commitSha(),
	name = faker.lorem.word(),
	notes = faker.lorem.sentence(),
	type = faker.helpers.arrayElement(['major', 'minor', 'patch', 'prerelease']),
	version,
	major,
	minor,
	patch,
	update,
	...overrideProps
}: Record<string, unknown> = {}) => {
	const nextRelease = {
		gitHead,
		name,
		notes,
		type,
	} as Record<string, unknown>;

	const isPrerelease = prerelease === true ? true : prerelease !== false && (prereleaseType || type === 'prerelease');
	const $major = isNumber(major) ? major : faker.number.int({ min: !isPrerelease ? 1 : 0, max: 300 });
	const $minor = isNumber(minor) ? minor : faker.number.int({ min: 0, max: 300 });
	const $patch = isNumber(patch) ? patch : faker.number.int({ min: $minor ? 0 : 1, max: 300 });

	if (version) {
		nextRelease.version = version;
	} else if (isPrerelease) {
		const $update = isNumber(update) ? update : faker.number.int({ min: 1, max: 20 });

		let prefix = '';

		if (isString(prereleaseType) && prereleaseType.length) {
			prefix = prereleaseType;
		} else {
			prefix = channel !== 'alpha' && channel !== 'beta' ? 'rc' : channel;
		}

		nextRelease.version = prereleaseType === false || major === 0
			? `0.${$minor}.${$patch}`
			: `${$major}.${$minor}.${$patch}-${prefix}.${$update}`;
	} else {
		nextRelease.version = `${$major}.${$minor}.${$patch}`;
	}

	return {
		nextRelease: {
			...nextRelease,
			...overrideProps,
		},
	};
};
