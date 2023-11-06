import { COMMIT_SHA } from '@utils/constants/COMMIT_SHA';
import { env } from '@utils/functions/environment/env';
import { envOr } from '@utils/functions/environment/envOr';

export const COMMIT_SHA_SHORT = env('CI_SHA_SHORT', envOr([
	'CI_COMMIT_SHORT_SHA',
])) || (COMMIT_SHA || '').slice(0, 8) || undefined;
