import { exec as execSync } from 'child_process';
import { promisify } from 'util';
import semver from 'semver';

const exec = promisify(execSync);

let mostRecentRange: string | null = null;
let mostRecentVersions: Array<string> | null = null;

export const getVersions = async (pkgName: string, range: string) => {
	if (range !== mostRecentRange) {
		const { stdout, stderr } = await exec(`npm view ${pkgName} versions --json --loglevel=error`);

		if (stderr) {
			throw new Error(stderr);
		}

		mostRecentRange = range;
		mostRecentVersions = JSON.parse(stdout);
	}

	const versions = mostRecentVersions;
	const filteredVersions = versions?.filter((version: string) => semver.satisfies(version, range));

	console.log(filteredVersions);

	return Promise.resolve(filteredVersions);
};
