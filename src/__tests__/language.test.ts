import { I18nManager } from 'react-native';
import { deviceLanguage, saveLanguage, startLanguage } from '../language';

const mockSaved = new Map<string, unknown>();
jest.mock('../storage', () => ({
  load: (key: string) => mockSaved.get(key),
  save: (key: string, value: unknown) => mockSaved.set(key, value),
}));

const deviceLocale = (localeIdentifier: string | undefined) =>
  jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
    isRTL: false,
    doLeftAndRightSwapInRTL: true,
    localeIdentifier,
  });

describe('deviceLanguage — Polish on a Polish device, English otherwise (DEC-33)', () => {
  afterEach(() => jest.restoreAllMocks());

  it.each([
    ['pl_PL', 'pl'],
    ['pl', 'pl'],
    ['en_US', 'en'],
    ['en_GB', 'en'],
    ['de_DE', 'en'],
    [undefined, 'en'],
  ])('device locale %p → %p', (locale, language) => {
    deviceLocale(locale);
    expect(deviceLanguage()).toBe(language);
  });
});

describe('startLanguage — the language last chosen, else the device language (MOD-02-F11, F12)', () => {
  beforeEach(() => mockSaved.clear());
  afterEach(() => jest.restoreAllMocks());

  it('nothing saved: the device language', () => {
    deviceLocale('de_DE');
    expect(startLanguage()).toBe('en');
  });

  it('a saved choice wins over the device language', () => {
    deviceLocale('pl_PL');
    saveLanguage('en');
    expect(mockSaved.get('language')).toBe('en');
    expect(startLanguage()).toBe('en');
  });

  it.each([['de'], [null], [1], [{ language: 'en' }]])(
    'a saved value that is not a language (%p): the device language',
    saved => {
      deviceLocale('pl_PL');
      mockSaved.set('language', saved);
      expect(startLanguage()).toBe('pl');
    },
  );
});
