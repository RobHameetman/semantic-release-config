import type { BranchObject } from 'semantic-release';
import { Branch } from '@utils/types/state/Branch';
import { branches } from './branches';

jest.mock('@utils/types/state/Branch', () => ({
	__esModule: true,
	Branch: class {
		static set = jest.fn();
	},
}));

describe('branches()', () => {
	let branchRules: Array<BranchObject> | null = null;
	let result: unknown = null;
	let error: Error | null = null;

	beforeEach(() => {
		try {
			branchRules = [
				{ name: '@(main|master)', prerelease: false, channel: 'latest' },
				{ name: `[1-9]*([0-9]).X.X`, range: '${name.split(".")[0]}.x.x', prerelease: false, channel: '${name.split(".")[0]}' },
				{ name: '@(!(main|master|[1-9]*([0-9]).X.X))', prerelease: 'pr.13.abcd1234.20131111.1', channel: 'pr-13' },
			];

			result = branches(branchRules);
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		branchRules = null;
		error = null;
		result = null;
	});

	it('should not throw an error', () => {
		expect(error).toBeNull();
	});

	it('should initialize the Branch class', () => {
		expect(Branch.set).toBeCalled();
	});

	it('should return the given branch rules', () => {
		expect(result).toBe(branchRules);
	});
});

