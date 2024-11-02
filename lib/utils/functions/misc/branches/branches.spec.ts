import type { BranchObject } from 'semantic-release';
import { faker } from '@faker-js/faker';
import { mockEnv } from '@@/utils/mockEnv';

jest.unstable_mockModule('@/utils/types/state/Branch', () => ({
	Branch: class {
		static set = jest.fn();
	},
}));

describe('branches()', () => {
	let Branch: Object | null = null;
	let CI_COMMIT_BRANCH: string | null = null;
	let branches: ((branches: ReadonlyArray<BranchObject>) => Promise<unknown>) | null = null;
	let branchRules: Array<BranchObject> | null = null;
	let result: unknown = null;
	let error: Error | null = null;

	beforeAll(async () => {
		CI_COMMIT_BRANCH = faker.git.branch();

		mockEnv('CI_COMMIT_BRANCH')
			.mockReturnValue(CI_COMMIT_BRANCH);

		({ Branch } = await import('@/utils/types/state/Branch'));
		({ branches } = await import('./branches'));
	});

	beforeEach(async () => {
		try {
			branchRules = [
				{ name: '@(main|master)', prerelease: false, channel: 'latest' },
				{ name: `[1-9]*([0-9]).X.X`, range: '${name.split(".")[0]}.x.x', prerelease: false, channel: '${name.split(".")[0]}' },
				{ name: '@(!(main|master|[1-9]*([0-9]).X.X))', prerelease: 'pr.13.abcd1234.20131111.1', channel: 'pr-13' },
			];

			result = await branches?.(branchRules);
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();

		branchRules = null;
		error = null;
		result = null;
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should not throw an error', () => {
		expect(error).toBeNull();
	});

	it('should initialize the Branch class', () => {
		/* @ts-expect-error - Property 'set' does not exist on type 'Object'. */
		expect(Branch?.set).toBeCalled();
	});

	it('should return the given branch rules', () => {
		expect(result).toBe(branchRules);
	});
});

