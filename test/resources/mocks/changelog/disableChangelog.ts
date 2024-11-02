import { RELEASE_DISABLE_CHANGELOG } from '@@/mocks/env/RELEASE_DISABLE_CHANGELOG';

export const disableChangelog = () => RELEASE_DISABLE_CHANGELOG.mockReturnValue('true');
