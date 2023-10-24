import { $currentMajor } from '@templates/current/$currentMajor';

export const $supportLatestMajorRelease = (version = 1) => `< ${$currentMajor()}`;
