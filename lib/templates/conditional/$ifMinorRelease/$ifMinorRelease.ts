/**
 * Conditionally apply a template during a minor release.
 */
export const $ifMinorRelease = ($do: string, $else = "''") => `\${nextRelease.type === 'minor' ? ${$do} : ${$else}}`;
