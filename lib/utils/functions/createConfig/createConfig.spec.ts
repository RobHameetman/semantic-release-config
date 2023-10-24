import { BranchObject } from 'semantic-release';
import { faker } from '@faker-js/faker';
import { fakeBranches } from '@test/fakes/fakeBranches';
import { fakeRules } from '@test/fakes/fakeRules';
import { createConfig } from './createConfig';

jest.mock('@utils/functions/env', () => ({
	__esModule: true,
	env: jest.fn((variable: string) => {
		return ({
			RELEASE_DEBUG: () => process.env.RELEASE_DEBUG === 'true',
			RELEASE_DRY_RUN: () => process.env.RELEASE_DRY_RUN === 'true',
			RELEASE_LOCALLY: () => process.env.RELEASE_LOCALLY === 'true',
			RELEASE_REPOSITORY_URL: () => process.env.RELEASE_REPOSITORY_URL,
		} as Record<string, () => unknown>)[variable]();
	}),
}));

describe('createConfig()', () => {
	let mockEnv: jest.Mock | null = null;
	let branches: ReadonlyArray<BranchObject> | null = null;
	let releaseRules: ReadonlyArray<Record<string, unknown>> | null = null;
	let error: Error | null = null;
	let result: unknown = null;

	beforeAll(() => {
		process.env.RELEASE_DEBUG = faker.datatype.boolean().toString();
		process.env.RELEASE_DRY_RUN = faker.datatype.boolean().toString();
		process.env.RELEASE_LOCALLY = faker.datatype.boolean().toString();
		process.env.RELEASE_REPOSITORY_URL = faker.internet.url();
	});

	beforeEach(() => {
		try {
			branches = fakeBranches();
			releaseRules = fakeRules();

			result = createConfig({
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
		mockEnv = null;
		branches = null;
		releaseRules = null;
		error = null;
		result = null;
	});

	afterAll(() => {
		delete process.env.RELEASE_DEBUG;
		delete process.env.RELEASE_DRY_RUN;
		delete process.env.RELEASE_LOCALLY;
		delete process.env.RELEASE_REPOSITORY_URL;
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

	it('should return a semantic-release configuration with the correct repository url when one is provided', () => {
		expect(result).toStrictEqual(expect.objectContaining({
			repositoryUrl: process.env.RELEASE_REPOSITORY_URL,
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
