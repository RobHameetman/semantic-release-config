/**
 * Conditionally apply a template during a patch release.
 */
export const $ifPatchRelease = ($do: string, $else = "''") => `\${nextRelease.type === 'patch' ? ${$do} : ${$else}}`;
