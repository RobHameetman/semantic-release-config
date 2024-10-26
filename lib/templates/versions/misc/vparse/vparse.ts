/**
 * Parses the release version number and returns a segment at the provided
 * index.
 *
 * @example
 * ```TypeScript
 * // Given the version '7.24.13-beta.9':
 * vparse(1) // '7'
 * vparse(2) // '24'
 * vparse(3) // '13'
 * ```
 *
 * @param indes - The index of the segment to return.
 *
 * @returns The segment of the release version number at the provided index.
 */
export const vparse = (index: number) =>
	`nextRelease.version.match(/^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$/)[${Math.abs(index)}]`;
