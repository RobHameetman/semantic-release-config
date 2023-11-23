/**
 * Determine whether or not a given value is a semantic version or not. This
 * regex correctly follows the semantic versioning spec (i.e. it works with
 * build metadata even though NPM ignores it). It also creates the following
 * capture groups:
 *  - type               [e.g. (deps)(infra): Update semantic release package version [SKIP CI] ]
 *  - scope              [e.g. deps((infra)): Update semantic release package version [SKIP CI] ]
 *  - subject            [e.g. deps(infra): (Update semantic release package version [SKIP CI]) ]
 *
 * These groups allow us to support 3 kinds of versions: release versions,
 * prerelease versions, and PR prerelease versions. Using this in
 * `String.match()` will return a `VersionMatch` array with a
 * `VersionMatchGroups` object which you can access like:
 *
 * ```TypeScript
 * const result = 'deps(infra): Update semantic release package version [SKIP CI]'.match(COMMIT_REGEX);
 *
 * // console.log(result.groups);
 * {
 *   type: 'deps',
 *   scope: 'infra',
 *   subject: 'Update semantic release package version [SKIP CI]',
 * }
 * ```
 */
export const COMMIT_REGEX = /^(?:(?<type>[^\(:]+)?(?:\((?<scope>[^\)]+)\))?: )?(?<subject>.*)$/;
