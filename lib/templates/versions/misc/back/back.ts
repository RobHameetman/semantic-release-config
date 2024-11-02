/**
 * Returns the version number of the previous version.
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
export const back = (version: string, offset = 1, floor = 0) =>
	/**
	 * prettified:
	 * (
	 *   !isNaN(Number(${version}))
	 * 	    ? (
	 *          Number(${version}) - ${Math.abs(offset)} >= ${Math.abs(floor)}
	 * 		  	    ? Number(${version}) - ${Math.abs(offset)}
	 * 			      : ${Math.abs(floor)}
	 *        )
	 * 		  : ""
	 * )
	 */
	`(!isNaN(Number(${version})) ? (Number(${version}) - ${Math.abs(offset)} >= ${Math.abs(floor)} ? Number(${version}) - ${Math.abs(offset)} : ${Math.abs(floor)}) : '')`;
