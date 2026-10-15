import { deviceLanguage } from '@/language';
import strings from '@/strings.json';

// The app's own words, in Polish and English (constitution: i18n everywhere) — the content carries
// its own two languages. Shown in the app's language: the device's until the switch (US-02-03;
// DEC-52, DEC-57).
export type StringKey = keyof (typeof strings)['en'];

export const t = (key: StringKey) => strings[deviceLanguage()][key];
