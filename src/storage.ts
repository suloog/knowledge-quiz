import { File, Paths } from 'expo-file-system';

// The app's one persistence module (constitution): what the app remembers on the device, one JSON
// file per key in its private files (DEC-54). Nothing here leaves the device.
const file = (key: string) =>
  new File(Paths.document, `${encodeURIComponent(key)}.json`);

// The value saved under the key; undefined when nothing is saved or it cannot be read — the
// caller then starts afresh, so a corrupt file never stops the app.
export const load = (key: string): unknown => {
  try {
    const saved = file(key);
    return saved.exists ? JSON.parse(saved.textSync()) : undefined;
  } catch {
    return undefined;
  }
};

// Writes the value under the key: into a file of its own first, then moved over the saved one, so
// an app killed mid-write never leaves a part of a value behind — at worst nothing, and the caller
// starts afresh. A write that fails leaves the value unsaved: it is not remembered, the app goes on.
export const save = (key: string, value: unknown) => {
  try {
    const written = file(`${key}.new`);
    written.write(JSON.stringify(value));
    written.moveSync(file(key), { overwrite: true });
  } catch {
    // Not remembered: the next load gives the value saved before, or nothing.
  }
};
