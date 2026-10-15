import { type ReactNode, createContext, use, useState } from 'react';
import type { Language } from '@/content';
import { saveLanguage, startLanguage } from '@/language';
import strings from '@/strings.json';

// The app's own words, in Polish and English (constitution: i18n everywhere) — the content carries
// its own two languages (DEC-57).
export type StringKey = keyof (typeof strings)['en'];

// Each language named in itself, the same whichever language the app is in (MOD-02-F10).
export const languageName = (language: Language) =>
  strings.languageNames[language];

type AppLanguage = {
  language: Language;
  choose: (language: Language) => void;
  t: (key: StringKey) => string;
};

const LanguageContext = createContext<AppLanguage | null>(null);

// The app's language, for every screen below it: the one it starts in (the last chosen, or the
// device's), then whatever the switch on the category screen chooses — saved at once, so it is
// remembered after the app is closed (MOD-02-F10…F12, DEC-60). Choosing the active one again
// changes nothing, so nothing is redrawn (NFR-04).
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(startLanguage);
  const choose = (chosen: Language) => {
    if (chosen === language) return;
    saveLanguage(chosen);
    setLanguage(chosen);
  };
  const t = (key: StringKey) => strings[language][key];
  return (
    <LanguageContext value={{ language, choose, t }}>
      {children}
    </LanguageContext>
  );
};

export const useLanguage = () => {
  const appLanguage = use(LanguageContext);
  if (!appLanguage) throw new Error('useLanguage outside a LanguageProvider');
  return appLanguage;
};
