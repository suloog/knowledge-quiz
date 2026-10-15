import { I18nManager } from 'react-native';
import { deviceLanguage } from '../language';

const deviceLocale = (localeIdentifier: string | undefined) =>
  jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
    isRTL: false,
    doLeftAndRightSwapInRTL: true,
    localeIdentifier,
  });

describe('deviceLanguage — Polish on a Polish device, English otherwise (DEC-33, DEC-52)', () => {
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
