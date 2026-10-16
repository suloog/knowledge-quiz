import { I18nManager } from 'react-native';
import { LanguageProvider } from '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CategoriesScreen from '../index';

jest.mock('@/content/app.json', () => ({
  title: {
    pl: 'Wartość z danych treści',
    en: 'Value from the content data',
  },
}));
// Registered out of order, as a maintainer might: the screen still lists them youngest first.
jest.mock('@/content/decks', () => ({
  decks: [{ category: '5+' }, { category: '3+' }, { category: '4+' }],
}));

// What the app keeps on the device, in memory: key → JSON.
const mockSaved = new Map<string, string>();
jest.mock('@/storage', () => ({
  load: (key: string) => {
    const value = mockSaved.get(key);
    return value === undefined ? undefined : JSON.parse(value);
  },
  save: (key: string, value: unknown) =>
    mockSaved.set(key, JSON.stringify(value)),
}));

const deviceLocale = (localeIdentifier: string) =>
  jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
    isRTL: false,
    doLeftAndRightSwapInRTL: true,
    localeIdentifier,
  });

const renderScreen = () =>
  render(
    <LanguageProvider>
      <CategoriesScreen />
    </LanguageProvider>,
  );

const checked = (language: string) =>
  screen.getByTestId(`language-${language}`).props.accessibilityState?.checked;

describe('CategoriesScreen', () => {
  beforeEach(() => {
    mockSaved.clear();
    deviceLocale('pl_PL');
  });
  afterEach(() => jest.restoreAllMocks());

  it('shows the title read from the bundled content data, in the app language', async () => {
    await renderScreen();

    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Wartość z danych treści',
    );
  });

  it('lists the categories of the content data in the order 3+, 4+, 5+', async () => {
    await renderScreen();

    expect(screen.getByTestId('category-0')).toHaveTextContent('3+');
    expect(screen.getByTestId('category-1')).toHaveTextContent('4+');
    expect(screen.getByTestId('category-2')).toHaveTextContent('5+');
    expect(screen.queryByTestId('category-3')).toBeNull();
  });
});

describe('Language switch (US-02-03)', () => {
  beforeEach(() => mockSaved.clear());
  afterEach(() => jest.restoreAllMocks());

  it('names each language in itself: Polski, English (MOD-02-F10)', async () => {
    deviceLocale('pl_PL');
    await renderScreen();

    expect(screen.getByTestId('language-pl')).toHaveTextContent('Polski');
    expect(screen.getByTestId('language-en')).toHaveTextContent('English');
  });

  it('on a Polish device, first launch: Polish is active (#1, MOD-02-U04)', async () => {
    deviceLocale('pl_PL');
    await renderScreen();

    expect(checked('pl')).toBe(true);
    expect(checked('en')).toBe(false);
    expect(screen.getByTestId('language-switch').props.accessibilityLabel).toBe(
      'Język',
    );
    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Wartość z danych treści',
    );
  });

  it.each(['de_DE', 'en_US'])(
    'on a device set to %p, first launch: English is active (#2)',
    async locale => {
      deviceLocale(locale);
      await renderScreen();

      expect(checked('en')).toBe(true);
      expect(checked('pl')).toBe(false);
      expect(
        screen.getByTestId('language-switch').props.accessibilityLabel,
      ).toBe('Language');
      expect(screen.getByTestId('content-title')).toHaveTextContent(
        'Value from the content data',
      );
    },
  );

  it('switching to English redraws the screen in English and saves the choice (#3)', async () => {
    deviceLocale('pl_PL');
    await renderScreen();
    await fireEvent.press(screen.getByTestId('language-en'));

    expect(checked('en')).toBe(true);
    expect(screen.getByTestId('language-switch').props.accessibilityLabel).toBe(
      'Language',
    );
    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Value from the content data',
    );
    expect(mockSaved.get('language')).toBe('"en"');
  });

  it('the chosen language is the one the app starts in next time, whatever the device (#3)', async () => {
    mockSaved.set('language', '"en"');
    deviceLocale('pl_PL');
    await renderScreen();

    expect(checked('en')).toBe(true);
  });

  it('choosing the active language changes and saves nothing (NFR-04)', async () => {
    deviceLocale('pl_PL');
    await renderScreen();
    await fireEvent.press(screen.getByTestId('language-pl'));

    expect(checked('pl')).toBe(true);
    expect(mockSaved.has('language')).toBe(false);
  });

  it.each([['"de"'], ['42'], ['{"language":"en"}']])(
    'a saved language that is not Polish or English (%s): the device decides (edge case)',
    async saved => {
      mockSaved.set('language', saved);
      deviceLocale('pl_PL');
      await renderScreen();

      expect(checked('pl')).toBe(true);
    },
  );
});
