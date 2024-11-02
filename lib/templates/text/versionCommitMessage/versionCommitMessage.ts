import { VERSION_COMMIT_MESSAGE as DEFAULT_MESSAGE } from '@/utils/constants/VERSION_COMMIT_MESSAGE';
import { VERSION_COMMIT_MODIFIER as DEFAULT_MODIFIER } from '@/utils/constants/VERSION_COMMIT_MODIFIER';
import { VERSION_COMMIT_TYPE as DEFAULT_TYPE } from '@/utils/constants/VERSION_COMMIT_TYPE';

/**
 * Generates a version commit message with the given commit message, modifier,
 * and type.
 *
 * @param message - The message to include in the commit. May be externally
 * overridden by the `RELEASE_COMMIT_MESSAGE` environment variable.
 * @defaultValue - `'Update package.json to new version'`
 *
 * @param mod - The modifier to include in the commit. May be externally
 * overridden by the `RELEASE_COMMIT_MODIFIER` environment variable.
 * @defaultValue - `'skip ci'`
 *
 * @param type - The type to include in the commit. May be externally
 * overridden by the `RELEASE_COMMIT_TYPE` environment variable.
 * @defaultValue - `'version'`
 *
 * @returns A formatted version release commit message with the given commit
 * message, modifier, and type.
 * @defaultValue - `'version(${nextRelease.version}): Update package.json to new version [skip ci]\n\n${nextRelease.notes}'`
 */
export const versionCommitMessage = (
	message = DEFAULT_MESSAGE,
	mod = DEFAULT_MODIFIER,
	type = DEFAULT_TYPE,
) =>
	`${type}(\${nextRelease.version}): ${message} [${mod}]\n\n\${nextRelease.notes}`;
