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
 */
export class Branch {
	/**
	 * @private
	 * The name of the current branch triggering the release.
	 */
	static #active = '';

	/**
	 * @private
	 * This is set to `true` when the `set()` method has finished initializing
	 * the class. `set()` may only be called once, so this prevents our class from
	 * being reinitialized.
	 */
	static #init = false;

	/**
	 * @private
	 * An array of branch objects (usually just one) which match the current
	 * ("active") branch.
	 */
	static #matches: ReadonlyArray<BranchObject>;

	/**
	 * @private
	 * An array of branch objects for release branches, like `main`.
	 */
	static #release: ReadonlyArray<BranchObject>;

	/**
	 * @private
	 * An array of branch objects for prerelease branches, like `beta`.
	 */
	static #prerelease: ReadonlyArray<BranchObject>;

	/**
	 * @private
	 * The branch object for PR prerelease branches, which matches any branch
	 * which is not an explicit release or prerelease or maintenance branch.
	 */
	static #prPreReleaseRule: BranchObject | null = null;

	/**
	 * @private
	 * The entire set of branch object rules listed in the current configuration's
	 * "branches" field.
	 */
	static #rules: Options['branches'];

	/**
	 * The name of the current branch triggering the release.
	 */
	static get active() {
		return this.#active;
	}

	/**
	 * An array of branch objects (usually just one) which match the current
	 * ("active") branch.
	 */
	static get matches() {
		return this.#matches;
	}

	/**
	 * An array of branch objects for release branches, like `main`.
	 */
	static get release() {
		return this.#release;
	}

	/**
	 * The entire set of branch object rules listed in the current configuration's
	 * "branches" field.
	 */
	static get rules() {
		return this.#rules;
	}

	/**
	 * An array of branch objects for prerelease branches, like `beta`.
	 */
	static get prerelease() {
		return this.#prerelease;
	}

	/**
	 * Determine whether or not the branch which triggered the release is a
	 * release branch.
	 *
	 * @returns A boolean which is true if the matching branch rule is a release
	 * branch rule.
	 */
	static isRelease = () => {
		return this.#matches.find(this.#isReleaseRule) !== undefined;
	}

	/**
	 * Determine whether or not the branch which triggered the release is a
	 * prerelease branch.
	 *
	 * @returns A boolean which is true if the matching branch rule is a
	 * prerelease branch rule.
	 */
	static isPrerelease = () => {
		return this.#matches.find(this.#isPrereleaseRule) !== undefined;
	}

	/**
	 * Determine whether or not the branch which triggered the release is a
	 * PR prerelease branch.
	 *
	 * @returns A boolean which is true if the matching branch rule is a PR
	 * prerelease branch rule.
	 */
	static isPrPrerelease = () => {
		return this.#prPreReleaseRule !== null &&
			this.#matches.find(this.#isPrPrereleaseRule) !== undefined;
	}

	/**
	 * Determine whether or not the class has been initialized.
	 *
	 * @returns A boolean which is true if the class has been initialized.
	 */
	static isSet = () => {
		return this.#init;
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
		if (!this.#init) {
			this.#active = name || '';

			let rules: ReadonlyArray<BranchObject> = [];

			if (isArray(config)) {
				rules = [...config] as ReadonlyArray<BranchObject>;
			} else if (isString(config)) {
				rules = [{ name: config }] as ReadonlyArray<BranchObject>;
			} else {
				rules = [config] as ReadonlyArray<BranchObject>;
			}

			this.#rules = rules;

			this.#release = rules.filter(this.#isReleaseRule);
			this.#prerelease = rules.filter(this.#isPrereleaseRule);
			this.#matches = rules.filter(this.#isMatch);
			this.#prPreReleaseRule = rules.find(this.#isPrPrereleaseRule) || null;

			this.#init = true;
		}
	}

	/**
	 * De-initialize the class. This method is used in testing to reset the state
	 * between tests.
	 */
	static destroy = () => {
		if (this.#init && env('NODE_ENV') === 'test') {
			this.#active = '';
			this.#rules = [];
			this.#release = [];
			this.#prerelease = [];
			this.#matches = [];
			this.#prPreReleaseRule = null;

			this.#init = false;
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
	static #isMatch = ({ name: pattern }: BranchObject) => {
		return micromatch([this.#active || ''], pattern, {}).includes(this.#active || '');
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
	static #isReleaseRule = ({ prerelease }: BranchObject) => {
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
	static #isPrereleaseRule = ({ prerelease }: BranchObject) => {
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
	static #isPrPrereleaseRule = ({ name: pattern }: BranchObject) => {
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
