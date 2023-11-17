/**
 * Determine whether or not a given value is a semantic version or not. This
 * regex correctly follows the semantic versioning spec (i.e. it works with
 * build metadata even though NPM ignores it). It also creates the following
 * capture groups:
 *  - major               [e.g. (1).2.5-pr.10.abcd1234.20131111.9+build.34]
 *  - minor               [e.g. 1.(2).5-pr.10.abcd1234.20131111.9+build.34]
 *  - patch               [e.g. 1.2.(5)-pr.10.abcd1234.20131111.9+build.34]
 *  - preid               [e.g. 1.2.5-(pr.10.abcd1234.20131111.9)+build.34]
 *  - type                [e.g. 1.2.5-(pr).10.abcd1234.20131111.9+build.34]
 *  - pr                  [e.g. 1.2.5-pr.(10).abcd1234.20131111.9+build.34]
 *  - commit              [e.g. 1.2.5-pr.10.(abcd1234).20131111.9+build.34]
 *  - date                [e.g. 1.2.5-pr.10.abcd1234.(20131111).9+build.34]
 *  - prerelease          [e.g. 1.2.5-pr.10.abcd1234.20131111.(9)+build.34]
 *  - build               [e.g. 1.2.5-pr.10.abcd1234.20131111.9+(build.34)]
 *
 * These groups allow us to support 3 kinds of versions: release versions,
 * prerelease versions, and PR prerelease versions. Using this in
 * `String.match()` will return a `VersionMatch` array with a
 * `VersionMatchGroups` object which you can access like:
 *
 * ```TypeScript
 * const result = '1.2.5-pr.10.abcd1234.20131111.9+build.34'.match(SEMVER_REGEX);
 *
 * // console.log(result.groups);
 * {
 *   major: '1',
 *   minor: '2',
 *   patch: '5',
 *   preid: 'pr.10.abcd1234.20131111.9',
 *   type: 'pr',
 *   pr: '10',
 *   commit: 'abcd1234',
 *   date: '20131111',
 *   prerelease: '9',
 *   build: 'build.34',
 * }
 * ```
 */
export const SEMVER_REGEX = /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<preid>(?:(?<type>0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))(?:\.(?<pr>[1-9](?:[0-9])*))?(?:\.(?<commit>[a-zA-Z0-9]+))?(?:\.(?<date>\d{8}))?\.(?<prerelease>[1-9](?:[0-9])*))?)?(?:\+(?<build>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
