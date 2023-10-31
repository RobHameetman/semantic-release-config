import { BranchObject } from 'semantic-release';
import { faker } from '@faker-js/faker';
import { fakeBranches } from '@@/fakes/fakeBranches';
import { fakeRules } from '@@/fakes/fakeRules';
import { mockEnv } from '@@/utils/mockEnv';

jest.unstable_mockModule('@/utils/functions/environment/env', () => ({
	env: jest.fn((variable: string) => {
		return ({
			RELEASE_DEBUG: () => process.env.RELEASE_DEBUG === 'true',
			RELEASE_DRY_RUN: () => process.env.RELEASE_DRY_RUN === 'true',
			RELEASE_LOCALLY: () => process.env.RELEASE_LOCALLY === 'true',
		} as Record<string, () => unknown>)[variable]();
	}),
}));

describe('createConfig()', () => {
	let processEnv: NodeJS.ProcessEnv | null = null;
	let branches: ReadonlyArray<BranchObject> | null = null;
	let releaseRules: ReadonlyArray<Record<string, unknown>> | null = null;
	let createConfig: ((config: Record<string, unknown>) => Promise<Record<string, unknown> | null>) | null = null;
	let error: Error | null = null;
	let result: unknown = null;

	beforeAll(() => {
		mockEnv('RELEASE_DEBUG')
			.mockReturnValue(faker.datatype.boolean().toString());

		mockEnv('RELEASE_DRY_RUN')
			.mockReturnValue(faker.datatype.boolean().toString());

		mockEnv('RELEASE_LOCALLY')
			.mockReturnValue(faker.datatype.boolean().toString());
	});

	beforeEach(async () => {
		try {
			branches = fakeBranches();
			releaseRules = fakeRules();

			({ createConfig } = await import('./createConfig'));

			result = await createConfig({
				branches,
				plugins: [
					['@semantic-release/commit-analyzer', {
						releaseRules,
					}],
				]
			});
		} catch (thrown) {
			error = !(thrown instanceof Error) ? (thrown as Error) : new Error();
			console.error(thrown);
		}
	});

	afterEach(() => {
		branches = null;
		releaseRules = null;
		error = null;
		result = null;
	});

	afterAll(() => {
		process.env = processEnv as NodeJS.ProcessEnv;
		processEnv = null;
	});

	it('should not throw an error', () => {
		expect(error).toBeNull();
	});

	it('should return a semantic-release configuration with a correctly formatted tag', () => {
		expect(result).toStrictEqual(expect.objectContaining({
			tagFormat: expect.stringMatching(/^\$\{version\}$/),
		}));
	});

	it('should return a semantic-release configuration with "debug" mode enabled when RELEASE_DEBUG is true', () => {
		expect(result).toStrictEqual(expect.objectContaining({
			debug: process.env.RELEASE_DEBUG === 'true',
		}));
	});

	it('should return a semantic-release configuration with "dryRun" enabled when RELEASE_DRY_RUN is true', () => {
		expect(result).toStrictEqual(expect.objectContaining({
			dryRun: process.env.RELEASE_DRY_RUN  === 'true',
		}));
	});

	it('should return a semantic-release configuration with "ci" disabled when RELEASE_LOCALLY is true', () => {
		expect(result).toStrictEqual(expect.objectContaining({
			ci: !(process.env.RELEASE_LOCALLY  === 'true'),
		}));
	});

	it('should return a semantic-release configuration without a repository url', () => {
		expect(result).not.toStrictEqual(expect.objectContaining({
			repositoryUrl: expect.any(String),
		}));
	});

	it('should return a semantic-release configuration with the provided branch settings', () => {
		expect(result).toStrictEqual(expect.objectContaining({
			branches: branches ?? [],
		}));
	});

	it('should return a semantic-release configuration with the provided plugin settings', () => {
		expect(result).toStrictEqual(expect.objectContaining({
			plugins: expect.arrayContaining([
				['@semantic-release/commit-analyzer', expect.objectContaining({
					releaseRules: releaseRules ?? [],
				})],
			]),
		}));
	});
});
