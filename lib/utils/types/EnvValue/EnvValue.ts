import { isString, isUndefined, } from '@rob.hameetman/type-guards';

export type EnvValue = string | undefined;

export const isEnvValue = (value: unknown): value is EnvValue =>
	isString(value) ||
	isUndefined(value);
