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

export const save = (key: string, value: unknown) => {
  file(key).write(JSON.stringify(value));
};
