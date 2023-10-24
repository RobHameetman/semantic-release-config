/**
 * Conditionally apply a template during a major release.
 */
export const $ifMajorRelease = ($do: string, $else = "''") => `\${nextRelease.type === 'major' ? ${$do} : ${$else}}`;
