import { env } from '@utils/functions/env';
import { CONDITIONAL_RELEASE_RULES } from './conditional';

jest.mock('@utils/functions/env', () => ({
	__esModule: true,
	env: jest.fn(),
}));

describe('CONDITIONAL_RELEASE_RULES', () => {
	let length: number | null = null;

	beforeEach(() => {
		({ length } = CONDITIONAL_RELEASE_RULES);
	});

	afterEach(() => {
		length = null;
	});

	afterAll(() => {
		jest.restoreAllMocks();
	})

	it('should be an array', () => {
		expect(CONDITIONAL_RELEASE_RULES).toBeInstanceOf(Array);
	});

	it('should set a version increment type conditionally in each rule', () => {
		expect(CONDITIONAL_RELEASE_RULES).toHaveLength(length ?? -1);
		expect(env).toHaveBeenCalledTimes(length ?? -1);
	});
});

