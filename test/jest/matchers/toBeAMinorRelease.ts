import micromatch from 'micromatch';
import { isArray, isObject, isString, isUndefined } from '@rob.hameetman/type-guards';

const TO_BE_A_MINOR_RELEASE = 'toBeAMinorRelease';

const COMMIT_REGEX = /^(?:(?<type>[^\(:]+)(?:\((?<scope>[^\)]+)\))?: )?(?<subject>.*)$/;

interface ReleaseRule {
	readonly release: string | boolean;
	readonly scope?: string;
	readonly subject?: string;
	readonly type?: string;
};

type ScopeOfCommitWithTypeAndScope<T extends string> =
	T extends `${string}(${infer U}): ${string}`
		? U
		: undefined;

type ScopeOfCommitWithScope<T extends string> =
	T extends `(${infer U}): ${string}`
		? U
		: undefined;

type ScopeOf<T extends string> =
	| ScopeOfCommitWithTypeAndScope<T>
	| ScopeOfCommitWithScope<T>;

const isScopeOf = <T extends string>(
	value: unknown,
	version?: string,
): value is ScopeOf<T> =>
	isString(value) || isUndefined(value) &&
	(version
		? (value === version.match(COMMIT_REGEX)?.groups?.scope)
		: true);

type SubjectOfCommitWithTypeAndScope<T extends string> =
	T extends `${string}(${string}): ${infer U}`
		? U
		: never;

type SubjectOfCommitWithType<T extends string> =
	T extends `${string}: ${infer U}`
		? U
		: never;

type SubjectOfCommitWithScope<T extends string> =
	T extends `(${string}): ${infer U}`
		? U
		: never;

type SubjectOfCommit<T extends string> =
	T extends `${infer U}`
		? U
		: never;

type SubjectOf<T extends string> =
	| SubjectOfCommitWithTypeAndScope<T>
	| SubjectOfCommitWithType<T>
	| SubjectOfCommitWithScope<T>
	| SubjectOfCommit<T>;

const isSubjectOf = <T extends string>(
	value: unknown,
	version?: string,
): value is ScopeOf<T> =>
	isString(value) &&
	(version
		? (value === version.match(COMMIT_REGEX)?.groups?.subject)
		: true);

type TypeOfCommitWithTypeAndScope<T extends string> =
	T extends `${infer U}(${string}): ${string}`
		? U
		: undefined;

type TypeOfCommitWithType<T extends string> =
	T extends `${infer U}: ${string}`
		? U
		: undefined;

type TypeOf<T extends string> =
	| TypeOfCommitWithTypeAndScope<T>
	| TypeOfCommitWithType<T>;

const isTypeOf = <T extends string>(
	value: unknown,
	version?: string,
): value is ScopeOf<T> =>
	isString(value) || isUndefined(value) &&
	(version
		? (value === version.match(COMMIT_REGEX)?.groups?.subject)
		: true);

interface CommitGroups<T extends string> {
	readonly scope: ScopeOf<T>;
	readonly subject: SubjectOf<T>;
	readonly type: TypeOf<T>;
}

const isCommitGroups = <T extends string>(
	value: unknown,
	version?: string,
): value is CommitGroups<T> =>
	isObject(value) &&
	isScopeOf(value.scope, version) &&
	isSubjectOf(value.subject, version) &&
	isTypeOf(value.type, version);

const isToBeSkippedInput = <T extends string>(
	value: unknown,
): value is CommitGroups<T> =>
	isArray(value) &&
	isCommitGroups(value.at(0));
	// isBranchRules(value.at(1));

/**
 * Jest uses `Object.is()` for equality checking, which distinguishes 0 from -0,
 * which can cause false negatives (literally!) when we try to use `.toBe(0)` or
 * `.toEqual(0)`.
 *
 * @see https://github.com/jasmine/jasmine/issues/496
 */
expect.extend({
	[TO_BE_A_MINOR_RELEASE](received) {
		const {
			RECEIVED_COLOR,
			matcherErrorMessage,
			matcherHint,
			printExpected,
			printReceived,
			printWithType,
		} = this.utils;

		const options = {
			isNot: this.isNot,
			promise: this.promise,
		};

		const [ commit, releaseRules ] = received;

		if (!isCommitGroups(commit)) {
			throw new Error(
				matcherErrorMessage(
					matcherHint(TO_BE_A_MINOR_RELEASE, undefined, '', options),
					/* eslint-disable-next-line new-cap */
					`${RECEIVED_COLOR('received')} value must be an object with a scope, subject, and type representing a commit`,
					printWithType('Received', commit, printReceived),
				),
			);
		}

		const matches = releaseRules.filter(({ scope = '', subject = '', type = '' }: ReleaseRule) => {
			const matchesScope = commit.scope && scope && micromatch([commit.scope], scope).includes(commit.scope);
			const matchesSubject = commit.subject && subject && micromatch([commit.subject], subject).includes(commit.subject);
			const matchesType = commit.type && type && micromatch([commit.type], type).includes(commit.type);

			// if (matchesScope) {
			// 	console.log(micromatch([String(commit.scope)], scope));
			// }

			// if (matchesSubject) {
			// 	console.log(micromatch([String(commit.subject)], subject));
			// }

			// if (matchesType) {
			// 	console.log(micromatch([String(commit.type)], type));
			// }

			return matchesScope || matchesSubject || matchesType;
		});

		const types = matches.map(({ release }: ReleaseRule) => release);

		const type = types.includes(false)
			? false
			: types.includes('major')
				? 'major'
				: types.includes('minor')
					? 'minor'
					: 'patch';

		const pass = type === 'minor';

		const message = (): string =>
			`${matcherHint(TO_BE_A_MINOR_RELEASE, 'received', '', options)}\n\n` +
			`Expected ${printReceived(received)}${
				pass ? '' : ' not'
			} to equal ${printExpected(0)}\n`;

		return { pass, message };
	},
});
