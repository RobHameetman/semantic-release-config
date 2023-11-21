import { BranchObject, Options } from 'semantic-release';
import micromatch from 'micromatch';
import { isArray, isString } from '@rob.hameetman/type-guards';
import { CURRENT_BRANCH } from '@utils/constants/CURRENT_BRANCH';
import { env } from '@utils/functions/environment/env';

/**
 * A class with static properties and methods used as an accessible state
 * management layer for the branch triggering the release. This class is
 * instantiated in the `branches()` function and may be used in the `plugin()`
 * function. This allows us to build features for specific release types, such as
 * bypassing the changelog for prerelease versions.
 *
 * @privateRemarks
 * This class is using `private` keywords in TypeScript rather than JavaScript
 * private identifiers because the latter requires the addition of "target":
 * "es2015" in the tsconfig.json file, which is causing an issue where
 * semantic-release is unable to recognize the standardized configs as modules.
 */
export class Branch {
	/**
	 * @private
	 * The name of the current branch triggering the release.
	 */
	private static _active = '';

	/**
	 * @private
	 * This is set to `true` when the `set()` method has finished initializing
	 * the class. `set()` may only be called once, so this prevents our class from
	 * being reinitialized.
	 */
	private static _init = false;

	/**
	 * @private
	 * An array of branch objects (usually just one) which match the current
	 * ("active") branch.
	 */
	private static _matches: ReadonlyArray<BranchObject>;

	/**
	 * @private
	 * An array of branch objects for release branches, like `main`.
	 */
	private static _release: ReadonlyArray<BranchObject>;

	/**
	 * @private
	 * An array of branch objects for prerelease branches, like `beta`.
	 */
	private static _prerelease: ReadonlyArray<BranchObject>;

	/**
	 * @private
	 * The branch object for PR prerelease branches, which matches any branch
	 * which is not an explicit release or prerelease or maintenance branch.
	 */
	private static _prPreReleaseRule: BranchObject | null = null;

	/**
	 * @private
	 * The entire set of branch object rules listed in the current configuration's
	 * "branches" field.
	 */
	private static _rules: Options['branches'];

	/**
	 * The name of the current branch triggering the release.
	 */
	static get active() {
		return this._active;
	}

	/**
	 * An array of branch objects (usually just one) which match the current
	 * ("active") branch.
	 */
	static get matches() {
		return this._matches;
	}

	/**
	 * An array of branch objects for release branches, like `main`.
	 */
	static get release() {
		return this._release;
	}

	/**
	 * The entire set of branch object rules listed in the current configuration's
	 * "branches" field.
	 */
	static get rules() {
		return this._rules;
	}

	/**
	 * An array of branch objects for prerelease branches, like `beta`.
	 */
	static get prerelease() {
		return this._prerelease;
	}

	/**
	 * Determine whether or not the branch which triggered the release is a
	 * release branch.
	 *
	 * @returns A boolean which is true if the matching branch rule is a release
	 * branch rule.
	 */
	static isRelease = () => {
		return this._matches.find(this._isReleaseRule) !== undefined;
	}

	/**
	 * Determine whether or not the branch which triggered the release is a
	 * prerelease branch.
	 *
	 * @returns A boolean which is true if the matching branch rule is a
	 * prerelease branch rule.
	 */
	static isPrerelease = () => {
		return this._matches.find(this._isPrereleaseRule) !== undefined ||
			this.isPrPrerelease();
	}

	/**
	 * Determine whether or not the branch which triggered the release is a
	 * PR prerelease branch.
	 *
	 * @returns A boolean which is true if the matching branch rule is a PR
	 * prerelease branch rule.
	 */
	static isPrPrerelease = () => {
		return this._prPreReleaseRule !== null &&
			this._matches.find(this._isPrPrereleaseRule) !== undefined;
	}

	/**
	 * Determine whether or not the class has been initialized.
	 *
	 * @returns A boolean which is true if the class has been initialized.
	 */
	static isSet = () => {
		return this._init;
	}

