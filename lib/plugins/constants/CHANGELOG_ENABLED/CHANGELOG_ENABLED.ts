import { env } from '@utils/functions/environment/env';
import { isEnvTrue } from '@utils/functions/environment/isEnvTrue';

export const CHANGELOG_ENABLED = !env('RELEASE_DISABLE_CHANGELOG', isEnvTrue);
