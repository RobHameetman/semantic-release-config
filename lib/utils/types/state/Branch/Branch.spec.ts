import type { BranchObject } from 'semantic-release';
import { Branch } from './Branch';

describe('Branch', () => {
	let branch: string | null = null;
	let rules: ReadonlyArray<BranchObject> | null = null;

	beforeEach(() => {
		branch = 'main';

		rules = [
			{ name: '@(main|master)', prerelease: false, channel: 'latest' },
			{ name: 'alpha', prerelease: 'alpha', channel: 'alpha' },
			{ name: '@(!(master|main|alpha))', prerelease: 'pr.13.abcd1234.20131111.1', channel: 'pr-13' },
		];

		Branch.set(rules, branch);
	});

	afterEach(() => {
		Branch.destroy();

		branch = null;
		rules = null;
	});

	describe('.active', () => {
		it('should be the name of the current branch', () => {
			expect(Branch.active).toBe(branch);
		});
	});

	describe('.matches', () => {
		it('should be the list of matching branch rules for the current configuration', () => {
			expect(Branch.matches).toStrictEqual(expect.arrayContaining([
				expect.objectContaining({ name: '@(main|master)' }),
			]));
		});
	});

	describe('.release', () => {
		it('should be the list of release branch rules for the current configuration', () => {
			expect(Branch.release).toStrictEqual(expect.arrayContaining([
				expect.objectContaining({ prerelease: false }),
			]));
		});
	});

	describe('.rules', () => {
		it('should be the list of all branch rules for the current configuration', () => {
			expect(Branch.rules).toHaveLength((rules ?? []).length);
		});
	});

	describe('.prerelease', () => {
		it('should be the list of prerelease branch rules for the current configuration', () => {
			expect(Branch.prerelease).toStrictEqual(expect.arrayContaining([
				expect.objectContaining({ prerelease: 'alpha' }),
				expect.objectContaining({ prerelease: 'pr.13.abcd1234.20131111.1' }),
			]));
		});
	});

	describe('.isRelease()', () => {
		it('should return true', () => {
			expect(Branch.isRelease()).toBe(true);
		});
	});

	describe('.isPrerelease()', () => {
		it('should return false', () => {
			expect(Branch.isPrerelease()).toBe(false);
		});
	});

	describe('.isPrPrerelease()', () => {
		it('should return false', () => {
			expect(Branch.isPrPrerelease()).toBe(false);
		});
	});

	describe('.isSet()', () => {
		it('should return true', () => {
			expect(Branch.isSet()).toBe(true);
		});
	});
});
