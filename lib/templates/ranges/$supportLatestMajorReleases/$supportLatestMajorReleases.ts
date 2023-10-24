import { $majorBackBy } from '@templates/previous/$majorBackBy';

export const $supportLatestMajorReleases = (offset = 1) =>
	`< ${$majorBackBy(offset)}`;

