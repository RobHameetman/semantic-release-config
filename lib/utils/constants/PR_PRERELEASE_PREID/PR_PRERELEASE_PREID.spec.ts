import { isString } from '@rob.hameetman/type-guards';
import { env } from '@utils/functions/environment/env';
import { PR_PRERELEASE_PREID } from './PR_PRERELEASE_PREID';

jest.mock('@utils/constants/COMMIT_SHA', () => ({
	__esModule: true,
	COMMIT_SHA: '3c274fc187e032ab384ac559377d8e86f3c8fc43',
}));

jest.mock('@utils/constants/PR_NUMBER', () => ({
	__esModule: true,
	PR_NUMBER: 42,
}));

jest.mock('@utils/constants/PR_PRERELEASE_TYPE', () => ({
	__esModule: true,
	PR_PRERELEASE_TYPE: 'pr',
}));

jest.mock('@utils/functions/environment/env', () => ({
	__esModule: true,
	env: jest.fn((envVar: string, cb = (value: unknown) => value) =>
		cb(process.env[envVar])),
}));

describe('PR_PRERELEASE_PREID', () => {
	it('should be a string', () => {
		expect(isString(PR_PRERELEASE_PREID)).toBe(true);
	});

	it('should be overridable', () => {
		expect(env).toBeCalledWith('RELEASE_PR_PRERELEASE_PREID');
	});

	it('should use the format "<PREID_TYPE>.<PR_NUMBER>.<COMMIT_SHA_SHORT>.<DATE_HASH>" by default', () => {
		expect(PR_PRERELEASE_PREID).toStrictEqual(expect.stringMatching(/^(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)\.\d+\.[0-9a-z]{8}\.\d{8}$/g));
		expect(PR_PRERELEASE_PREID.startsWith('pr.42.3c274fc1.')).toBe(true);
	});
});
