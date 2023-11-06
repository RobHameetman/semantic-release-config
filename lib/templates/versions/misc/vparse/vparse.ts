/**
 * Parses the version number and returns a segment at the provided index.
 *
 * @example
 * ```TypeScript
 * // Given the version '7.24.13-beta.9':
 * back('nextRelease.version.split(/\\.|-/)[2])') // '12'
 * back('nextRelease.version.split(/\\.|-/)[2])', 2) // '11'
 * back('nextRelease.version.split(/\\.|-/)[2])', 4) // '9'
 * back('nextRelease.version.split(/\\.|-/)[2])', 13) // '0'
 * back('nextRelease.version.split(/\\.|-/)[2])', 14) // '0'
 * back('nextRelease.version.split(/\\.|-/)[2])', 4, 5) // '9'
 * back('nextRelease.version.split(/\\.|-/)[2])', 12, 2) // '2'
 * ```
 *
 * @param version - The version number to decrement. May be a number as a string
 * or a context reference (e.g. 'nextRelease.version.split(/\\.|-/)[1])').
 * @param offset - [Optional] The number of versions to decrement by. Defaults
 * to 1.
 * @param floor - [Optional] The lowest version number to return. Defaults to 0.
 *
 * @returns The version number of the previous version as a string.
 */
export const vparse = (index: number) =>
	`nextRelease.version.match(/^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$/)[${Math.abs(index)}]`;