	/**
	 * Initialize the class. This method is called in the `branches()` function
	 * wrapped around the "branches" array in each standardized configuration. You
	 * can then use this class in the `plugin()` function and elsewhere to ensure
	 * functionality specific to the release type.
	 *
	 * @param config - The "branches" field in the current configuration.
	 * @param name - [Optional] The name of the current branch.
	 */
	static set = (config: Options['branches'], name = CURRENT_BRANCH) => {
		if (!name) {
			console.warn(
				'Branch.set(): Unable to find the current branch name. Try manually setting the CI_COMMIT_BRANCH environment variable in your CI/CD configuration.',
			);
		} else if (name && !this._init) {
			this._active = name || '';

			let rules: ReadonlyArray<BranchObject> = [];

			if (isArray(config)) {
				rules = [...config] as ReadonlyArray<BranchObject>;
			} else if (isString(config)) {
				rules = [{ name: config }] as ReadonlyArray<BranchObject>;
			} else {
				rules = [config] as ReadonlyArray<BranchObject>;
			}

			this._rules = rules;

			this._release = rules.filter(this._isReleaseRule);
			this._prerelease = rules.filter(this._isPrereleaseRule);
			this._matches = rules.filter(this._isMatch);
			this._prPreReleaseRule = rules.find(this._isPrPrereleaseRule) || null;

			this._init = true;
		}
	}

	/**
	 * De-initialize the class. This method is used in testing to reset the state
	 * between tests.
	 */
	static destroy = () => {
		if (this._init && env('NODE_ENV') === 'test') {
			this._active = '';
			this._rules = [];
			this._release = [];
			this._prerelease = [];
			this._matches = [];
			this._prPreReleaseRule = null;

			this._init = false;
		}
	}

	/**
	 * @private
	 * Predicate for determining whether the current ("active") branch matches any
	 * of the provided branch rules.
	 *
	 * @param input - The current {@link BranchObject}. Because this method is
	 * used is declarative array methods like 'find()' and 'filter()', this argument
	 * is the current branch object in the array.
	 *
	 * @returns A boolean which is true if the branch name matches any of the
	 * given patterns.
	 */
	private static _isMatch = ({ name: pattern }: BranchObject) => {
		return micromatch([this._active || ''], pattern, {}).includes(this._active || '');
	}

	/**
	 * @private
	 * Predicate for determining whether the current branch object represents a
	 * release branch rule.
	 *
	 * @param input - The current {@link BranchObject}. Because this method is
	 * used is declarative array methods like 'find()' and 'filter()', this argument
	 * is the current branch object in the array.
	 *
	 * @returns A boolean which is true if the current branch object represents a
	 * release branch rule.
	 */
	private static _isReleaseRule = ({ prerelease }: BranchObject) => {
		return prerelease === false || prerelease === undefined;
	}

	/**
	 * @private
	 * Predicate for determining whether the current branch object represents a
	 * prerelease branch rule.
	 *
	 * @param input - The current {@link BranchObject}. Because this method is
	 * used is declarative array methods like 'find()' and 'filter()', this argument
	 * is the current branch object in the array.
	 *
	 * @returns A boolean which is true if the current branch object represents a
	 * prerelease branch rule.
	 */
	private static _isPrereleaseRule = ({ prerelease }: BranchObject) => {
		return Boolean(prerelease);
	}

	/**
	 * @private
	 * Predicate for determining whether the current branch object represents a PR
	 * prerelease branch rule.
	 *
	 * @param input - The current {@link BranchObject}. Because this method is
	 * used is declarative array methods like 'find()' and 'filter()', this argument
	 * is the current branch object in the array.
	 *
	 * @returns A boolean which is true if the current branch object represents a
	 * PR prerelease branch rule.
	 */
	private static _isPrPrereleaseRule = ({ name: pattern }: BranchObject) => {
		return /\@\(\!\((?:(?:.)*(?:\|)?)*\)\)/.test(pattern);
	}
}

/**
 * Checks that an `unknown` value is a {@link Branch}.
 *
 * Requirements:
 *   - `value` must be a string or undefined.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Branch}.
 */
export const isBranch = (value: unknown): value is Branch =>
	/**
	 * value
	 */
	value instanceof Branch;
