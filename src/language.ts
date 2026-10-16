import { I18nManager } from 'react-native';
import type { Language } from '@/content';
import { load, save } from '@/storage';

// The device's language for the app: Polish on a device set to Polish, English on any other
// (DEC-33).
export const deviceLanguage = (): Language =>
  (I18nManager.getConstants().localeIdentifier ?? '')
    .toLowerCase()
    .startsWith('pl')
    ? 'pl'
    : 'en';

const KEY = 'language';

const isLanguage = (value: unknown): value is Language =>
  value === 'pl' || value === 'en';

// The language the app starts in: the one last chosen with the switch, or the device's when none
// was chosen or what was saved cannot be read (MOD-02-F11, F12; DEC-60).
export const startLanguage = (): Language => {
  const saved = load(KEY);
  return isLanguage(saved) ? saved : deviceLanguage();
};

// Remembers the language chosen with the switch (MOD-02-F12).
export const saveLanguage = (language: Language) => save(KEY, language);
