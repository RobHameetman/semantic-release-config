import type { EnvValue } from '@utils/types/EnvValue';

export const isEnvDefined = (value: EnvValue) =>
	value !== '' && value !== undefined;
