import { isEnvFalse } from '@utils/functions/isEnvFalse';
import { isEnvTrue } from '@utils/functions/isEnvTrue';
import type { EnvValue } from '@utils/types/EnvValue';

export const getEnvBooleanOrValue = (value: EnvValue) => {
	if (isEnvTrue(value)) {
		return true;
	}

	if (isEnvFalse(value)) {
		return false;
	}

	return value;
};
