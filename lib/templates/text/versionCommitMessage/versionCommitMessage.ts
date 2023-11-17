import { VERSION_COMMIT_MESSAGE as DEFAULT_MESSAGE } from '@utils/constants/VERSION_COMMIT_MESSAGE';
import { VERSION_COMMIT_MODIFIER as DEFAULT_MODIFIER } from '@utils/constants/VERSION_COMMIT_MODIFIER';
import { VERSION_COMMIT_TYPE as DEFAULT_TYPE } from '@utils/constants/VERSION_COMMIT_TYPE';

export const versionCommitMessage = (
	message = DEFAULT_MESSAGE,
	mod = DEFAULT_MODIFIER,
	type = DEFAULT_TYPE,
) =>
	`${type}(\${nextRelease.version}): ${message} [${mod}]\n\n\${nextRelease.notes}`;
