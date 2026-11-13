// Bump only when the editor's saved-work format becomes incompatible.
export const EDITOR_VERSION = 2;
export const EDITOR_LABEL = `v${EDITOR_VERSION}`;
export const backupFilename = backup => `palace-v${Number.isInteger(backup?.version) ? backup.version : EDITOR_VERSION}-backup.json`;
