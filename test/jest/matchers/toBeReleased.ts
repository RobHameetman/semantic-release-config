import micromatch from 'micromatch';
import { isCommitMatchGroups } from '@/utils/types/matches/CommitMatchGroups';
import { ReleaseRule } from '@/utils/types/misc/ReleaseRule';

const TO_BE_RELEASED = 'toBeReleased';

/**
 * Checks that a provided semantic version string is not a pre-release version.
 */
expect.extend({
	[TO_BE_RELEASED](received) {
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

		if (!isCommitMatchGroups(commit)) {
			throw new Error(
				matcherErrorMessage(
					matcherHint(TO_BE_RELEASED, undefined, '', options),
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

		const pass = type !== false;

		const message = (): string =>
			`${matcherHint(TO_BE_RELEASED, 'received', '', options)}\n\n` +
			`Expected ${printReceived(commit)}${
				pass ? '' : ' not'
			} to be released\n`;

		return { pass, message };
	},
});
