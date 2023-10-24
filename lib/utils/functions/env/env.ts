import { getEnvValue } from '@utils/functions/getEnvValue';
import { EnvValue } from '@utils/types/EnvValue';

type Callback<T = unknown> = (value: EnvValue) => T;

export const env = <T = EnvValue>(
	envVar: string,
	cb = getEnvValue as Callback<T>,
) =>
	cb(process.env[envVar]);
