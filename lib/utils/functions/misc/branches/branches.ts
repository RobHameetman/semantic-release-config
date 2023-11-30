import type { BranchObject } from 'semantic-release';
import { Branches } from '@utils/types/branches/Branches';
import { Branch } from '@utils/types/state/Branch';

/**
 * Perform any relevant actions upon receiving the branch objects from a
 * standardized config. This function initializes the Branch class so that we can
 * see which branch rules match the current branch in the `plugin()` function
 * and alter or disable some plugins based on the release type.
 *
 * @example
 * ```TypeScript
 * branches([
 *     { name: '@(main|master)', prerelease: false, channel: 'latest' },
 *     { name: 'beta', prerelease: true, channel: 'beta' },
 *     { name: 'alpha', prerelease: true, channel: 'alpha' },
 *     { name: `[1-9]*([0-9]).X.X`, range: '${name.split(".")[0]}.x.x', prerelease: false, channel: '${name.split(".")[0]}' },
 *     { name: '@(!(main|master|beta|alpha|[1-9]*([0-9]).X.X))', prerelease: PR_PRERELEASE_TYPE, channel: PR_PRERELEASE_CHANNEL },
 * ]),
 * ```
 *
 * @param value - The branch objects for a standardized config.
 *
 * @returns The branch objects to be assigned to the `branches` property of a
 * standardized config.
 */
export const branches = async (branches: Branches) => {
	await Promise.all(
		branches.flatMap(
			({ channel, prerelease }) => ([prerelease, channel]),
		)
	);

	const resolved = branches as ReadonlyArray<BranchObject>;

	console.log(`branches()::channel: ${resolved?.at(-1)?.channel}`);
	console.log(`branches()::resolved: ${resolved?.at(-1)?.prerelease}`);

	Branch.set(resolved);

	return resolved;
};
