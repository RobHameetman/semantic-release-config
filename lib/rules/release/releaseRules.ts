import { CONDITIONAL_RELEASE_RULES } from './conditional';
import { MAJOR_RELEASE_RULES } from './major';
import { MINOR_RELEASE_RULES } from './minor';
import { PATCH_RELEASE_RULES } from './patch';
import { SKIP_RELEASE_RULES } from './skip';

export const releaseRules = [
	...CONDITIONAL_RELEASE_RULES,
	...MAJOR_RELEASE_RULES,
	...MINOR_RELEASE_RULES,
	...PATCH_RELEASE_RULES,
	...SKIP_RELEASE_RULES,
];
