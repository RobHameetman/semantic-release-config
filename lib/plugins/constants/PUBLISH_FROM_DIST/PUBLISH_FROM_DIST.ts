import { env } from '@utils/functions/environment/env';
import { isEnvTrue } from '@utils/functions/environment/isEnvTrue';

export const PUBLISH_FROM_DIST = env('RELEASE_PUBLISH_FROM_DIST', isEnvTrue);
