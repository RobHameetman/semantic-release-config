import { RELEASE_DISABLE_CHANGELOG } from '@@/mocks/env/RELEASE_DISABLE_CHANGELOG';

export const enableChangelog = () => RELEASE_DISABLE_CHANGELOG.mockReturnValue(undefined);
