import { $currentMajor } from '@templates/current/$currentMajor';

export const $supportLatestMajorRelease = () => `< ${$currentMajor()}`;
