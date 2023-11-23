import { faker } from '@faker-js/faker';
import { VersionMatchGroups } from '../VersionMatchGroups';

export const fakeVersionMatchGroups = <T extends string>({
	...overrideProps
}: Record<string, unknown> = {}) => {
	const versionMatchGroups = {
		major: String(faker.number.int({ min: 0, max: 100 })),
		minor: String(faker.number.int({ min: 0, max: 500 })),
		patch: String(faker.number.int({ min: 0, max: 1000 })),
		preid: undefined,
		type: undefined,
		pr: undefined,
		commit: undefined,
		date: undefined,
		prerelease: undefined,
		build: undefined,
	} as Partial<VersionMatchGroups<T>>;
	let isPrerelease = false;

	const onlyIfNotAlreadyPrerelease = {
		probability: Number(versionMatchGroups.major) > 0
			? 0.5
			: 0,
	};

	faker.helpers.maybe(() => {
		isPrerelease = true;

		const isPr = faker.datatype.boolean();
		const today = new Date();

		const type = isPr
			? 'pr'
			: faker.lorem.word();

		const pr = isPr
			? String(faker.number.int({ min: 1, max: 10000 }))
			: undefined;

		const commit = isPr
			? faker.git.commitSha({ length: 8 })
			: undefined;

		const date = isPr
			? `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`
			: undefined;

		const prerelease = String(faker.number.int({ min: 1, max: 1000 }));

		const preid = isPr
			? `${type}.${pr}.${commit}.${date}.${prerelease}`
			: `${type}.${prerelease}`;

		Object.assign(versionMatchGroups, {
			preid,
			type,
			pr,
			commit,
			date,
			prerelease,
		});
	}, onlyIfNotAlreadyPrerelease);

	const version = isPrerelease
		? `${versionMatchGroups.major}.${versionMatchGroups.minor}.${versionMatchGroups.patch}-${versionMatchGroups.preid}`
		: `${versionMatchGroups.major}.${versionMatchGroups.minor}.${versionMatchGroups.patch}`;

	return [{
		...versionMatchGroups,
		...overrideProps,
	} as VersionMatchGroups<T>, version] as const;
};
