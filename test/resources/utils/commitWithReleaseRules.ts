import type { ReleaseType } from 'semantic-release';
import { isArray, isObject } from '@rob.hameetman/type-guards';
import { commit } from './commit';

interface ReleaseRule {
	readonly release: string | boolean;
	readonly scope?: string;
	readonly subject?: string;
	readonly type?: string;
};

const RELEASE_TYPES =
	['prerelease', 'prepatch', 'patch', 'preminor', 'minor', 'premajor', 'major'];

const isReleaseRule = (value: unknown): value is ReleaseRule =>
	isObject(value) &&
	'release' in value &&
	(value.release === false ||
		RELEASE_TYPES.includes(value.release as string));

type ReleaseRules = ReadonlyArray<ReleaseRule>;

const areReleaseRules = (value: unknown): value is ReleaseRules =>
	isArray(value) &&
	value.every(isReleaseRule);

export const commitWithReleaseRules = (releaseRules: ReleaseRules) =>
	(message: string) => [commit(message), releaseRules] as const;
