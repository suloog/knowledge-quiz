import { I18nManager } from 'react-native';
import type { Language } from '@/content';

// The app's language: Polish on a device set to Polish, English on any other (DEC-33). The switch
// on the category screen (US-02-03) comes later; until then the device's language is the app's
// (DEC-52).
export const deviceLanguage = (): Language =>
  (I18nManager.getConstants().localeIdentifier ?? '')
    .toLowerCase()
    .startsWith('pl')
    ? 'pl'
    : 'en';
