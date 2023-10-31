import { isEnvDefined } from '@utils/functions/environment/isEnvDefined';
import type { EnvValue } from '@utils/types/EnvValue';

export const isEnvDefinedOr = (altEnvName: string | ReadonlyArray<string>) =>
	(value: EnvValue) =>
	isEnvDefined(value) ||
		(altEnvName instanceof Array
			? altEnvName.some((name) => isEnvDefined(process.env[name]))
			: isEnvDefined(process.env[altEnvName]));
